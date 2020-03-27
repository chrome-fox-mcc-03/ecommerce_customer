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
  </section>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submitSignUp () {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('submitSignUp', data)
        .then(result => {
          this.$router.push(result)
        })
        .catch(_ => {
        })
    }
  }
}
</script>
