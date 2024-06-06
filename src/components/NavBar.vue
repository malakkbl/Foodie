<template>
  <b-navbar toggleable="lg" type="dark" variant="danger" class="fixed-top-with-margin fixed-top">
    <b-navbar-brand href="/">Foodie</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-if="!user" to="/">Home</b-nav-item>
        <b-nav-item v-if="user" to="/recipes">Recipes</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="user" to="/profile">Profile</b-nav-item>
        <b-nav-item v-if="user" @click="logout">Logout</b-nav-item>
        <b-nav-item v-if="!user" >
          <b-button variant="outline-light" to="/login">Login</b-button>
        </b-nav-item >
        <b-nav-item v-if="!user">
          <b-button variant="outline-light" to="/signup">Sign Up</b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      user: null // Assurez-vous de mettre à jour cette logique pour récupérer l'état de l'utilisateur
    };
  },
  methods: {
    logout() {
      // Ajoutez la logique de déconnexion ici
      this.user = null;
      // Redirigez ou effectuez d'autres actions après la déconnexion
    }
  },
  mounted() {
    // Ajoutez la logique pour récupérer l'état de l'utilisateur ici
    // Par exemple, vérifier si l'utilisateur est connecté
    this.user = false; // ou true, selon l'état réel de l'utilisateur
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
