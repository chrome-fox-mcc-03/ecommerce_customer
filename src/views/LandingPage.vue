<template>
  <div class="forms">
    <h1>E-COMMERCE </h1>
    <b-form @submit.prevent="loginUser" @reset="onReset">
      <b-form-group
        id="input-group-login-email"
        label="Email:"
        label-for="login-email"
      >
        <b-form-input
          id="login-email"
          type="text"
          v-model="form.email"
          required
          placeholder="Enter email address"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-login-password"
        label="Password:"
        label-for="login-password"
      >
        <b-form-input
          id="login-password"
          type="password"
          v-model="form.password"
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <div class="btn-bars">
         <b-button class="btn" type="submit" variant="primary">LOGIN</b-button>
        <b-button class="btn" type="reset" variant="danger">Reset</b-button>
        <router-link class="btn" to="/register">REGISTER</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  components: {},
  methods: {
    loginUser () {
      // alert(JSON.stringify(this.form))
      // CALL AXIOS, SEND TO DATABASE WHO?
      console.log('>>> LOGIN USER @ LANDINGPAGE')
      this.$store.dispatch('login', this.form)
        .then(response => {
          console.log('LOGIN SUCCESS')
          // console.log(response)
          localStorage.setItem('token', response.data.token)
          this.$router.push({ path: '/catalog' })
          this.$store.commit('SET_LOGIN', true)
        })
        .catch(err => {
          console.log('ERROR CATCHED:')
          // console.log('ERR RESPONSE IS')
          const errArr = err.response.data.errors
          console.log(err.response.data.errors)
          errArr.forEach(el => {
            this.$toasted.error(el, {
              position: 'bottom-center'
            })
          })
        })
    },
    onReset () {
      // Reset our form values
      this.form.name = ''
      this.form.imageURL = ''
      this.price = 0
      this.stock = 0
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  computed: {}
}
</script>

<style>
  .forms {
    text-align: center;
    justify-content: center;
    width: 50%;
    margin-left: 25%;
  }

  .btn-bars {
    margin: 2vh;
    padding: 2vh;
  }

  .btn {
    margin: 0.5vh;
    padding: 0.5vh;
  }
</style>
