<template>
    <div>
      <NavBar />
      <b-container class="mt-4">
        <b-row>
          <b-col md="4" v-for="category in categories" :key="category.id" class="mb-4">
            <b-card @click="viewCategory(category.name)" class="text-center" :title="category.name">
              <b-card-text>
                {{ category.name }}
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  import NavBar from '../components/NavBar.vue';
  
  export default {
    name: 'CategoryPage',
    components: {
      NavBar,
    },
    data() {
      return {
        categories: [],
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
      viewCategory(categoryName) {
        this.$router.push({ name: 'RecipePage', query: { category: categoryName } });
      },
    },
    mounted() {
      this.fetchCategories();
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
  </style>
  