<template>
  <b-modal id="loginModal" hide-header="true" hide-footer="true" :title="title">
    <form @submit.prevent="loginProcess"
          class="form-group d-flex flex-column justify-content-center align-items-baseline">
          <h1 class="modal-header w-100" >Login</h1>
          <hr>
          <div class="align-self-center">
            <label for="email">Email:</label><br>
            <input v-model="email" type="text" id="email" name="email"><br>
          </div>
          <div class="align-self-center mt-2">
            <label for="password">Password:</label><br>
            <input v-model="password" type="password" id="password" name="password"><br><br>
          </div>
          <hr>
          <div class="align-self-end modal-footer w-100">
            <input type="button" class="btn btn-secondary" value="cancel" @click.prevent="$bvModal.hide('loginModal')">
            <input type="submit" class="btn btn-primary" value="Submit" >
          </div>
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginForm',
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
    ...mapActions(['onLoginUser']),
    loginProcess () {
      const { email, password } = this
      this.onLoginUser({ email, password })
      this.$bvModal.hide('loginModal')
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>

</style>
