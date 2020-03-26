<template>
  <div class="shadow">
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand class="nav-title ml-5" style="font-size: 2rem" >AlitopanExpress</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto mr-5" >
        <b-nav-item-dropdown v-if="isLogin || statusLogin" right>
          <template v-slot:button-content>
            <em class="text-white mr-2" style="font-size:1em;"><span class="badge badge-success">{{countItemInCart}}</span> <i class="fab fa-opencart fa-2x"></i> Your Cart</em>
          </template>
          <div @click="$event.stopPropagation()" class="overflow-auto" style="max-height:60vw">
            <cart-component />
          </div>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em class="text-white mr-2" style="font-size:1em"><i class="far fa-user fa-2x"></i> User</em>
          </template>
          <b-dropdown-item v-if="!isLogin && !statusLogin" @click.prevent="$bvModal.show('loginModal')">Sign In</b-dropdown-item>
          <b-dropdown-item v-if="!isLogin && !statusLogin" @click.prevent="$bvModal.show('registerModal')">Register</b-dropdown-item>
          <b-dropdown-item v-if="isLogin || statusLogin" @click.prevent="$bvModal.show('profileModal')">Profile</b-dropdown-item>
          <b-dropdown-item v-if="isLogin || statusLogin" @click.prevent="logoutUser()">Sign Out</b-dropdown-item>
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
      this.statusLogin = false
      this.$store.dispatch('onLogoutUser')
    }
  },
  computed: {
    ...mapState(['isLogin']),
    ...mapGetters(['countItemInCart'])
  },
  data () {
    return {
      statusLogin: false
    }
  },
  created () {
    const token = localStorage.getItem('access_token')
    if (token) {
      this.statusLogin = true
    }
  }
}
</script>

<style>
.nav-title {
  font-family: 'Caveat', cursive;
}
</style>
