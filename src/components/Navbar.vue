<template>
  <div>
    <b-navbar>
      <b-navbar-brand><router-link to="/"><i class="fas fa-pallet"></i></router-link></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <router-link class="nav-item" to="/register">
            <b-button class="mx-1" variant="info" size="sm">
              Register
            </b-button>
          </router-link>
          <router-link class="nav-item" to="/login">
            <b-button class="mx-1" variant="outline-info" size="sm">
              Login
            </b-button>
          </router-link>
          <router-link class="nav-item" to="/shop">
            <b-button class="mx-1" variant="outline-info" size="sm">
              Shop
            </b-button>
          </router-link>
          <router-link class="nav-item" to="/cart">
            <b-button class="mx-1" variant="outline-info" size="sm">
              Cart <i class="fas fa-shopping-cart"></i>
            </b-button>
          </router-link>
          <b-dropdown text="User" class="mx-1" variant="outline-info" size="sm" right>
            <b-dropdown-item @click="toProfile">Profile</b-dropdown-item>
            <b-dropdown-item @click="toLogout">Logout</b-dropdown-item>
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BNavbarNav,
  BDropdownItem,
  BDropdown,
  BCollapse,
  BButton
} from 'bootstrap-vue'
export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BNavbarNav,
    BDropdownItem,
    BDropdown,
    BCollapse,
    BButton
  },
  methods: {
    toProfile () {
      console.log('profile')
      this.$router.push({ name: 'Profile' })
    },
    toLogout () {
      console.log('logout')
    }
  }
}
</script>
