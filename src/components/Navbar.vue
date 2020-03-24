<template>
  <div class="nav">
    <p @click="redirToCatalogPage" class="my-nav-btn">catalog</p>
    <p> | </p>
    <p @click="signout" class="my-nav-btn">sign out</p>
    <p> | </p>
    <div @click="redirToCartPage">
      <i class="fas fa-shopping-cart"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    signout () {
      localStorage.clear()
      this.$router.push('/')
    },
    redirToCartPage () {
      this.$router.push('/cart')
    },
    redirToCatalogPage () {
      this.$router.push('/catalog')
    }
  }
}
</script>

<style lang="scss">
.nav {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 1.2rem;
  background-color: rgba(255, 255, 255, 0.25);
  color: rgb(0, 0, 0);
  position: fixed;
  z-index: 2;
  p {
    margin: 0 15px 0 0;
  }
}
.my-nav-btn {
  margin: 0 15px 0 0;
  cursor: pointer;
  transition: .3s;
  &:hover {
    color: $primary;
    transform: scale(1.1);
  }
}
.fa-shopping-cart {
  margin-right: 15px;
  transition: .3s;
  cursor: pointer;
  &:hover {
    color: $primary;
    transform: scale(1.2);
  }
}
</style>
