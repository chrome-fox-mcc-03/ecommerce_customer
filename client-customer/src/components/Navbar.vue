<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <img src="../assets/logo2.png" width="150" height="50">
            </router-link>
        </div>

        <div id="navbarBasicExample" class="navbar-menu is-active">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">
                    Home
                </router-link>
                <a class="navbar-item">
                    Products
                </a>
                <a class="navbar-item">
                    Blogs
                </a>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
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
