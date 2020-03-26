<template>
  <div>
    <Error></Error>
    <Auth :action="'Register'"></Auth>
  </div>
</template>

<script>
import Auth from '../components/Auth'
import Error from '../components/Error'

export default {
  name: 'Register',
  components: {
    Auth,
    Error
  }
}
</script>

<style>
</style>
