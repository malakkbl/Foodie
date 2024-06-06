<template>
    <div>
      <NavBar />
      <b-container class="mt-4">
        <b-row>
          <b-col md="4" v-for="recipe in recipes" :key="recipe.id" class="d-flex align-items-stretch mb-4">
            <b-card :title="recipe.nom" :img-src="recipe.image" img-alt="Recipe Image" img-top class="flex-fill">
              <b-card-text class="flex-grow-1">
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
    name: 'RecipePage',
    components: {
      NavBar,
    },
    data() {
      return {
        recipes: [],
      };
    },
    methods: {
      async fetchRecipes() {
        const category = this.$route.query.category;
        const recipeCollection = await db.collection('recipes').where('regime', '==', category).get();
        this.recipes = recipeCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      },
      viewRecipe(recipeId) {
        this.$router.push({ name: 'RecipeDetailPage', params: { id: recipeId } });
      },
    },
    watch: {
      '$route.query.category': 'fetchRecipes'
    },
    mounted() {
      this.fetchRecipes();
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
  .b-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .b-card-text {
    flex-grow: 1;
  }
  </style>
  