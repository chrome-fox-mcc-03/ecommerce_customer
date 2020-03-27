<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  },
  data () {
    return {
    }
  }
}
</script>
<style>
#app{
  margin: 0;
  padding: 0;
}
</style>
