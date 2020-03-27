<template>
  <section class="section hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-4-widescreen">
            <div class="has-text-centered">
              <h1 class="title">Create your account!</h1>
            </div>
            <form @submit.prevent="submitSignUp">
              <div class="field">
                <label for class="label">Name</label>
                <div class="control has-icons-left">
                  <input v-model="name" type="text" class="input" required />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for class="label">Email</label>
                <div class="control has-icons-left">
                  <input v-model="email" type="email" class="input" required />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for class="label">Password</label>
                <div class="control has-icons-left">
                  <input v-model="password" type="password" class="input" required />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <button class="button is-danger" type="submit">Sign Up</button>
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
  name: 'SignUp',
  data () {
    return {
      isLoading: false,
      name: '',
      email: '',
      password: ''
    }
  },
  components: {
    Loading
  },
  methods: {
    submitSignUp () {
      this.isLoading = true
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('submitSignUp', data)
        .then(result => {
          this.isLoading = false
          this.$router.push(result)
        })
        .catch(err => {
          this.isLoading = false
          const status = {
            title: 'Register error!',
            body: err.response.data.errors[0],
            type: 'error',
            canTimeout: true,
            duration: 2000
          }
          this.$vToastify.error(status)
        })
    }
  }
}
</script>
