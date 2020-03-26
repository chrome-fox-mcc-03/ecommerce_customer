<template>
  <div>
      <b-navbar toggleable="lg" type="dark"
      variant="dark" class="navbar" fixed="top">
        <b-navbar-brand>
             <router-link to="/" style="color:white;">
                <p style="margin:0 !important; font-weight: bold; font-family: 'Roboto Slab', serif;">S H O P P I N G K U Y</p>
             </router-link>
         </b-navbar-brand>
         <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto d-flex align-items-center">
                <b-nav-item>
                    <b-button size="sm" variant="light">
                        <router-link to="/browse" style="color:black;">
                            Browse Now
                        </router-link>
                    </b-button>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/cart" style="color:white;">
                        <img src="../assets/cart.png" alt="" srcset="" style="width:2rem">
                    </router-link>
                </b-nav-item>
                <b-nav-item v-if="!loginStatus">
                    <router-link to="/login" style="color:white;" >
                        <p style="font-family: 'Muli', sans-serif; margin-bottom: 0 !important">Log In</p>
                    </router-link>
                </b-nav-item>
                <b-nav-item v-if="loginStatus" @click.prevent="logout">
                    <p style="font-family: 'Muli', sans-serif; margin-bottom: 0 !important">Log Out</p>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
      </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    loginStatus () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(_ => this.$router.push({ path: '/' }))
    }
  }
}
</script>

<style>
    a {
        cursor: pointer;
        text-decoration: none !important;
    }
    a:hover {
        text-decoration: none !important;
    }
    .navbar {
        padding: 10px 25% !important;
    }
</style>
