<template>
  <div class="shadow">
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand class="nav-title" >AlitopanExpress</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown v-if="isLogin" right>
          <template v-slot:button-content>
            <em>{{countItemInCart}} Cart</em>
          </template>
          <div @click="$event.stopPropagation()">
            <cart-component />
          </div>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item v-if="!isLogin"><router-link v-b-modal.loginModal to="">Sign In</router-link></b-dropdown-item>
          <b-dropdown-item v-if="!isLogin"><router-link v-b-modal.registerModal to="">Register</router-link></b-dropdown-item>
          <b-dropdown-item v-if="isLogin"><router-link v-b-modal.profileModal to="">Profile</router-link></b-dropdown-item>
          <b-dropdown-item v-if="isLogin" @click.prevent="logoutUser()"><router-link to="">Sign Out</router-link></b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <login-form title="Login User"></login-form>
  <register-form title="Register User"></register-form>
  <profile-card title="User Profile"></profile-card>

</div>
</template>

<script>
import CartComponent from './CartComponent.vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import ProfileCard from './UserProfile.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'NavBar',
  components: {
    CartComponent,
    LoginForm,
    RegisterForm,
    ProfileCard
  },
  methods: {
    logoutUser () {
      this.$store.dispatch('onLogoutUser')
    }
  },
  computed: {
    ...mapState(['isLogin']),
    ...mapGetters(['countItemInCart'])
  }
}
</script>

<style>
.nav-title {
  font-family: 'Caveat', cursive;
  position: fixed;
}
</style>
