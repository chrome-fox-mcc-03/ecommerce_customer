<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-5 bg-white rounded">
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
      <router-link to="/" class="navbar-brand">
        <img src="../assets/icon.png" />
      </router-link>

      <div class="collapse navbar-collapse" id="navbarToggle">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 justify-content-center">
          <li class="nav-item active">
            <router-link class="nav-link" to="/product">All Product</router-link>
          </li>
        </ul>
        <div class="icon">
          <div id="cart">
            <router-link class="nav-link" to="/cart">
              <i class="cart fas fa-shopping-basket fa-lg"></i>My Shopping Cart
            </router-link>
          </div>
          <div id="logout">
            <a @click="$store.dispatch('logout')">
              <i class="fas fa-sign-out-alt fa-lg"></i>Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>
<style scoped>
.navbar {
  position: fixed;
  top: 0; /* Position the navbar at the top of the page */
  width: 100vw;
  z-index: 10000;
}

#navbarToggle ul li {
  font-size: 20px;
}

#navbarToggle ul li:hover {
  transform: scale(1.25);
}

.icon {
  display: flex;
}

.icon i {
  color: rgb(44, 42, 42);
  margin-right: 5px;
}

#cart {
  margin-right: 25px;
}

#cart:hover {
  transform: scale(1.25);
}

#logout {
  margin-right: 20px;
}

#logout:hover {
  transform: scale(1.25);
}

.nav-link{
  padding: 0;
  color:  rgb(44, 42, 42);
}
</style>
