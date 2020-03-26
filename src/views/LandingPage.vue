<template>
  <div class="landingPage">
    <br>
    <br>
    <div class="d-flex justify-content-center">
      <img class="img-fluid" src="../assets/logocms.png" alt="">
    </div>
    <br>
    <h3 v-if="$store.state.error" class="d-flex justify-content-center">Email or Password is Wrong</h3>
    <div class="loginRegister">
      <Login
      v-if="$store.state.formLogin"
      />
      <Register
      v-else
      />
    </div>
  </div>
</template>

<script>
import Login from '../components/Login'
import Register from '../components/Register'

export default {
  name: 'Home',
  components: {
    Login,
    Register
  }
}
</script>

<style scoped>
.landingPage {
  background-image: url('../assets/BackgroundHome.png');
  /* background-position: center; */
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
</style>
