<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <p class="is-size-2 has-text-black-bis has-text-weight-semibold is-family-monospace" >8-COM</p>
            </router-link>
        </div>

        <div id="navbarBasicExample" class="navbar-menu is-active">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">
                    Home
                </router-link>
                <router-link to="/products" class="navbar-item">
                    Products
                </router-link>
                <router-link to="/blogs"  class="navbar-item">
                    Blogs
                </router-link>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                         <router-link to='/cart' class="button is-link">
                            <i class="fas fa-shopping-cart"></i>
                            <p class="has-text-link">...</p>
                            View Cart
                        </router-link>
                        <router-link to='/register' class="button is-primary">
                            <strong>Register</strong>
                        </router-link>
                        <router-link to='/login' class="button is-light">
                            Login
                        </router-link>
                        <a class="button is-light">
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
