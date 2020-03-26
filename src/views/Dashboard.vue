<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'Dashboard',
  components: {
    Navbar
  },
  data () {
    return {
      dismissSecs: 0,
      dismissCountDown: 0,
      myMessage: '',
      variant: ''
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.access_token) {
      next()
    } else {
      next('/')
    }
  },
  computed: {
    successMessage () {
      return this.$store.state.successMessage
    }
  },
  created () {
    this.$store.dispatch('fetchProduct')
    this.$store.dispatch('fetchCategories')
  }
}
</script>

<style>

</style>
