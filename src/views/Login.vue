<template>
  <div id="login" class="container">
    <div class="row">
      <div class="col s8 offset-s2">
        <h3>Login</h3>
        <LoginForm />
        <RegisterLink />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterLink from '../components/RegisterLink'
export default {
  name: 'Registration',
  components: {
    LoginForm,
    RegisterLink
  }
}
</script>

<style scoped>
  #login {
    padding: 8vh 0;
  }
</style>
