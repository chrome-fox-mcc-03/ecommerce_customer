<template>
  <div class="login">
    <at-card style="width: 300px;" :bordered="true">
      <h3 slot="title">Welcome NaovStore</h3>
      <div>
        <form>
          <img src="https://66.media.tumblr.com/c12ce12e1ed28224065392f4481cb01e/tumblr_plwlnoB9Lp1w278b4_500.png" alt="" style="width:40%" v-if="status">
          <div class="input1">
            <p>Email: </p>
            <at-input v-model="email" placeholder="Please input"></at-input>
          </div>
          <div class="input">
            <p>Password: </p>
            <at-input v-model="password" type="password" placeholder="Please input Password"></at-input>
          </div>
          <div class="input-b">
            <at-button type="primary" @click="login({password, email})">Login</at-button>
            <at-button type="primary" @click="register">Register</at-button>
          </div>
        </form>
      </div>
    </at-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      status: true
    }
  },
  methods: {
    login (payload) {
      this.start()
      this.$store.dispatch('login', payload)
        .then(data => {
          localStorage.setItem('token', data.data.token)
          this.finish()
          this.open5('success', { err: 'Login success', msg: 'Login Success' })
          this.$store.commit('SET_LOGIN', true)
          this.$router.push('/')
        })
        .catch(err => {
          const error = err.response.data.message
          this.error()
          this.open5('error', { err: error, msg: 'Login Error' })
        })
    },
    register () {
      this.$router.push('/register')
    },
    changeStat () {
      this.status = true
    },
    start () {
      this.$Loading.start()
    },
    finish () {
      this.$Loading.finish()
    },
    error () {
      this.$Loading.error()
    },
    open5 (type, data) {
      this.$Notify({
        title: data.msg,
        message: data.err,
        type: type
      })
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  padding-top: 70px !important;
}
.input {
  margin-top: 25px;
  /* display: flex; */
  /* justify-content: space-around; */
}
.input-b {
  margin-top: 25px;
  display: flex;
  justify-content: space-around;
}
.input1 p {
  text-align: justify;
  margin-bottom: 10px;
}

.input p {
  text-align: justify;
  margin-bottom: 10px;
}
.at-btn--primary {
    border-color: #6190E8;
    background-color: #6190E8;
    width: 100px;
}
</style>
