<template>
    <div>
      <NavBar />
      <b-container class="mt-4">
        <b-row class="mb-3">
          <b-col>
            <b-form-input v-model="searchQuery" placeholder="Search for recipes..."></b-form-input>
          </b-col>
          <b-col>
            <b-form-select v-model="selectedCategory" :options="categories" placeholder="Filter by category"></b-form-select>
          </b-col>
        </b-row>
        <b-row>
          <b-col v-for="recipe in filteredRecipes" :key="recipe.id" md="4">
            <b-card
              :title="recipe.nom"
              :img-src="recipe.image"
              img-alt="Recipe Image"
              img-top
            >
              <b-card-text>
                {{ recipe.description }}
              </b-card-text>
              <b-button @click="viewRecipe(recipe.id)" variant="danger">View Recipe</b-button>
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
    name: 'RecipesPage',
    components: {
      NavBar
    },
    data() {
      return {
        recipes: [],
        searchQuery: '',
        selectedCategory: null,
        categories: []
      };
    },
    computed: {
      filteredRecipes() {
        return this.recipes.filter(recipe => {
          const matchesSearch = recipe.nom.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesCategory = this.selectedCategory ? recipe.regime === this.selectedCategory : true;
          return matchesSearch && matchesCategory;
        });
      }
    },
    methods: {
      async fetchRecipes() {
        try {
          const snapshot = await db.collection('recipes').get();
          this.recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          console.error("Error fetching recipes: ", error);
        }
      },
      async fetchCategories() {
        try {
          const snapshot = await db.collection('categories').get();
          this.categories = snapshot.docs.map(doc => ({ value: doc.data().name, text: doc.data().name }));
          this.categories.unshift({ value: null, text: 'All Categories' });
        } catch (error) {
          console.error("Error fetching categories: ", error);
        }
      },
      viewRecipe(id) {
        this.$router.push(`/recipes/${id}`);
      }
    },
    mounted() {
      this.fetchRecipes();
      this.fetchCategories();
    }
  };
  </script>
  
  <style scoped>
  .mt-4 {
    margin-top: 2rem;
  }
  
  .mb-3 {
    margin-bottom: 1rem;
  }
  </style>
  