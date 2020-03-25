<template>
<div id="login-container" class="d-flex justify-content-center align-items-center flex-column">
  <h1>Login</h1>
  <form @submit.prevent="login">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
    </div>
    <button type="submit" class="btn btn-primary">Login</button> <br>
    <router-link to="/register">Didn't have an account? Register here...</router-link>
  </form>
</div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(result => {
          localStorage.setItem('token', result.data.token)
          this.$store.commit('SET_ISLOGIN', true)
          this.$router.push({ name: 'Products' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
#login-container {
  width: 80vw;
  height: auto;
}
</style>
