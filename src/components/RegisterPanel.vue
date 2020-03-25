<template>
<div class="container-fluid">
  <div class="row d-flex justify-content-center" style="margin-top: 37px;margin-bottom: 11px;">
    <h1 class=" display-2 title-app">Jolie</h1>
  </div>
  <div class="row">
    <div class="col d-flex justify-content-center">
      <img src="../assets/login.png" alt="" style="height: auto; width:auto">
    </div>
    <div class="col">
        <div class="modal-dialog text-center position-login">
          <div class="col-sm-20 main-section">
              <div class="modal-content">
                  <div class="col-12 form-input">
                      <form @submit.prevent="register">
                          <h1 class="login-text">REGISTER</h1>
                          <div class="form-group">
                              <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" aria-describedby="emailHelp" v-model="email">
                          </div>
                          <div class="form-group">
                              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                          </div>
                          <button type="submit" class="btn btn-success">Submit</button>
                      </form>
                      <div  class="m-2">
                          <router-link :to="`/login`" style="text-decoration:none; color: #a56161;">Login</router-link>
                      </div>
                  </div>
              </div>
            </div>
          </div>
    </div>

  </div>
</div>
</template>

<script>
import axiosCostumer from '../config/index'

export default {
  name: 'RegisterPanel',
  data () {
    return {
      email: '',
      password: ''

    }
  },
  methods: {
    register () {
      axiosCostumer({
        method: 'post',
        url: '/registerCostumers',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.$router.push('/login')
        })
        .catch(({ response }) => {
          console.log(response)
          const { data } = response
          const { errors } = data
          this.$vToastify.error(errors[0])
        })
    }
  }
}
</script>

<style>
</style>
