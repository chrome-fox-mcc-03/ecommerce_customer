<template>
  <div class="login">
    <div class="container">
      <h2 class="ui teal header">
        <div class="content">
          Register to JAGONYA HELM
        </div>
      </h2>
      <Message />
      <form class="ui form" @submit.prevent="register">
        <div class="ui stacked segment">
          <div class="field">
            <div
              class="ui left icon input"
              placeholder="Username"
            >
              <input
                type="text"
                v-model="username"
                placeholder="Username"
                required
              />
              <i class="user icon"></i>
            </div>
          </div>
          <div class="field">
            <div
              class="ui left icon input"
              placeholder="E-mail address"
            >
              <input
                type="email"
                v-model="email"
                placeholder="E-mail address"
                required
              />
              <i class="mail icon"></i>
            </div>
          </div>
          <div class="field">
            <div
              class="ui left icon input"
              placeholder="Password"
            >
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                required
              >
              <i class="lock icon"></i>
            </div>
          </div>
          <button role="button" class="ui teal fluid large button">
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message.vue'

export default {
  name: 'FormRegister',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      temp: ''
    }
  },
  methods: {
    register () {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
        .then(data => {
          this.temp = data
          this.$router.push({ path: '/login' })
        })
        .catch(err => {
          this.temp = err
        })
        .finally(_ => {
          this.username = ''
          this.email = ''
          this.password = ''
        })
    }
  },
  components: {
    Message
  },
  created () {
    this.$store.commit('SET_ISMESSAGE')
  }
}
</script>
