<template>
  <nav class="navbar navbar-expand-lg" role="navigation">
    <div class="container">
      <div class="collapse navbar-collapse" id="exCollapsingNavbar">
        <ul class="nav navbar-nav flex-row justify-content-between ml-auto">
          <li class="dropdown order-1">
            <button type="button" class="btn b-nav">
              <router-link to="/" class="nav-link buten">
                Home
              </router-link>
            </button>
            <button type="button" class="btn b-nav" v-if="!isLogin" @click="login">
              Login
            </button>
             <button type="button" class="btn b-nav" v-if="isLogin" @click="history">
              Transaction
            </button>
            <button type="button" class="btn b-nav" v-if="!isLogin" @click="register">
              Register
            </button>
            <button type="button" class="btn b-log" @click.prevent="logout" v-if="isLogin">
              Logout
            </button>
          </li>
        </ul>
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
    }
  },
  computed: {
    ...mapState(['isLogin'])
  }
}
</script>

<style>

</style>
