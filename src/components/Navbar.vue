<template>
  <div>
    <div class="navbar-fixed">
      <nav class="brown lighten-4">
        <div class="nav-wrapper">
         <router-link to="/" class="brand-logo">Vood App</router-link>
          <ul class="right">
            <li v-if="isLogin"><router-link to="/carts"><i class="material-icons">shopping_cart</i></router-link></li>
            <li v-else><router-link to="/login" @click.prevent="goToLogin">Login</router-link></li>
            <li v-show="isLogin">
              <a
                class="dropdown-trigger"
                href="#!"
                data-target="logout-dropdown"
                @click.prevent=""
              >
                {{ username }}
                <i class="material-icons right">arrow_drop_down</i>
              </a>
            </li>
            <li><a href="#" disable></a></li>
          </ul>
        </div>
      </nav>
    </div>

    <div id="logout-content">
      <ul id="logout-dropdown" class="dropdown-content">
        <li class="divider"></li>
        <li><a href="#!" @click.prevent="logout">Logout</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css'
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.$store.commit('IS_LOGIN')
      this.$router.push('/')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    username () {
      if (!this.isLogin) return null
      else return localStorage.getItem('username')
    }
  },
  created () {
    this.$store.commit('IS_LOGIN')
  },
  mounted () {
    M.AutoInit()
    const elems = document.querySelectorAll('.dropdown-trigger')
    M.Dropdown.init(elems, {
      coverTrigger: false
    })
  }
}
</script>

<style scoped>
  nav .brand-logo {
    display: flex;
    padding-left: 3vw;
  }
  nav li a {
    font-size: 14pt;
  }
</style>
