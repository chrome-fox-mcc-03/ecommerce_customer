<template>
  <div id="app">
    <div class="Navbar">
    <Navbar />
    </div>
    <loading v-if="isLoading" />
    <router-view/>
  </div>
</template>

<style>
#app{
  background-color: #f1f3f4;
  height: 100vh;
}
.navbar-layout{
  display: flex;
  justify-content: space-between;
}
.layout-products{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.Home{
  justify-content: center;
}
</style>
<style lang='sass'>
  @import styles/bulma
</style>
<script>
import Navbar from '@/components/Navbar.vue'
import Loading from '@/components/Loading.vue'
export default {
  components: {
    Navbar, Loading
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN', true)
    }
  }
}
</script>
