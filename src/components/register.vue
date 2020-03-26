<template>
  <div class="login">
    <at-card style="width: 300px;" :bordered="true">
      <h3 slot="title">Register NaovStore</h3>
      <div>
        <form>
          <img src="https://66.media.tumblr.com/659df02b71ed0fca9725f28cc671356b/tumblr_plbt6hv1ij1wuv92g_540.png" alt="" style="width:40%">
          <div class="input1">
            <p>Email: </p>
            <at-input v-model="email" placeholder="Please input"></at-input>
          </div>
          <div class="input">
            <p>Password: </p>
            <at-input v-model="password" type="password" placeholder="Please input Password"></at-input>
          </div>
          <div class="input">
            <at-button type="primary" @click.prevent="register({email, password})">Register</at-button>
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
      password: ''
    }
  },
  methods: {
    register (payload) {
      this.start()
      this.$store.dispatch('register', payload)
        .then(data => {
          this.open5('success', { err: 'Register success', msg: 'Register Success' })
          this.finish()
          this.$router.push('/login')
        })
        .catch(err => {
          const error = err.response.data.message
          this.open5('error', { err: error, msg: 'Register Error' })
          this.error()
        })
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
}

.input p {
  text-align: justify;
  margin-bottom: 10px;
}

.input1 p {
  text-align: justify;
  margin-bottom: 10px;
}
.at-btn--primary {
    border-color: #6190E8;
    background-color: #6190E8;
    width: 100px;
}
</style>
