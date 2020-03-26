<template>
  <div id="register-link" class="card z-depth-3">
    <div class="card-content">
      <span class="card-title">Don't have an account?</span>
      <router-link id="register-btn" class="waves-effect waves-light btn" to="/register">Register here!</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register-Link'
}
</script>

<style scoped>
  #register-btn {
    width: 15vw;
  }
</style>
