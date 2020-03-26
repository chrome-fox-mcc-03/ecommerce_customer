<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" type="text" class="form-control" id="name" placeholder="Name">
      </div>
      <div class="form-group">
        <label for="email">Email address</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
      Have an account? <router-link to="/welcome/login">Login here</router-link>
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
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
        .then((result) => {
          localStorage.setItem('token', result.data.token)
          this.email = ''
          this.password = ''
          this.name = ''
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
