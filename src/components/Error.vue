<template>
  <div class="row" role="alert" v-if="error">
    <div class="col-md-12">
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="danger"
        @dismiss-count-down="countDownChanged"
        >{{String(error)}}
      </b-alert>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Error',
  data () {
    return {
      dismissCountDown: 1
    }
  },
  computed: {
    ...mapState(['error'])
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  }
}
</script>

<style>

</style>
