<template>
  <div id="app">
    <router-view/>
    <notifications/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['errorObj', 'successObj', 'isLogin', 'isLoading'])
  },
  watch: {
    successObj () {
      const { message } = this.successObj
      this.$notify({
        type: 'success',
        text: message
      })
    },
    errorObj () {
      const { message, errors } = this.errorObj
      errors.forEach(err => {
        this.$notify({
          title: message,
          type: 'error',
          text: err
        })
      })
    }
  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
