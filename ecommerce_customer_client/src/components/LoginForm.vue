<template>
  <b-modal id="loginModal" hide-header="hide-header" hide-footer="hide-footer" :title="title">
    <form @submit.prevent="loginProcess"
          class="form-group d-flex flex-column justify-content-center align-items-center">
          <img class="mb-4" src="https://i.ibb.co/86Pf6Sj/log.png" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="email" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="email" class="form-control" placeholder="Email address" required autofocus>
      <label for="password" class="sr-only">Password</label>
      <input v-model="password" type="password" id="password" class="form-control" placeholder="Password" required>
      <div class="modal-footer">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </div>
      <p class="mt-5 mb-3 text-muted">&copy; 2019-2020</p>

          <!-- <h1 class="modal-header w-100" >Login</h1>
          <hr>
          <div class="align-self-center">
            <label for="email">Email:</label><br>
            <input v-model="email" type="email" id="email" name="email"><br>
          </div>
          <div class="align-self-center mt-2">
            <label for="password">Password:</label><br>
            <input v-model="password" type="password" id="password" name="password"><br><br>
          </div>
          <hr>
          <div class="align-self-end modal-footer w-100">
            <input type="button" class="btn btn-secondary" value="cancel" @click.prevent="$bvModal.hide('loginModal')">
            <input type="submit" class="btn btn-primary" value="Submit" >
          </div> -->
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
