<template>
  <div class="container pt-5">
    <div class="row text-center d-flex justify-content-center">
      <div class="cols-12 col-md-8 col-lg-6 col-xl-4">
        <img src="https://i2.wp.com/d3g5ywftkpzr0e.cloudfront.net/wp-content/uploads/2020/01/16161919/hacktiv8.png" alt="Hacktiv 8" width="150" height="150">
        <form @submit.prevent="onSubmit" @reset.prevent="onReset">
          <div class="form-group" id="input-group-3" >
            <label for="input-3">Your Name:</label>
            <input type="text" class="form-control" id="input-3" v-model="form.name" required placeholder="Enter name">
          </div>
          <div class="form-group" id="input-group-1" >
            <label for="input-1">Your Email Address:</label>
            <input type="text" class="form-control" id="input-1" v-model="form.email" required placeholder="Enter email address">
          </div>
          <div class="form-group" id="input-group-1" >
            <label for="input-2">Your Password:</label>
            <input type="password" class="form-control" id="input-2" v-model="form.password" required placeholder="Enter password">
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <button type="submit" class="btn btn-primary btn-lg btn-block">Register</button>
            </div>
            <div class="col-md-6">
              <button type="reset" class="btn btn-danger btn-lg btn-block">Reset</button>
            </div>
          </div>
          <div>
            <p>Have account already? click <router-link to="/login">here</router-link> to login!</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('register', this.form)
    },
    onReset () {
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>

</style>
