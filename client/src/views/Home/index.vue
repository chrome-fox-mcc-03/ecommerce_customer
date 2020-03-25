<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click="toProductPage">
          <v-list-item-action>
            <v-icon>fas fa-store</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="toCartPage" v-if="hasLogin">
          <v-list-item-action>
            <v-icon>fas fa-shopping-cart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>My Cart</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="toHistoryPage" v-if="hasLogin">
          <v-list-item-action>
            <v-icon>fas fa-history</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Purchase History</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="dark" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>***Yu-Gi-Awch***</v-toolbar-title>
      <div class="ml-auto d-inline-flex">
        <div class="text-center" v-if="!hasLogin">
          <v-menu transition="fade-transition" min-width="200px">
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on" color="white" text icon>
                <v-icon>fas fa-user</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="toRegisterPage">
                <v-list-item-title class="register">Register</v-list-item-title>
              </v-list-item>
              <v-list-item @click="toLoginPage">
                <v-list-item-title class="login">Login</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <v-toolbar-title v-if="hasLogin" class="logout">
          <div class @click="logout">
            <v-icon class="mr-1">fas fa-sign-out-alt</v-icon>Logout
          </div>
        </v-toolbar-title>
      </div>
    </v-app-bar>

    <v-content id="background">
      <v-alert type="error" class="mt-5" v-if="isError">{{
        errorMessage
      }}</v-alert>
      <v-alert type="success" class="mt-5" v-if="isSuccess">{{
        successMessage
      }}</v-alert>
      <v-progress-linear
        indeterminate
        color="teal"
        v-if="isLoading"
      ></v-progress-linear>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      drawer: null
    }
  },
  methods: {
    toRegisterPage () {
      this.$store.commit('STOP_SUCCESS_ERROR')
      this.$router.push('/register')
    },
    toLoginPage () {
      this.$store.commit('STOP_SUCCESS_ERROR')
      this.$router.push('/login')
    },
    toProductPage () {
      this.$store.commit('STOP_SUCCESS_ERROR')
      this.$router.push('/')
    },
    toCartPage () {
      this.$store.commit('STOP_SUCCESS_ERROR')
      this.$router.push('/cart')
    },
    toHistoryPage () {
      this.$store.commit('STOP_SUCCESS_ERROR')
      this.$router.push('/history')
    },
    logout () {
      this.$store.commit('STOP_SUCCESS_ERROR')
      this.$router.push('/')
      localStorage.removeItem('access_token')
      this.$store.commit('LOGOUT')
    }
  },
  computed: {
    hasLogin () {
      return this.$store.state.hasLogin
    },
    isError () {
      return this.$store.state.errorStatus
    },
    errorMessage () {
      return this.$store.state.errorMessage
    },
    isSuccess () {
      return this.$store.state.succesStatus
    },
    successMessage () {
      return this.$store.state.successMessage
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('HAS_LOGIN')
    }
  }
}
</script>

<style>
.register:hover,
.login:hover,
.logout:hover {
  cursor: pointer
}
#background {
  background-image: url('../../assets/bg.jpg');
  background-attachment: fixed;
  background-repeat: no-repeat;
}
</style>
