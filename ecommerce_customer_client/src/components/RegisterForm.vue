<template>
  <b-modal id="registerModal" hide-footer="hide-footer" hide-header="hide-header" :title="title">
      <form @submit.prevent="registerProcess" class="form-group d-flex flex-column justify-content-center align-items-start">
        <!-- <div class="container d-flex flex-column justify-content-center align-items-baseline"> -->
            <h1 class="modal-header w-100">Register</h1>
            <p>Please fill in this form to create an account.</p>
            <div class="align-self-start d-flex flex-row align-items-baseline mb-2">
              <div>
                <label for="email"><b>Email :</b></label>
              </div>
              <div style="margin-left: 50px">
                <input v-model="email" type="text" placeholder="Enter email" name="email" required><br>
              </div>
            </div>
            <div class="align-self-start d-flex flex-row align-items-baseline mt-2">
              <div>
                <label for="password"><b>Password :</b></label>
              </div>
              <div style="margin-left: 20px">
                <input v-model="password" type="password" placeholder="Enter Password" name="password" required><br>
              </div>
            </div>
              <div style="margin-left: 100px">
                <small>at least 5 character</small>
              </div>
              <hr>
            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
            <div class="align-self-end modal-footer w-100">
              <input type="button" class="btn btn-secondary" value="cancel" @click.prevent="$bvModal.hide('registerModal')">
              <button type="submit" class="registerbtn btn btn-primary">Register</button>
            </div>
        <!-- </div> -->
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RegisterForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  props: {
    title: String
  },
  methods: {
    ...mapActions(['onRegisterUser']),
    registerProcess () {
      const { email, password } = this
      this.onRegisterUser({ email, password })
      this.$bvModal.hide('registerModal')
      // console.log('Register', this.email, this.password)
    }
  }
}
</script>

<style>

</style>
