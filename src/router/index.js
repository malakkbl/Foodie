import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RecipesPage from '../views/RecipesPage.vue';
import RecipeDetailPage from '../views/RecipeDetailPage.vue';
import AddRecipePage from '../views/AddRecipePage.vue';
import EditRecipePage from '../views/EditRecipePage.vue';
import LoginPage from '../views/LoginPage.vue';
import SignupPage from '../views/SignupPage.vue';
import UserProfilePage from '../views/UserProfilePage.vue';

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/recipes', name: 'RecipesPage', component: RecipesPage },
  { path: '/recipes/:id', name: 'RecipeDetailPage', component: RecipeDetailPage },
  { path: '/add-recipe', name: 'AddRecipePage', component: AddRecipePage },
  { path: '/edit-recipe/:id', name: 'EditRecipePage', component: EditRecipePage },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/signup', name: 'SignupPage', component: SignupPage },
  { path: '/profile', name: 'UserProfilePage', component: UserProfilePage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
