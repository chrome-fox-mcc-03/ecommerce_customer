<template>
  <div class="big-space">
    <Loader v-if="isLoading"/>
    <div class="overlaytron" style="background-color: rgba(46, 71, 86, 0.5)">
      <div class="for-form">
        <form @submit.prevent="signup">
          <h2 class="label-form">Sign up</h2>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="name" class="form-control rounded-0" id="name">
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="email" class="form-control rounded-0" id="email">
          </div>
          <div class="form-group">
            <label for="passowrd">Password</label>
            <input type="password" v-model="password" class="form-control rounded-0" id="passowrd">
          </div>
          <div class="btn-space-form">
            <button type="submit" class="my-btn my-btn-teal mt-2 special" style="margin-left: 0; font-size: 1rem;">Sign up</button>
            <button @click="redirToLandingPage" class="my-btn my-btn-maroon mt-2 special" style="margin-left: 0; font-size: 1rem;">Back</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue'
export default {
  name: 'SignupPage',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signup () {
      this.$store.commit('SET_ISLOADING', true)
      this.$store.dispatch('signup', { name: this.name, email: this.email, password: this.password })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          this.$toasted.show(`Welcome to the club, ${data.currentUser}!`, {
            duration: 4000
          })
          this.$router.push('/catalog')
          console.log(data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    },
    redirToLandingPage () {
      this.$router.push('/')
    }
  },
  components: {
    Loader
  },
  computed: {
    isLoading: function () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style>

</style>
