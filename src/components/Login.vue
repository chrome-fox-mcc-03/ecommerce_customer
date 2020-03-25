<template>
  <div class="login">
    <div v-if="isLoading" class="main-loading">
      <loading/>
    </div>
    <form>
        <legend class="uk-legend">Welcome back to Too-Ku</legend>

        <div class="uk-margin">
          <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: user"></span>
              <input v-model="loginEmail" class="uk-input" type="text" placeholder="Email">
          </div>
        </div>
        <div class="uk-margin">
          <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: lock"></span>
              <input v-model="loginPassword" class="uk-input" type="password" placeholder="Password">
          </div>
        </div>
        <div class="uk-margin">
          <button @click.prevent="login" class="uk-button uk-button-primary">Login</button>
        </div>
        <div class="uk-margin">
          <br>
          <p>Don't have account? You can register here</p>
          <router-link :to="'/register'" class="uk-button uk-button-danger">Register</router-link>
        </div>
    </form>
  </div>
</template>

<script>
import UIkit from 'uikit'
import Loading from './Loading'
export default {
  data () {
    return {
      loginEmail: '',
      loginPassword: '',
      isLoading: false
    }
  },
  methods: {
    login () {
      this.isLoading = true
      const payload = {
        email: this.loginEmail,
        password: this.loginPassword
      }
      this.$store.dispatch('login', payload)
        .then(response => {
          this.$store.commit('SET_ISLOGIN', true)
          this.$router.push('/dashboard')
          const { token, fullname } = response.data
          localStorage.setItem('token', token)
          UIkit.notification({
            message: `Welcome back ${fullname}`,
            status: 'primary',
            pos: 'top-right',
            timeout: 2500
          })
          this.clearData()
        })
        .catch(err => {
          const message = err.response.data.message
          UIkit.notification({
            message: message,
            status: 'danger',
            pos: 'top-center',
            timeout: 2500
          })
        })
        .finally(_ => {
          this.isLoading = false
        })
    }
  },
  components: {
    Loading
  }
}
</script>

<style scoped>
.login{
  display: flex;
  background-color: rgba(254,206,168,0.1);
  flex-direction: column;
}
form{
  border: 2px rgba(42,54,59,0.2) solid;
  border-radius: 15px;
  padding: 3rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
input{
  width: 100%;
}
form .uk-button{
  margin-right: 5px;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
              0 2px 2px rgba(0,0,0,0.12),
              0 4px 4px rgba(0,0,0,0.12);
}

form input{
  border-radius: 5px;
}

form .uk-button:hover{
  transform: scale(1.2);
}

form .uk-button-primary{
  background-color: #e84a5f;
}

form .uk-button-danger{
  background-color: #ff847c;
}

.main-loading{
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 5;
}

</style>
