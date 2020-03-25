<template>
  <div id="register-page">
    <div id="register">
      <h1>REGISTER</h1>
      <form id="form-register" @submit.prevent="register">
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email-register"
            aria-describedby="emailHelp"
            placeholder="Input your email here"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password-register"
            placeholder="Password"
            required
          />
        </div>
        <p>
          Already have an account?
          <router-link id="register-btn" to="/login">login</router-link>
        </p>
        <div id="button">
          <input type="submit" class="btn btn-primary" value="Submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register: function () {
      const registerData = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', registerData)
        .then((result) => {
          localStorage.setItem('token', result.data.token)
          this.$store.commit('SET_NOTIFICATION', {
            msg: 'loggin success',
            color: 'bg-success'
          })
          this.$router.push({ path: 'product' })
        })
        .catch(err => {
          this.$store.commit('SET_NOTIFICATION', {
            msg: 'loggin failed',
            color: 'bg-success'
          })
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
#register-page{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../assets/lbg.png');
  background-position: center;
  }

#register{
  border: 1px solid gray;
  padding: 50px;
  border-radius: 20px;
  background-color: rgb(34, 34, 34);
  text-align: center;
  box-shadow: 0 0 20px black;
  color: rgb(255, 251, 251);
  opacity: .8;
}

#register p{
  margin-top: 10px;
}

#button {
  text-align: center;
}
</style>
