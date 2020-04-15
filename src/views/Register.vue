<template>
<div id="register-container" class="d-flex justify-content-center align-items-center flex-column">
  <h1>Register</h1>
  <form @submit.prevent="register">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ex: budi@gmail.com">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="ex: xxxxx">
    </div>
    <div class="form-group">
      <label for="exampleInputMoney">Money</label>
      <input v-model="money" type="number" class="form-control" id="exampleInputMoney" placeholder="ex: 123500">
    </div>
    <button type="submit" class="submit">Register</button>
  </form>
</div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      money: ''
    }
  },
  methods: {
    register () {
      const payload = {
        email: this.email,
        password: this.password,
        money: this.money
      }
      this.$store.dispatch('register', payload)
        .then(result => {
          const condition = {
            icon: 'success',
            title: 'Register succesfully'
          }
          this.$store.dispatch('notification', condition)
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          const condition = {
            icon: 'error',
            title: err.response.data.message
          }
          this.$store.dispatch('notification', condition)
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    }
  }
}
</script>

<style>

</style>
