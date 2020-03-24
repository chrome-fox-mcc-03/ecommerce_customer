<template>
  <div class="my-jumbotron">
    <div class="overlaytron">
      <div class="welcome-sign">
        <h1>Kick up</h1>
        <p>Find literally any shoes on Shoesify</p>
        <div class="btn-space">
          <button @click="redirToSignIn" class="my-btn my-btn-teal">Sign in</button>
          <button class="my-btn my-btn-maroon">Join Us</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    redirToSignIn () {
      this.$router.push('/signin')
    }
  }
}
</script>

<style>
.my-jumbotron {
  background-image: url("../assets/pexels-photo-basketball.jpeg");
}
</style>
