<template>
    <div>
      <NavBar />
      <b-container class="mt-4">
        <b-row class="justify-content-center">
          <b-col md="6">
            <b-card title="Add Recipe">
              <b-form @submit.prevent="addRecipe">
                <b-form-group label="Recipe Name">
                  <b-form-input v-model="recipe.nom" required></b-form-input>
                </b-form-group>
                <b-form-group label="Description">
                  <b-form-textarea v-model="recipe.description" required></b-form-textarea>
                </b-form-group>
                <b-form-group label="Ingredients">
                  <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
                    <b-form-input v-model="ingredient.nom" placeholder="Name" required></b-form-input>
                    <b-form-input v-model="ingredient.quantité" placeholder="Quantity" required></b-form-input>
                    <b-form-input v-model="ingredient.unité" placeholder="Unit"></b-form-input>
                  </div>
                  <b-button @click="addIngredient" variant="success">Add Ingredient</b-button>
                </b-form-group>
                <b-form-group label="Instructions">
                  <b-form-textarea v-model="recipe.instructions" required></b-form-textarea>
                </b-form-group>
                <b-form-group label="Preparation Time">
                  <b-form-input v-model="recipe.temps_preparation" required></b-form-input>
                </b-form-group>
                <b-form-group label="Cooking Time">
                  <b-form-input v-model="recipe.temps_cuisson" required></b-form-input>
                </b-form-group>
                <b-form-group label="Diet">
                  <b-form-input v-model="recipe.regime" required></b-form-input>
                </b-form-group>
                <b-form-group label="Portions">
                  <b-form-input v-model="recipe.portions" required></b-form-input>
                </b-form-group>
                <b-form-group label="Tags">
                  <b-form-input v-model="recipe.tags" placeholder="Tags, comma separated" required></b-form-input>
                </b-form-group>
                <b-form-group label="Image URL">
                  <b-form-input v-model="recipe.image" required></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="danger">Add Recipe</b-button>
              </b-form>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
  import { db, auth } from '@/firebase';
  import NavBar from '../components/NavBar.vue';
  
  export default {
    name: 'AddRecipePage',
    components: {
      NavBar
    },
    data() {
      return {
        recipe: {
          nom: '',
          description: '',
          ingredients: [],
          instructions: '',
          temps_preparation: '',
          temps_cuisson: '',
          regime: '',
          portions: '',
          tags: '',
          image: ''
        }
      };
    },
    methods: {
      addIngredient() {
        this.recipe.ingredients.push({ nom: '', quantité: '', unité: '' });
      },
      async addRecipe() {
        try {
          await db.collection('recipes').add({
            ...this.recipe,
            authorID: auth.currentUser.uid,
            tags: this.recipe.tags.split(',')
          });
          this.$router.push('/recipes');
        } catch (error) {
          console.error("Error adding recipe: ", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .mt-4 {
    margin-top: 2rem;
  }
  </style>
  