<template>
    <b-navbar class="is-white-bis" spaced-left=true shadow mobile-burger fixed-top>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <div style="margin-right: 10px;">
                <img
                    src="../assets/newlogo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
                </div>
                <span>
                <h3><b>Fruit Ecommerce</b></h3>
                </span>
            </b-navbar-item>
        </template>
        <template v-if="!isLogin" slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <router-link to="/register" class="button is-primary">
                        Register
                    </router-link>
                    <router-link to="/login" class="button is-primary">
                        Log in
                    </router-link>
                </div>
            </b-navbar-item>
        </template>
        <template v-if="isLogin" slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <router-link to="/cart" class="button is-primary">
                        <b-icon pack="fas" icon="shopping-cart"></b-icon>
                        <span>Your Cart</span>
                    </router-link>
                </div>
            </b-navbar-item>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <button @click.prevent="logout" class="button is-dark">
                        <b-icon pack="fas" icon="power-off"></b-icon>
                            <span>Logout</span>
                    </button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      const name = localStorage.getItem('name')
      localStorage.clear()
      this.$store.commit('SET_LOGIN', false)
      this.$router.push('/')
      this.$buefy.toast.open({
        message: `See You Later, ${name}`,
        type: 'is-dark',
        duration: 3000
      })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>
