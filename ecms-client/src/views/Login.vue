<template>
<div>
  <vue-progress-bar></vue-progress-bar>
  <div id="loginForm">
  <h1>Login</h1>
  <b-form @submit.prevent="onSubmit" @reset="onReset" >
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.Email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.Password"
          type="password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <b-button class="button" type="submit" variant="primary">Submit</b-button>
      <b-button class="button" type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      File: '',
      form: {
        Email: '',
        Password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      const payload = {
        Email: this.form.Email,
        Password: this.form.Password
      }
      this.$Progress.start()
      this.$store.dispatch('Login', payload)
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.Email = ''
      this.form.Password = ''
    }
  }
}
</script>

<style>
h1 {
    text-align: center;
    color: cadetblue;
}
.button {
    margin-left: 2%;
    margin-right: 2%;
}
#loginForm{
  margin-left: 30%;
  margin-right: 30%
}
</style>
