<template>
  <transition name="fade">
    <sui-message
      v-if="message.isMessage"
      :header="message.title"
      :content="message.message"
      dismissable
      @dismiss="handleDismiss"
      id="message"
      style=":color:color"
    />
  </transition>
</template>

<script>
export default {
  name: 'Message',
  methods: {
    handleDismiss () {
      this.$store.commit('SET_ISMESSAGE')
    }
  },
  computed: {
    message () {
      return this.$store.state.message
    }
  }
}
</script>
