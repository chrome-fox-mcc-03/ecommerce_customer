<template>
  <b-modal id="loginModal" hide-header="" :title="title">
    <form @submit.prevent="loginProcess" class="form-group">
        <div class="container d-flex flex-column justify-content-center align-items-baseline">
          <h1>Login</h1>
          <hr>
          <div>
            <label for="email">Email:</label><br>
            <input v-model="email" type="text" id="email" name="email"><br>
          </div>
          <div>
            <label for="password">Password:</label><br>
            <input v-model="password" type="password" id="password" name="password"><br><br>
          </div>
          <hr>
          <input type="submit" value="Submit">
        </div>
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  props: {
    title: String
  },
  methods: {
    ...mapActions(['onLoginUser']),
    loginProcess () {
      const { email, password } = this
      this.onLoginUser({ email, password })
    }
  }
}
</script>

<style>

</style>
