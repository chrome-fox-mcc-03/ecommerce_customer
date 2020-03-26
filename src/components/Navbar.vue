<template>
  <div class="navbar">
    <b-navbar toggleable="lg" type="light" variant="warning">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/home">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/catalog">View Catalog</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/cart">My Shopping Cart</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/txnlog">My Transaction Log</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item>
              <router-link to="/about">Profile</router-link>
            </b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  },
  components: {},
  methods: {
    logout: function () {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  computed: {}
}
</script>
<style>
  .navbar {
    width:100% !important;
    /* overflow: hidden; */
    margin:0px auto;
    left:0;
    right:0;
    padding:0;
    position: fixed;
    color: orangered;
    z-index: 1000;
  }

  #nav-collapse b-navbar-nav b-nav-item router-link:visited {
    color: wheat;
  }
</style>
