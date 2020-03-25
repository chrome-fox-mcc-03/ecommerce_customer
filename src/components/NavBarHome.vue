<template>
  <div class="NavBar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggle"
        aria-controls="navbarToggle"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link to="/" class="navbar-brand"><img src="../assets/icon.png"></router-link>

      <div class="collapse navbar-collapse" id="navbarToggle">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 justify-content-center">
          <li class="nav-item active">
            <router-link class="nav-link" to="/product">All Product</router-link>
          </li>
        </ul>
        <div class="icon">
          <router-link id="login" class="nav-link" to="/login">
            <i class="login fas fa-sign-in-alt fa-2x"></i>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbarhome'
}
</script>
<style scoped>
.icon{
  display: flex;
}

#navbarToggle ul li{
  font-size: 20px;
}

.icon i{
  color: rgb(44, 42, 42);
}

.icon i:hover{
  transform: scale(1.5)
}
</style>
