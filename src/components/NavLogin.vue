<template>
  <div id="card">
    <div class="tombol">
      <button @click="navLogin('register')">Register</button>
      <button @click="navLogin('login')">Login</button>
    </div>
    <div class="login-register">
      <Login v-if="isForm === 'login'"></Login>
      <Register v-else-if="isForm === 'register'"></Register>
    </div>
    <div class="link-register">

    </div>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'

export default {
  name: 'NavLogin',
  components: {
    Login,
    Register
  },
  methods: {
    navLogin (currentNav) {
      this.$store.commit('SET_IS_NAV_LOGIN', currentNav)
    }
  },
  computed: {
    isForm () {
      return this.$store.state.isNavLogin
    }
  }
}
</script>

<style>
  #card {
    margin: 10px auto;
    border: 1px solid grey;
    width: 60%;
    /* height: 100px; */
    background-color: white;
    padding: 20px;
  }
  .tombol {
    border-bottom: 1px solid grey;
    padding-bottom: 10px;
  }
  #card .tombol button:hover {
    background-color: blue;
    color: white;
  }
  #card .tombol button:active {
    background-color: blue;
  }
</style>
