<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <strong>AleshaScarf</strong>
        </b-navbar-item>
      </template>
      <template slot="start">
        <router-link tag="b-navbar-item" to="/">Home</router-link>
        <router-link tag="b-navbar-item" v-if="isLogin" to="/cart"><i class="fas fa-shopping-cart"></i>
        </router-link>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link v-if="!isLogin" tag="a" class="button is-danger" to="/signup">
              <strong>Sign up</strong>
            </router-link>
            <router-link v-if="!isLogin" tag="a" class="button is-light" to="/login">Log in</router-link>
            <button v-if="isLogin" class="button is-danger" @click="logout">Logout</button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('LOGOUT')
      this.$router.push('/login')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.access_token
    }
  }
}
</script>
