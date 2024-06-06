<template>
    <div>
      <NavBar />
      <h1>Recipes</h1>
    </div>
  </template>
  
  <script>
  import NavBar from '../components/NavBar.vue';
  
  export default {
    name: 'RecipesPage',
    components: {
      NavBar,
    },
  };
  </script>
  