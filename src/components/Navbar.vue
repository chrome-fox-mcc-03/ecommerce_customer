<template>
  <div>
    <div class="navbar-fixed">
      <nav class="brown lighten-4">
        <div class="nav-wrapper">
         <a href="#" class="brand-logo" @click.prevent="goHome">Vood App</a>
          <ul class="right">
            <li v-if="isLogin"><a href="#" @click.prevent=""><i class="material-icons">shopping_cart</i></a></li>
            <li v-else><a href="#" @click.prevent="goToLogin">Login</a></li>
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
  data () {
    return {

    }
  },
  methods: {
    goHome () {
      if (!this.isLogin) this.$router.push('/')
      else this.$router.push('/items')
    },
    goToLogin () {
      this.$router.push('/login')
    },
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
