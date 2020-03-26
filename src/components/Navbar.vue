<template>
  <div class="nav">
    <p @click="redirToCatalogPage" class="my-nav-btn">catalog</p>
    <p> | </p>
    <p @click="signout" class="my-nav-btn">sign out</p>
    <p> | </p>
    <div id="cart-icon-space" @click="redirToCartPage">
      <i class="fas fa-shopping-cart"></i>
      <div class="current-cart-qty"><small>{{ carts.length }}</small></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    signout () {
      this.$toasted.show('Do you really want to sign out?', {
        action: [
          {
            text: 'Yes',
            onClick: (e, toastObject) => {
              localStorage.clear()
              this.$router.push('/')
              toastObject.goAway(0)
            }
          },
          {
            text: 'No',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        ]
      })
    },
    redirToCartPage () {
      this.$router.push('/cart')
    },
    redirToCatalogPage () {
      this.$router.push('/catalog')
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
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
#cart-icon-space {
  position: relative;
}
.current-cart-qty {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: $secondary;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(0, -10px);
  @include flexCenter();
}
</style>
