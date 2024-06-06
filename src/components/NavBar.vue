<template>
  <b-navbar toggleable="lg" type="dark" variant="danger" class="fixed-top-with-margin fixed-top">
    <b-navbar-brand href="/">
      <img src="@/assets/Foodie_transparent.png" alt="Foodie Logo" class="logo">
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-if="user" to="/categories">Categories</b-nav-item>
        <b-nav-item v-if="user" to="/allrecipes">Recipes</b-nav-item>
        <b-nav-item v-if="user" to="/add-recipe">Add Recipe</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="user" to="/profile">Profile</b-nav-item>
        <b-nav-item v-if="user" @click="logout">Logout</b-nav-item>
        <b-nav-item v-if="!user">
          <b-button variant="outline-light" to="/login">Login</b-button>
        </b-nav-item>
        <b-nav-item v-if="!user">
          <b-button variant="outline-light" to="/signup">Sign Up</b-button>
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
      user: null,
    };
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.user = null;
        this.$router.push('/');
      });
    },
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      this.user = user;
    });
  },
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
  background-color: #ff69b4 !important; 
}

img {
  height: 40px;
}
</style>
