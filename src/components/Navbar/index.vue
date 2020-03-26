<template>
  <div data-v-15938c3a="" style="background-color: whitesmoke; height: 10vh;" class="ui menu">
    <div data-v-15938c3a="" class="center menu">
      <img style="width: 25vw; margin: 2vh 1vw;" src="../../assets/logo.png" alt="logo">
    </div>
    <BtnGroup />
  </div>
</template>

<script>
import BtnGroup from './components/ButtonGroup.vue'
export default {
  name: 'Navbar',
  components: {
    BtnGroup
  }
}
</script>
