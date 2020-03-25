<template>
  <div class="landing" uk-grid>
    <div class="landing-background uk-width-1-2">
      <img src="../assets/landing.svg" alt="">
    </div>
    <div class="landing-display uk-width-1-2">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_ISLOGIN', true)
    }
  }
}
</script>

<style scoped>
.landing{
  margin:0%;
  padding: 0%;
}
.landing-display{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 50%;
}
</style>
