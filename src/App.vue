<template>
  <div id="app">
    <loading-overlay v-if="isLoading"></loading-overlay>
    <top-navbar></top-navbar>
    <router-view></router-view>
    <notifications />
  </div>
</template>

<script>
import LoadingOverlay from './components/LoadingOverlay'
import TopNavbar from './components/TopNavbar'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    LoadingOverlay,
    TopNavbar
  },
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
