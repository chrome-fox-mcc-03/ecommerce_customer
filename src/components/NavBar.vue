<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link to="/" class="navbar-brand"><img src="../assets/icon.png"></router-link>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 justify-content-center">
          <li class="nav-item active">
            <router-link class="nav-link" to="/product">All Product</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/product/add">Upload Product</router-link>
          </li>
        </ul>
        <div class="icon">
          <router-link id="cart" class="nav-link" to="/cart">
            <i class="cart fas fa-shopping-cart fa-2x"></i>
          </router-link>
          <a @click="$store.dispatch('logout')"><i class="fas fa-sign-out-alt fa-2x"></i></a>
        </div>
        
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
<style scoped>
.icon{
  display: flex;
}

.icon i{
  color: rgb(44, 42, 42);
}

.icon i:hover{
  transform: scale(1.5)
}
</style>
