<template>
    <div>
      <NavBar />
      <Signup />
    </div>
  </template>
  
  <script>
  import NavBar from "@/components/NavBar.vue";
  import Signup from "@/components/SignUp.vue";
  
  export default {
    components: { NavBar, Signup },
  };
  </script>
  