<template>
<div id="fullscreen_bg" class="fullscreen_bg">
  <div class="container">
    <div id="register-page">
      <div align="center">
          <img src="../assets/shop-logo.png" alt="Ecommerce-Logo" width="150px" height="150px" style="margin-top: 30px">
      </div>
      <form class="form-signin" @submit.prevent="register">
        <h1 class="form-signin-heading">Sign Up</h1>
        <input v-model="email" type="email" class="form-control" placeholder="Email address" required="" autofocus="">
        <input v-model="password" type="password" class="form-control" placeholder="Password" required="">
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Sign Up
        </button>
      </form>
      <div>
        <h5 style="text-align: center; color: #4e2f12; margin-top: 20px;">Have Account? <a style="cursor: pointer; color: blue"
            @click="toLogin">Sign In</a></h5>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'FormRegister',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.commit('SET_LOADING', true)
      this.$store.dispatch('register', payload)
        .then(response => {
          localStorage.setItem('token', response.data.token)
          this.$store.commit('SET_CART_ID', response.data.CartId)
          this.$store.commit('SET_LOGIN', true)
          this.$router.push('/')
        })
        .catch(err => {
          this.$toasted.error(err.response.data.message, {
            position: 'bottom-center'
          })
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', true)
        })
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.fullscreen_bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: 50% 50%;
  background-image: url('../assets/background.jpg');
  background-repeat: repeat;
}
.btn {
  outline: 0;
  border: none;
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: none;
  box-shadow: inset 2px -3px rgba(0, 0, 0, 0.15);
}

.btn:focus {
  outline: 0;
  -webkit-outline: 0;
  -moz-outline: 0;
}
.form-signin {
  max-width: 320px;
  padding-bottom: 15px;
  margin: 0 auto;
  margin-top: 10px;
}

.form-signin .form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: none;
  border-left-style: solid;
  border-color: #000;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top-style: none;
  border-right-style: solid;
  border-bottom-style: none;
  border-left-style: solid;
  border-color: #000;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.form-signin input[type="password"] {
  margin-bottom: 15px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top-style: none;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
  border-color: rgb(0, 0, 0);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.form-signin-heading {
  color: #f6bd60;
  text-align: center;
  padding-bottom: 20px;
}
</style>
