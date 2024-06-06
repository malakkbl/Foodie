<template>
  <div class="profile-page">
    <NavBar />
    <b-container class="d-flex align-items-center justify-content-center profile-container">
      <b-row class="justify-content-center w-100">
        <b-col md="8" lg="6">
          <b-card class="profile-card text-center" bg-variant="light" border-variant="danger">
            <b-avatar
              :src="user.photoURL"
              class="mb-3"
              size="6rem"
            ></b-avatar>
            <b-card-body>
              <h3 class="card-title">{{ user.fullName }}</h3>
              <p class="card-text"><strong>Username:</strong> {{ user.username }}</p>
              <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
              <b-button variant="danger" @click="editProfile">Edit Profile</b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <b-modal id="editProfileModal" title="Edit Profile" v-model="showModal">
        <b-form @submit.prevent="updateProfile">
          <b-form-group label="Full Name">
            <b-form-input v-model="user.fullName" required></b-form-input>
          </b-form-group>
          <b-form-group label="Username">
            <b-form-input v-model="user.username" required></b-form-input>
          </b-form-group>
          <b-form-group label="Email">
            <b-form-input v-model="user.email" type="email" required></b-form-input>
          </b-form-group>
          <b-form-group label="Photo URL">
            <b-form-input v-model="user.photoURL" required></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="danger">Save Changes</b-button>
        </b-form>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { auth, db } from '@/firebase';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'UserProfilePage',
  components: {
    NavBar,
  },
  data() {
    return {
      user: {
        fullName: '',
        username: '',
        email: '',
        photoURL: ''
      },
      showModal: false
    };
  },
  methods: {
    async fetchUserProfile() {
      const userId = auth.currentUser.uid;
      const userDoc = await db.collection('users').doc(userId).get();
      if (userDoc.exists) {
        this.user = userDoc.data();
      } else {
        console.error("User not found");
      }
    },
    editProfile() {
      this.showModal = true;
    },
    async updateProfile() {
      const userId = auth.currentUser.uid;
      try {
        await db.collection('users').doc(userId).update(this.user);
        this.showModal = false;
        alert('Profile updated successfully');
      } catch (error) {
        console.error("Error updating profile: ", error);
        alert('Failed to update profile');
      }
    }
  },
  mounted() {
    this.fetchUserProfile();
  }
};
</script>

<style scoped>
.profile-page {
  background-color: #ffe6e6;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.profile-container {
  flex: 1;
}

.profile-card {
  padding: 20px;
  border-width: 2px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card-text {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
</style>
