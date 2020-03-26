<template>
  <div class="home">
    /home
    {{ $store.state.vuex }}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  methods: {
  },
  created () {
    this.$router.push({ path: '/profile' })
  }
}
</script>
