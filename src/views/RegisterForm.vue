<template>
  <div class="forms">
    <h2>NEW USER? LET'S REGISTER!</h2>
    <b-form @submit.prevent="registerUser" @reset="onReset">
      <b-form-group id="input-group-register-email" label="Email:" label-for="register-email">
        <b-form-input
          id="register-email"
          type="text"
          v-model="form.email"
          required
          placeholder="Enter email address"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-register-password"
        label="Password:"
        label-for="register-password"
      >
        <b-form-input
          id="register-password"
          type="password"
          v-model="form.password"
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <b-button class="btn" type="submit" variant="primary">REGISTER</b-button>
      <b-button class="btn" type="reset" variant="danger">Reset</b-button>
      <router-link class="btn" to="/">BACK</router-link>
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
        password: '',
        role: 'user'
      }
    }
  },
  components: {},
  methods: {
    registerUser () {
      // alert(JSON.stringify(this.form))
      // CALL AXIOS, SEND TO DATABASE WHO?
      console.log('>>> REGISTER USER @ LANDINGPAGE')
      this.$store
        .dispatch('register', this.form)
        .then(response => {
          console.log('REGISTER SUCCESS')
          console.log(response)
          this.$toasted.success('REGISTER SUCCESS')
          this.$router.push({ name: 'LandingPage' })
        })
        .catch(err => {
          console.log('ERROR CATCHED:')
          // console.log('ERR RESPONSE IS')
          // console.log(error.response.data.error);
          this.$toasted.error(err.response.data.errors)
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
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

  .btn {
    margin: 0.5vh;
    padding: 0.5vh;
  }

</style>
