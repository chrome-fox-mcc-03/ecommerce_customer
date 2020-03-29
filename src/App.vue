<template>
  <div id="app">
    <nav>
      <Navbar />
    </nav>
    <div>
      <router-view/>
    </div>
    <Loading />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Loading from '@/components/Loading.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Loading
  }
}
</script>
