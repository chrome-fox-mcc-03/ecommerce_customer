<template>
  <div>
    <Error></Error>
    <Auth :action="'Login'"></Auth>
  </div>
</template>

<script>
import Auth from '../components/Auth'
import Error from '../components/Error'

export default {
  name: 'Login',
  components: {
    Auth,
    Error
  }
}
</script>

<style>
</style>
