<template>
  <div class="login">
    <div class="container">
      <h2 class="ui teal header">
        <div class="content">
          Log-in to JAGONYA HELM
        </div>
      </h2>
      <Message />
      <form class="ui form" @submit.prevent="login">
        <div class="ui stacked segment">
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
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message.vue'

export default {
  name: 'FormLogin',
  data () {
    return {
      email: '',
      password: '',
      temp: ''
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(data => {
          this.temp = data
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          this.temp = err
        })
        .finally(_ => {
          this.email = ''
          this.password = ''
        })
    }
  },
  components: {
    Message
  }
}
</script>
