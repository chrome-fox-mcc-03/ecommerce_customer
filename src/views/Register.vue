<template>
  <div id="register" class="container">
    <div class="row">
      <div class="col s8 offset-s2">
        <h3>Register</h3>
        <RegisterForm />
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm'
export default {
  name: 'Register',
  components: {
    RegisterForm
  }
}
</script>

<style>
  #register {
    padding: 5vh 0;
  }
</style>
