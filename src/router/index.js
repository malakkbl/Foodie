import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import SignupPage from '../views/SignupPage.vue';
import UserProfilePage from '../views/UserProfilePage.vue';
import CategoryPage from '../views/CategoryPage.vue';
import RecipePage from '../views/RecipePage.vue';
import RecipesPage from '../views/RecipesPage.vue';
import RecipeDetailPage from '../views/RecipeDetailPage.vue';
import AddRecipePage from '../views/AddRecipePage.vue';
import EditRecipePage from '../views/EditRecipePage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: SignupPage,
  },
  {
    path: '/profile',
    name: 'UserProfilePage',
    component: UserProfilePage,
  },
  {
    path: '/categories',
    name: 'CategoryPage',
    component: CategoryPage,
  },
  {
    path: '/recipes',
    name: 'RecipePage',
    component: RecipePage,
  },
  {
    path: '/allrecipes',
    name: 'RecipesPage',
    component: RecipesPage,
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetailPage',
    component: RecipeDetailPage,
  },
  {
    path: '/add-recipe',
    name: 'AddRecipePage',
    component: AddRecipePage,
  },
  {
    path: '/edit-recipe/:id', 
    name: 'EditRecipePage',
    component: EditRecipePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
