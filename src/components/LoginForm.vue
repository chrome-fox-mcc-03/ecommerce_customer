<template>
  <div id="login-form" class="card z-depth-3">
    <div class="card-content">
      <form @submit.prevent="login">
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="email" class="validate" v-model="form.email">
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password" type="password" class="validate" v-model="form.password">
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <button type="submit" class="waves-effect waves-light btn">Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.form)
        .then(() => this.$router.push('/items'))
        .catch(() => {})
        .finally(() => {
          this.form.email = ''
          this.form.password = ''
        })
    }
  }
}
</script>

<style scoped>
  #login-form {
    padding-top: 3vh;
  }
  #login-form button {
    width: 15vw;
  }
</style>
