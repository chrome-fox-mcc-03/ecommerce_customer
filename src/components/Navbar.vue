<template>
<b-navbar toggleable="lg" type="light" class="shadow-sm mb-2 rounded bg-white">
  <div class="container">
    <b-navbar-brand href="#">
      <i class="fab fa-kickstarter-k"></i>elontong Mart
    </b-navbar-brand>


    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form class="mr-2">
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-navbar-nav>
            <b-nav-item>
              <router-link to="/" class="nav-link">
                Home
              </router-link>
            </b-nav-item>
        </b-navbar-nav>

        <b-nav-item-dropdown right class="nav-link">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <i class="fas fa-user-alt"></i>
            User
          </template>
          <b-dropdown-item>
            <router-link to="/checkout" class="nav-link">
            <i class="fas fa-shopping-cart"></i> Cart
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item class="nav-link" @click="logout" v-if="access_token">
            <i class="fas fa-sign-out-alt"></i> Logout
          </b-dropdown-item>
          <b-dropdown-item v-if="!access_token">
            <router-link to="user/login" class="nav-link">
            <i class="fas fa-sign-in-alt"></i> Login
            </router-link>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </div>
</b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      access_token: '',
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.getAccessToken();
      this.$notify({
        group: 'foo',
        title: 'Success',
        text: 'Logged Out',
        type: 'success',
      });
      this.$router.push('/');
    },
    getAccessToken() {
      this.access_token = localStorage.access_token;
    },
  },
  updated() {
    this.access_token = localStorage.access_token;
  },
  created() {
    this.access_token = localStorage.access_token;
  },
};
</script>

<style>

</style>
