<template>
  <div id="navbar">
    <div id="navbar-left">
      E-COMMERCE-CLIENT
    </div>
    <div id="navbar-mid">
      <input type="text" id="searchbar">
      <img id="search-icon" src="https://img.icons8.com/ios-glyphs/50/000000/search.png"/>
    </div>
    <div id="navbar-right">
      <div v-if="!isLogin" id="not-logged-in">
        <a id="login" @click.prevent="loginForm">LOGIN</a>
        <a id="signup" @click.prevent="signupForm">SIGN UP</a>
      </div>
      <div id="logged-in"  v-if="isLogin">
          <img id="cart" @click.prevent="home" class="home-button" src="https://img.icons8.com/material-rounded/24/000000/home-page.png"/>
        <div id="cart-container">
          <img @click.prevent="cartPage" id="cart" src="https://img.icons8.com/material-rounded/64/000000/shopping-cart.png"/>
          <p id="cart-number">{{ carts.length }}</p>
        </div>
        <a id="logout" @click.prevent="logout">LOGOUT</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout: function () {
      localStorage.clear()
      this.$store.commit('SET_LOGIN', false)
      this.$router.push('/dashboard')
      this.$toasted.success('you have successfully logged out')
    },
    home: function () {
      this.$router.push('/dashboard')
    },
    signupForm: function () {
      this.$router.push('/signup')
    },
    loginForm: function () {
      this.$router.push('/login')
    },
    cartPage: function () {
      this.$router.push('/cart')
    }
  },
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    },
    carts: function () {
      return this.$store.state.carts
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('SET_LOGIN', true)
    }
    this.$store.dispatch('getCart')
  }
}
</script>

<style>

#navbar {
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  height: 7vh;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.8vh;
  z-index: 1;
}

#navbar-left {
  background-color: white;
  padding-left: 5vh;
  font-size: 2vh;
}

#product-nav {
  color: black;
  margin-left: 5vw;
  transition: 0.3s;
}

#product-nav:hover {
  color: #4000ff;
  text-decoration: none;
}

/* NAVBAR RIGHTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT */
.home-button {
  margin-right: 2vw;
}

#signup {
  cursor: pointer;
  background-color: #4000ff;
  padding: 0.5vh 1.5vh 0.5vh 1.5vh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s ease-in-out;
  height: 4vh;
  border-radius: 2vh;
}

#signup:hover {
  background-color: black;
}

#login {
  margin-right: 2vw;
  margin-top: 0.3vh;
  transition: 0.5s ease-in-out;
  cursor: pointer;
}

#login:hover {
  color: #4000ff;
}

#navbar-right {
  margin-right: 5vw;
}

#logout {
  cursor: pointer;
  background-color: #4000ff;
  padding: 0.5vh 1.5vh 0.5vh 1.5vh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s ease-in-out;
  height: 4vh;
  border-radius: 2vh;
}

#logout:hover {
  background-color: black;
}

#cart-container {
  margin-right: 2vw;
  height: 4vh;
  display: flex;
  align-items: center;
  border-radius: 3vh;
  width: 5vw;
  background-color: #eeeeee;
}

#cart {
  background-color: #e2e1e1;
  border-radius: 100%;
  padding: 1vh;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  height: 4vh;
}

#cart-number {
  margin-left: 1vw;
  margin-top: 1.8vh;
}

#cart:hover {
  background-color: white;
  color: blue;
}

#logged-in, #not-logged-in {
  display: flex;
  background-color: white;
  align-items: center;
}

/* NAVBAR MIDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDLLE */
#navbar-mid {
  width: 30vw;
  display: flex;
  padding: 0.5vh 1.5vh 0.5vh 1.5vh;
  border-radius: 2vh;
}

#searchbar {
  height: 3vh;
  width: 100%;
  background-color: #eeeeee;
  border: transparent;
}

#search-icon {
  height: 3vh;
  cursor: pointer;
}
</style>
