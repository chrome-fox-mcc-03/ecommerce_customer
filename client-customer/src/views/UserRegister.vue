<template>
    <div>
        <div class="columns">
            <div class="column"></div>
            <div class="column is-four-third">
                <h1 class="title is-2 has-text-black-ter is-family-secondary has-text-centered">Register</h1><br>
                <form @submit.prevent="register">
                    <UserForm @userEmail="getEmail" @userPassword="getPassword"/><br>
                    <div class="field">
                        <p class="control has-text-centered">
                            <button class="button is-success is-rounded">
                                Register
                            </button>
                        </p>
                    </div>
                </form>
                <p class="has-text-centered" >
                  or
                </p>
                <p class="has-text-centered">
                  <router-link to="/login" class="button is-primary is-outlined is-rounded">
                    Login
                  </router-link>
                </p>
            </div>
            <div class="column"></div>
        </div>
    </div>
</template>

<script>
import UserForm from '../components/UserForm'
export default {
  name: 'Register',
  components: {
    UserForm
  },
  data () {
    return {
      userEmail: '',
      userPassword: ''
    }
  },
  methods: {
    register () {
      const email = this.userEmail
      const password = this.userPassword
      const payload = {
        email,
        password
      }
      this.$store.dispatch('register', payload)
    },
    getEmail (data) {
      this.userEmail = data
    },
    getPassword (data) {
      this.userPassword = data
    }
  }
}
</script>

<style scoped>
</style>
