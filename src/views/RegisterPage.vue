<template>
  <LandingPageForm :title="'Register'" :moveTo="'Login Here!'" />
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
