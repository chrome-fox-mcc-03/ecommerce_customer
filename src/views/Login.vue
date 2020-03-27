<template>
  <section class="section hero">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-4-widescreen">
                        <div class="has-text-centered">
                            <h1 class="title">Login to your account!</h1>
                        </div>
                        <form @submit.prevent="submitLogin">
                            <div class="field">
                                <label for="" class="label">Email</label>
                                <div class="control has-icons-left">
                                    <input v-model="email" type="email" class="input" required>
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label for="" class="label">Password</label>
                                <div class="control has-icons-left">
                                    <input v-model="password" name="password_login" type="password" class="input"
                                        required>
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <button class="button is-danger" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
    </section>
</template>

<script>
import Loading from 'vue-loading-overlay'
export default {
  name: 'Login',
  data () {
    return {
      isLoading: false,
      email: '',
      password: ''
    }
  },
  components: {
    Loading
  },
  methods: {
    submitLogin () {
      this.isLoading = true
      const data = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('submitLogin', data)
        .then(result => {
          this.isLoading = false
          this.$router.push(result)
        })
        .catch(_ => {
          this.isLoading = false
        })
    }
  }
}
</script>
