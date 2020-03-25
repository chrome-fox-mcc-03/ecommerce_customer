<template>
    <div>
      <nav class="navbar navbar-light bg-costum nav" style="background-color: #ce848f14;">
          <router-link class="text-dark mb-0 h4 title-app m-3" :to="`/`" style="font-weight: 500px; font-size:59px;text-decoration: none;">Jolie</router-link>
          <router-link class="nav-link text-dark" :to="`/cart`" style="font-weight: 500px; font-size:30px;padding-left: 20px;padding-top: 34px;text-decoration: none;">Your Cart</router-link>
          <button @click="logout" class="nav-link text-dark bg-transparent " style="font-weight: 500px; font-size:30px;padding-left: 20px; padding-top: 34px;border: none;">Logout</button>
      </nav>
    </div>
</template>

<script>
// import '../store/index'

export default {
  name: 'NavbarPanel',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.nav{
    /* padding: 20px; */
    background-color: rgba(206,132,143,.44);
    position: relative;
    font-family: 'Lora', serif;
}
</style>
