<template>
  <b-modal id="registerModal" hide-footer=true hide-header=true :title="title">
      <form @submit.prevent="registerProcess" class="form-group">
        <div class="container d-flex flex-column justify-content-center align-items-baseline">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>
            <div class="d-flex flex-row flex-wrap justify-content-start align-items-baseline mb-2">
              <label for="email"><b>Email :</b></label>
              <input v-model="email" type="text" placeholder="Enter email" name="email" required><br>
            </div>
            <div class="d-flex flex-row flex-wrap justify-content-start align-items-baseline mt-2">
              <label for="password"><b>Password :</b></label>
              <input v-model="password" type="password" placeholder="Enter Password" name="password" required>
            </div>
              <hr>
            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

            <button type="submit" class="registerbtn btn btn-primary align-self-end">Register</button>
        </div>
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RegisterForm',
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
    ...mapActions(['onRegisterUser']),
    registerProcess () {
      const { email, password } = this
      this.onRegisterUser({ email, password })
      console.log('Register', this.email, this.password)
    }
  }
}
</script>

<style>

</style>
