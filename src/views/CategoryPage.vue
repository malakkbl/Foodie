<template>
    <div>
      <NavBar />
      <b-container class="mt-5 d-flex flex-column align-items-center">
        <b-row class="justify-content-center text-center mt-5">
          <b-col>
            <h1 class="welcome-message mt-5">Welcome, {{ user.fullName }}!</h1>
            <p class="sub-message">Select a category to explore delicious recipes.</p>
          </b-col>
        </b-row>
        <b-row class="justify-content-center">
          <b-col md="6" v-for="category in categories" :key="category.id" class="mb-4 d-flex align-items-stretch mt-5">
            <b-button @click="viewCategory(category.name)" variant="outline-danger" class="w-100 text-center py-4">
              <div>
                <h3 class="mb-2">{{ category.name }}</h3>
                <p class="mb-0">{{ category.description }}</p>
              </div>
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
  import { db, auth } from '@/firebase';
  import NavBar from '../components/NavBar.vue';
  
  export default {
    name: 'CategoryPage',
    components: {
      NavBar,
    },
    data() {
      return {
        categories: [],
        user: {
          fullName: '',
        },
      };
    },
    methods: {
      async fetchCategories() {
        try {
          const categoryCollection = await db.collection('categories').get();
          this.categories = categoryCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
      async fetchUser() {
        try {
          const userId = auth.currentUser.uid;
          const userDoc = await db.collection('users').doc(userId).get();
          if (userDoc.exists) {
            this.user = userDoc.data();
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      },
      viewCategory(categoryName) {
        this.$router.push({ name: 'RecipePage', query: { category: categoryName } });
      },
    },
    mounted() {
      this.fetchCategories();
      this.fetchUser();
    },
  };
  </script>
  
  <style scoped>
  .mt-4 {
    margin-top: 2rem;
  }
  .mb-4 {
    margin-bottom: 2rem;
  }
  .b-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .welcome-message {
    font-size: 2.5rem;
    font-weight: bold;
    color: #f44545;
  }
  .sub-message {
    font-size: 1.2rem;
    color: #4b4b4b;
  }
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  </style>
  