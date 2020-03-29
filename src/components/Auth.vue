<template>
  <div class="container">
    <div class="row justify-content-center">
        <div class="card">
          <article class="card-body bg-dark">
            <h4 class="card-title text-center mb-4 mt-1 text-light">{{ action }}</h4>
            <hr>
              <form @submit.prevent="submitForm">
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"></span>
                    </div>
                    <input name="" class="form-control" placeholder="Email" type="email" v-model="email" required>
                  </div>
                </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"> </span>
                    </div>
                      <input
                      class="form-control"
                      placeholder="Password"
                      type="password"
                      v-model="password"
                      required>
                  </div>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-outline-secondary active btn-block" :value="action"> {{ action }} </button>
                </div>
              </form>
          </article>
        </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Auth',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  props: {
    action: String
  },
  methods: {
    ...mapMutations(['SET_LOADING', 'SET_ISLOGIN', 'SHOW_ERROR']),
    ...mapActions(['login', 'register']),
    submitForm () {
      this.SET_LOADING(true)
      const data = {
        email: this.email,
        password: this.password
      }
      if (this.action === 'Register') {
        data.role = 'customer'
        this.register(data)
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            this.SET_ISLOGIN(true)
            this.$router.push('/')
            this.SET_LOADING(false)
          })
          .catch(err => {
            this.SHOW_ERROR(err.response.data.error)
            this.SET_LOADING(false)
          })
      } else if (this.action === 'Login') {
        this.login(data)
          .then(({ data }) => {
            localStorage.setItem('role', data.role)
            localStorage.setItem('token', data.token)
            this.SET_ISLOGIN(true)
            this.$router.push('/')
            this.SET_LOADING(false)
          })
          .catch(err => {
            this.SHOW_ERROR(err.response.data.error)
            this.SET_LOADING(false)
          })
      }
    }
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}

.card {
  height: 300px;
  width: 350px;
}

</style>
