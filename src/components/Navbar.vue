<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav mx-auto">
            <a type="button" class="nav-item nav-link" @click="home">
              Home
            </a>
            <a type="button" class="nav-item nav-link" v-if="!isLogin" @click="login">
              Login
            </a>
             <a type="button" class="nav-item nav-link" v-if="isLogin" @click="history">
              Transaction
            </a>
            <a type="button" class="nav-item nav-link" v-if="!isLogin" @click="register">
              Register
            </a>
            <a type="button" class="nav-item nav-link" @click.prevent="logout" v-if="isLogin">
              Logout
            </a>
          </div>
       </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  methods: {
    ...mapMutations(['SET_LOGOUT', 'SHOW_ERROR']),
    logout () {
      this.SET_LOGOUT()
      this.$router.push('/')
      this.SHOW_ERROR('')
    },
    login () {
      this.$router.push('login')
      this.SHOW_ERROR('')
    },
    register () {
      this.$router.push('register')
      this.SHOW_ERROR('')
    },
    history () {
      this.$router.push('history')
      this.SHOW_ERROR('')
    },
    home () {
      this.$router.push('/')
      this.SHOW_ERROR('')
    }
  },
  computed: {
    ...mapState(['isLogin'])
  }
}
</script>

<style>

</style>
