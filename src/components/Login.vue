<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email address</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      Don't have an account? <router-link to="/welcome/register">Register here</router-link>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

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
        .then((result) => {
          localStorage.setItem('token', result.data.token)
          this.email = ''
          this.password = ''
          this.$store.commit('SET_ISLOGIN', true)
          this.$router.push({ name: 'Products' })
        }).catch((err) => {
          Toast.fire({
            icon: 'error',
            title: err.response.data.message
          })
        })
    }
  }
}
</script>

<style>

</style>
