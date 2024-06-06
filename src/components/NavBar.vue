<template>
  <b-navbar toggleable="lg" type="dark" variant="danger" class="fixed-top-with-margin fixed-top">
    <b-navbar-brand href="/">Foodie</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item v-if="user" to="/recipes">Recipes</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="user" to="/profile">Profile</b-nav-item>
        <b-nav-item v-if="user" @click="logout">Logout</b-nav-item>
        <b-nav-item v-if="!user">
          <b-button variant="outline-light" @click="goToLogin">Login</b-button>
        </b-nav-item>
        <b-nav-item v-if="!user">
          <b-button variant="outline-light" @click="goToSignUp">Sign Up</b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name: 'NavBar',
  data() {
    return {
      user: null // Assurez-vous de mettre à jour cette logique pour récupérer l'état de l'utilisateur
    };
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.user = null;
        this.$router.push('/');
      }).catch(error => {
        console.error("Error signing out: ", error);
      });
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToSignUp() {
      this.$router.push('/signup');
    }
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }
};
</script>

<style>
.fixed-top-with-margin {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1030;
  margin-bottom: 1rem;
}

body {
  padding-top: 70px;
}

.b-navbar {
  background-color: #ff69b4 !important; /* Bright pink color */
}
</style>
