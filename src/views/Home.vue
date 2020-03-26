<template>
  <div class="container" style="padding-top: 5em">
    <div class="jumbotron">
      <h1 class="display-4">Welcome!</h1>
      <p class="lead">Congratulation you have discover our page. Click button below to browse our product.</p>
      <hr class="my-4">
      <p class="lead">
        <router-link to="products" class="btn btn-lg btn-dark">Browse Product</router-link>
      </p>
    </div>
  </div>
  <!-- <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
    <header class="masthead mb-auto">
    <div class="inner">
      <h3 class="masthead-brand">Ecommerce</h3>
      <nav class="nav nav-masthead justify-content-center">
      <a class="nav-link active" href="#">Home</a>
      <a class="nav-link" href="#">Product</a>
      <a class="nav-link" href="#">About Us</a>
      </nav>
    </div>
    </header>

    <main role="main" class="inner cover">
    <h1 class="cover-heading">Welcome</h1>
    <p class="lead">Congratulation you have discover our page. Click button below to browse our product.</p>
    <p class="lead">
      <router-link to="products" class="btn btn-lg btn-secondary">Browse Product</router-link>
    </p>
    </main>

    <footer class="mastfoot mt-auto">
    <div class="inner">
      <p>Made with Ryan</p>
    </div>
    </footer>
  </div> -->
</template>

<script>
export default {
  name: 'Home',
  components: {

  }
}
</script>

<style scoped>
/*
 * Globals
 */

/* Links */
a,
a:focus,
a:hover {
  color: #fff;
}

/* Custom default button */
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333!important;
  text-shadow: none; /* Prevent inheritance from `body` */
  background-color: #fff;
  border: .05rem solid #fff;
}

/*
 * Base structure
 */

html,
body {
  /* height: 100%; */
  background-color: #333;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: #fff!important;
  background-color: #212529!important;
  text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
}

.cover-container {
  max-width: 42em;
}

/*
 * Header
 */
.masthead {
  margin-bottom: 2rem;
}

.masthead-brand {
  margin-bottom: 0;
}

.nav-masthead .nav-link {
  padding: .25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, .5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}

@media (min-width: 48em) {
  .masthead-brand {
    float: left;
  }
  .nav-masthead {
    float: right;
  }
}

/*
 * Cover
 */
.cover {
  padding: 0 1.5rem;
}
.cover .btn-lg {
  padding: .75rem 1.25rem;
  font-weight: 700;
}

/*
 * Footer
 */
.mastfoot {
  color: rgba(255, 255, 255, .5);
}

</style>
