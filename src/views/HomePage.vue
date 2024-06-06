<template>
  <div>
    <NavBar />
    <div class="welcome-message">
      <h1>Welcome to Foodie!</h1>
      <p>Discover and share the best recipes tailored to your dietary preferences.</p>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';

export default {
  name: 'HomePage',
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.welcome-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  background-color: #fff0f0; 
  color: #dc3545; 
}

.welcome-message h1 {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.welcome-message p {
  font-size: 1.5rem;
}
</style>

