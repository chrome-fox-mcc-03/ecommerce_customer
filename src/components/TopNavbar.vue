<template>
  <nav class="navbar navbar-dark fixed-top bg-dark p-1 shadow navbar-expand-lg">
    <router-link class="navbar-brand pl-3 " to="/">E-Commerce</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse pl-3" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Our Products</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/carts">Your Carts</router-link>
        </li>
      </ul>
      <a class="btn btn-secondary logout-link form-inline my-2 my-lg-0 border" @click.prevent="logout" v-if="isLogin">Log out</a>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TopNavbar',
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.logout-link {
  cursor: pointer;
  color: white!important;
}

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  /* background-color: rgba(0, 0, 0, .25); */
  /* box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25); */
}

.navbar {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

</style>
