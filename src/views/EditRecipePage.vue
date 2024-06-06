<template>
    <div>
      <NavBar />
      <b-container class="mt-4">
        <b-row class="justify-content-center">
          <b-col md="8" lg="6">
            <h1>Edit Recipe</h1>
            <b-form @submit.prevent="updateRecipe">
              <b-form-group label="Name">
                <b-form-input v-model="recipe.nom" required></b-form-input>
              </b-form-group>
              <b-form-group label="Description">
                <b-form-textarea v-model="recipe.description" rows="3" required></b-form-textarea>
              </b-form-group>
              <b-form-group label="Temps de préparation (minutes)">
                <b-form-input v-model="recipe.temps_preparation" type="number" required></b-form-input>
              </b-form-group>
              <b-form-group label="Temps de cuisson (minutes)">
                <b-form-input v-model="recipe.temps_cuisson" type="number" required></b-form-input>
              </b-form-group>
              <b-form-group label="Régime">
                <b-form-input v-model="recipe.regime" required></b-form-input>
              </b-form-group>
              <b-form-group label="Portions">
                <b-form-input v-model="recipe.portions" type="number" required></b-form-input>
              </b-form-group>
              <b-form-group label="Tags">
                <b-form-input v-model="recipe.tags" required></b-form-input>
              </b-form-group>
              <b-form-group label="Image URL">
                <b-form-input v-model="recipe.image" type="url" required></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="danger">Save Changes</b-button>
            </b-form>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  import NavBar from '../components/NavBar.vue';
  
  export default {
    name: 'EditRecipePage',
    components: {
      NavBar,
    },
    data() {
      return {
        recipe: {
          nom: '',
          description: '',
          ingredients: [],
          instructions: [],
          temps_preparation: 0,
          temps_cuisson: 0,
          regime: '',
          portions: 0,
          tags: '',
          image: '',
        },
      };
    },
    methods: {
      async fetchRecipe() {
        const recipeId = this.$route.params.id;
        const recipeDoc = await db.collection('recipes').doc(recipeId).get();
        if (recipeDoc.exists) {
          this.recipe = recipeDoc.data();
          this.recipe.tags = this.recipe.tags.join(', '); // Convert array to comma-separated string for input
        } else {
          console.error('Recipe not found');
        }
      },
      async updateRecipe() {
        try {
          const recipeId = this.$route.params.id;
          this.recipe.tags = this.recipe.tags.split(',').map(tag => tag.trim()); // Convert comma-separated string back to array
          await db.collection('recipes').doc(recipeId).update(this.recipe);
          this.$router.push({ name: 'RecipeDetailPage', params: { id: recipeId } });
        } catch (error) {
          console.error('Error updating recipe: ', error);
        }
      },
    },
    mounted() {
      this.fetchRecipe();
    },
  };
  </script>
  
  <style scoped>
  .mt-4 {
    margin-top: 2rem;
  }
  </style>
  