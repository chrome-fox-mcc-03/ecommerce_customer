<template>
  <div class="home">
    <br>
    <br>
    <br>
    <h1> Welcome To this Humble Abode</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  computed: {
    isLogin () {
      return this.$store.state.IsLogin
    }
  },
  created () {
  }
}
</script>

<style>
h1 {
  color: rgb(5, 65, 45);
}

</style>
