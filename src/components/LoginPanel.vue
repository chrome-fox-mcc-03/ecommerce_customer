<template>
<div class="container-fluid">
  <div class="row d-flex justify-content-center" style="margin-top: 37px;margin-bottom: 11px;">
    <h1 class=" display-2 title-app">Jolie</h1>
  </div>
  <Loading v-if="isLoading"/>
  <div class="row" v-if="!isLoading">
    <div class="col d-flex justify-content-center">
      <img src="../assets/login.png" alt="" style="height: auto; width:auto">
    </div>
    <div class="col">
        <div class="modal-dialog text-center position-login">
          <div class="col-sm-20 main-section">
              <div class="modal-content">
                  <div class="col-12 form-input">
                      <form @submit.prevent="login">
                          <h1 class="login-text">LOGIN</h1>
                          <div class="form-group">
                              <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" aria-describedby="emailHelp" v-model="email">
                              <small class="form-text text-muted">*We'll never share your email with anyone else.</small>
                          </div>
                          <div class="form-group">
                              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                          </div>
                          <button type="submit" class="btn btn-success">Submit</button>
                      </form>
                      <div  class="m-2">
                          <router-link :to="`/register`" style="text-decoration:none; color: #a56161;">Sign Up for  Jolie</router-link>
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
import Loading from './Loading'
import axiosCostumer from '../config/index'

export default {
  name: 'LoginPanel',
  data () {
    return {
      email: '',
      password: ''

    }
  },
  components: {
    Loading
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  methods: {
    login () {
      this.$store.commit('SET_LOADING', true)
      // console.log(this.email, this.password)
      axiosCostumer({
        method: 'post',
        url: '/loginCostumers',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
        //   console.log(data)
          this.$router.push('/')
          localStorage.setItem('access_token', data.access_token)
        })
        .catch(({ response }) => {
          console.log(response)
          const { data } = response
          const { error } = data
          this.$vToastify.error(error)
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    }
  }
}
</script>

<style>
</style>
