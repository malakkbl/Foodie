<template>
    <div>
      <NavBar />
      <b-container class="mt-4">
        <b-row class="justify-content-center">
          <b-col md="8" lg="6">
            <b-card title="Add New Recipe">
              <b-form @submit.prevent="addRecipe">
                <b-form-group label="Recipe Name" label-for="recipe-name">
                  <b-form-input
                    id="recipe-name"
                    v-model="recipe.nom"
                    required
                    placeholder="Enter recipe name"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Description" label-for="recipe-description">
                  <b-form-textarea
                    id="recipe-description"
                    v-model="recipe.description"
                    required
                    placeholder="Enter recipe description"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group label="Image URL" label-for="recipe-image">
                  <b-form-input
                    id="recipe-image"
                    v-model="recipe.image"
                    required
                    placeholder="Enter image URL"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Regime" label-for="recipe-regime">
                  <b-form-select
                    id="recipe-regime"
                    v-model="recipe.regime"
                    :options="regimeOptions"
                    required
                  ></b-form-select>
                </b-form-group>
                <b-form-group label="Preparation Time" label-for="prep-time">
                  <b-form-input
                    id="prep-time"
                    v-model="recipe.temps_preparation"
                    type="number"
                    required
                    placeholder="Enter preparation time in minutes"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Cooking Time" label-for="cook-time">
                  <b-form-input
                    id="cook-time"
                    v-model="recipe.temps_cuisson"
                    type="number"
                    required
                    placeholder="Enter cooking time in minutes"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Portions" label-for="portions">
                  <b-form-input
                    id="portions"
                    v-model="recipe.portions"
                    type="number"
                    required
                    placeholder="Enter number of portions"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Ingredients" label-for="ingredients">
                  <div v-for="(ingredient, index) in ingredients" :key="index" class="mb-2">
                    <b-form-row>
                      <b-col>
                        <b-form-input
                          v-model="ingredient.nom"
                          placeholder="Ingredient Name"
                        ></b-form-input>
                      </b-col>
                      <b-col>
                        <b-form-input
                          v-model="ingredient.quantité"
                          placeholder="Quantity"
                          type="number"
                        ></b-form-input>
                      </b-col>
                      <b-col>
                        <b-form-input
                          v-model="ingredient.unité"
                          placeholder="Unit"
                        ></b-form-input>
                      </b-col>
                      <b-col cols="auto">
                        <b-button @click="removeIngredient(index)" variant="danger">Remove</b-button>
                      </b-col>
                    </b-form-row>
                  </div>
                  <b-button @click="addIngredient" class="mt-3" variant="secondary">Add Ingredient</b-button>
                </b-form-group>
                <b-form-group label="Instructions" label-for="instructions">
                  <b-form-textarea
                    id="instructions"
                    v-model="instructionsInput"
                    required
                    placeholder="Enter instructions (one per line)"
                  ></b-form-textarea>
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
  import { db } from "@/firebase"; 
  import NavBar from "../components/NavBar.vue";
  
  export default {
    name: "AddRecipePage",
    components: {
      NavBar,
    },
    data() {
      return {
        recipe: {
          nom: "",
          description: "",
          ingredients: [],
          instructions: [],
          temps_preparation: 0,
          temps_cuisson: 0,
          regime: "",
          portions: 0,
          tags: [],
          image: "",
        },
        ingredients: [
          { nom: "", quantité: "", unité: "" },
        ],
        instructionsInput: "",
        regimeOptions: ["Omnivore", "Végétarien"],
      };
    },
    methods: {
      addIngredient() {
        this.ingredients.push({ nom: "", quantité: "", unité: "" });
      },
      removeIngredient(index) {
        this.ingredients.splice(index, 1);
      },
      async addRecipe() {
        try {
          if (!this.recipe.nom || !this.recipe.description || !this.recipe.regime || !this.recipe.image) {
            console.warn("Please fill out all required fields.");
            return;
          }
  
          this.recipe.ingredients = this.ingredients;
  
          this.recipe.instructions = this.instructionsInput
            .split("\n")
            .filter((item) => item.trim() !== "");
  
          console.log(this.recipe); 
  
          await db.collection("recipes").add(this.recipe);
          this.$router.push("/allrecipes");
        } catch (error) {
          console.error("Error adding recipe:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .mt-4 {
    margin-top: 2rem;
  }
  </style>
  