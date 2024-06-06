<template>
  <b-container class="signup-container">
    <b-row class="justify-content-center">
      <b-col md="6" lg="4">
        <b-card bg-variant="light" border-variant="danger" class="signup-card">
          <b-form @submit.prevent="signUp">
            <b-form-group label="Username">
              <b-form-input v-model="username" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group label="Full Name">
              <b-form-input v-model="fullName" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group label="Email">
              <b-form-input
                v-model="email"
                type="email"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password">
              <b-form-input
                v-model="password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Confirm Password">
              <b-form-input
                v-model="confirmPassword"
                type="password"
                required
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="danger" class="btn-block">
              Sign Up
            </b-button>
            <b-button @click="goToLogin" variant="" class="btn-block">
              Login
            </b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db, auth } from '@/firebase';

export default {
  data() {
    return {
      username: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async signUp() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
        // Vérifier si le nom d'utilisateur est déjà pris
        const userSnapshot = await db.collection('users').where('username', '==', this.username).get();
        if (!userSnapshot.empty) {
          alert('Username is already taken');
          return;
        }

        // Créer l'utilisateur
        const userCredential = await auth.createUserWithEmailAndPassword(this.email, this.password);
        const userId = userCredential.user.uid;

        // Enregistrer les informations supplémentaires de l'utilisateur
        await db.collection('users').doc(userId).set({
          email: this.email,
          username: this.username,
          fullName: this.fullName,
          photoURL: '' // Ajoutez une logique pour gérer les photos de profil si nécessaire
        }, { merge: true });

        // Redirection après inscription réussie
        this.$router.push('/categories');
      } catch (error) {
        alert(error.message);
      }
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.signup-container {
  margin-top: 100px;
}
.signup-card {
  padding: 20px;
  border-width: 2px;
}
.btn-block {
  width: 100%;
}
</style>
