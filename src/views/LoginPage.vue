<template>
  <div>
    <NavBar />
    <Login />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Login from "@/components/LogIn.vue";

export default {
  components: { NavBar, Login },
};
</script>
