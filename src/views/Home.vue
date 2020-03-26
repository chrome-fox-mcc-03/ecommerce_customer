<template>
  <div class="home">
    <Jumbotron />
    <Featured />
  </div>
</template>

<script>
// @ is an alias to /src
import Jumbotron from '../components/Jumbotron'
import Featured from '@/components/Featured.vue'
export default {
  name: 'Home',
  components: {
    Jumbotron,
    Featured
  }
}
</script>
