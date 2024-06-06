<template>
    <div>
      <NavBar />
      <b-container class="mt-4">
        <b-row class="justify-content-center">
          <b-col md="8" lg="6">
            <b-card
              :title="recipe.nom"
              :img-src="recipe.image"
              img-alt="Recipe Image"
              img-top
            >
              <b-button 
                variant="outline-primary" 
                class="float-right" 
                @click="editRecipe"
              >
                <b-icon icon="pencil"></b-icon> Edit
              </b-button>
              <b-card-body>
                <b-container>
                  <b-row class="mb-3">
                    <b-col>
                      <b-card-text>
                        <h5>Description:</h5>
                        <p>{{ recipe.description }}</p>
                      </b-card-text>
                    </b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col>
                      <b-card-text>
                        <h5>Temps de préparation:</h5>
                        <p>{{ recipe.temps_preparation }} minutes</p>
                      </b-card-text>
                    </b-col>
                    <b-col>
                      <b-card-text>
                        <h5>Temps de cuisson:</h5>
                        <p>{{ recipe.temps_cuisson }} minutes</p>
                      </b-card-text>
                    </b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col>
                      <b-card-text>
                        <h5>Régime:</h5>
                        <p>{{ recipe.regime }}</p>
                      </b-card-text>
                    </b-col>
                    <b-col>
                      <b-card-text>
                        <h5>Portions:</h5>
                        <p>{{ recipe.portions }}</p>
                      </b-card-text>
                    </b-col>
                  </b-row>
                  <b-row class="mb-3">
                    <b-col>
                      <b-card-text>
                        <h5>Tags:</h5>
                        <p>
                          <span v-for="tag in recipe.tags" :key="tag" class="badge badge-pill badge-info">{{ tag }}</span>
                        </p>
                      </b-card-text>
                    </b-col>
                  </b-row>
                </b-container>
              </b-card-body>
              <b-tabs card>
                <b-tab title="Ingrédients" active>
                  <b-list-group>
                    <b-list-group-item v-for="ingredient in recipe.ingredients" :key="ingredient.nom">
                      {{ ingredient.nom }} - {{ ingredient.quantité }} {{ ingredient.unité }}
                    </b-list-group-item>
                  </b-list-group>
                </b-tab>
                <b-tab title="Instructions">
                  <b-list-group>
                    <b-list-group-item v-for="instruction in recipe.instructions" :key="instruction">
                      {{ instruction }}
                    </b-list-group-item>
                  </b-list-group>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase'; // Adjust the import based on your Firebase setup
  import NavBar from '../components/NavBar.vue';
  
  export default {
    name: 'RecipeDetailPage',
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
          tags: [],
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
        } else {
          console.error('Recipe not found');
        }
      },
      editRecipe() {
        this.$router.push({ name: 'EditRecipePage', params: { id: this.$route.params.id } });
      }
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
  .badge-pill {
    margin-right: 5px;
  }
  </style>
  