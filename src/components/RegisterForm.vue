<template>
  <div id="register-form" class="card z-depth-3">
      <div class="card-content">
        <form @submit.prevent="register">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">account_circle</i>
              <input id="username-regis" type="text" class="validate" v-model="form.username">
              <label for="username-regis">Username</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">email</i>
              <input id="email-regis" type="email" class="validate" v-model="form.email">
              <label for="email-regis">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">security</i>
              <input id="password-regis" type="password" class="validate" v-model="form.password">
              <label for="password-regis">Password</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <button type="submit" class="waves-effect waves-light btn">Register</button>
            </div>
            <router-link to="/login">Back to login</router-link>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', this.form)
        .then(() => {
          this.$router.push('/login')
        })
        .catch(() => {})
        .finally(() => {
          this.form.email = ''
          this.form.password = ''
        })
    }
  }
}
</script>

<style>
  #register-form {
    padding-top: 3vh;
  }
  #register-form button {
    width: 15vw;
  }
</style>
