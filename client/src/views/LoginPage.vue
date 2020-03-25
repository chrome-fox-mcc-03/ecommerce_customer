<template>
  <div class>
    <LandingPageForm :title="'Login'" :moveTo="'Register Here!'" />
  </div>
</template>

<script>
import LandingPageForm from '@/components/LandingPageForm.vue'
export default {
  name: 'Register',
  components: {
    LandingPageForm
  }
}
</script>

<style>
</style>
