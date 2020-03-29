<template>
<div>
  <Navbar />
  <div class="container" style="margin-top:10rem; margin-bottom:4.3rem">
    <div class="row justify-content-md-center">
      <div class="col-md-center">
        <form class="border border-dark form-login-custom bg-dark" style="padding:2.3rem !important">
        <p class="h4 mb-4 text-center text-white font-custom-roboto">Register</p>
        <input type="email" class="form-control mb-4" id="email-register" placeholder="Email" v-model="email" /><br/>
        <input type="password" class="form-control mb-4" id="password-register" placeholder="Password" v-model="password" /><br/>
        <button class="btn btn-info btn-block my-4 font-custom-roboto" type="submit" id="btn-register" @click.prevent="register()">Register</button>
        <div class="text-center">
          <p class="text-white">or Login with:</p>
        </div>
        </form>
      </div>
    </div>
  </div>
  <Footer class="footer" />
</div>
</template>

<script>
import Navbar from '../components/NavbarLoginRegister'
import Footer from '../components/Footer'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    Navbar,
    Footer
  },
  methods: {
    register () {
      this.$store.commit('SET_ISLOADING', true)
      const email = this.email
      const password = this.password
      this.$store.dispatch('register', { email, password })
        .then((result) => {
          this.$notify({
            group: 'foo',
            title: 'Hello',
            text: 'Register Success!'
          })
          localStorage.setItem('token', result.data.token)
          this.$router.push('/')
        })
        .catch((err) => {
          this.$notify({
            group: 'foo',
            title: 'Hello',
            text: err.response.data.message,
            type: 'error'
          })
        })
        .finally(() => {
          this.$store.commit('SET_ISLOADING', false)
        })
    }
  }
}
</script>

<style scoped>
.form-login-custom {
  border-radius:10%;
  border-color: none;
}
.footer {
  margin-top: 6.8rem;
}
</style>
