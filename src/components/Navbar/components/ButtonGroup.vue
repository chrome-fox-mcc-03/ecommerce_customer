<template>
  <div data-v-15938c3a="" class="right menu">
    <router-link
      to="/history"
      style="margin: 2vh 1vw;"
      v-if="page === 'Home' && history"
    >
      <sui-popup
        content="Transaction history"
        position="bottom right"
      >
        <sui-icon
          slot="trigger"
          name="history"
          color="violet"
          size="large"
          circular
        />
      </sui-popup>
    </router-link>
    <router-link
      to="/register"
      style="margin: 2vh 1vw;"
      v-if="page === 'Login'"
    >
      <sui-popup
        content="Register"
        position="bottom right"
      >
        <sui-icon
          slot="trigger"
          name="external alternate"
          color="yellow"
          size="large"
          circular
        />
      </sui-popup>
    </router-link>
    <router-link
      to="/login"
      style="margin: 2vh 1vw;"
      v-if="page === 'Register'"
    >
      <sui-popup
        content="Login"
        position="bottom right"
      >
        <sui-icon
          slot="trigger"
          name="sign-in"
          color="blue"
          size="large"
          circular
        />
      </sui-popup>
    </router-link>
    <router-link
      to="/cart"
      style="margin: 2vh 1vw;"
      v-if="page === 'Home' && carts"
    >
      <sui-popup
        content="Cart"
        position="bottom right"
      >
        <sui-icon
          slot="trigger"
          name="shopping cart"
          color="green"
          size="large"
          circular
        />
      </sui-popup>
    </router-link>
    <router-link
      to="/"
      style="margin: 2vh 1vw;"
      v-if="page === 'Cart' || page === 'History'"
    >
      <sui-popup
        content="Back"
        position="bottom right"
      >
        <sui-icon
          slot="trigger"
          name="reply"
          color="orange"
          size="large"
          circular
        />
      </sui-popup>
    </router-link>
    <router-link
      to="/login"
      style="margin: 2vh 1vw;"
      v-if="page === 'Home'"
    >
      <sui-popup
        content="Logout"
        position="bottom right"
      >
        <sui-icon
          slot="trigger"
          name="sign-out"
          color="red"
          size="large"
          circular
        />
      </sui-popup>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ButtonGroupNavbar',
  computed: {
    page () {
      return this.$route.name
    },
    carts () {
      return this.$store.state.carts.length
    },
    history () {
      return this.$store.state.history.length
    }
  }
}
</script>
