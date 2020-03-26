<template>
  <div class="register">
    <div v-if="isLoading" class="main-loading">
      <loading/>
    </div>
    <form>
      <fieldset class="uk-fieldset">

        <legend class="uk-legend">Welcome to Too-Ku</legend>

        <div class="uk-margin">
          <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: user"></span>
              <input v-model="registerEmail" class="uk-input" type="text" placeholder="Email">
          </div>
        </div>
        <div class="uk-margin">
          <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: lock"></span>
              <input v-model="registerPassword" class="uk-input" type="password" placeholder="Password">
          </div>
        </div>
        <div class="uk-margin">
          <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: users"></span>
              <input v-model="registerFullname" class="uk-input" type="text" placeholder="Full name">
          </div>
        </div>
        <div class="uk-margin">
          <button @click.prevent="register" class="uk-button uk-button-primary">Register</button>
        </div>
        <div class="uk-margin">
          <br>
          <p>Have account? You can login here</p>
          <router-link :to="'/login'" class="uk-button uk-button-danger">Login</router-link>
        </div>

      </fieldset>
    </form>
  </div>
</template>

<script>
import UIkit from 'uikit'
import Loading from './Loading.vue'
export default {
  data () {
    return {
      registerEmail: '',
      registerPassword: '',
      registerFullname: '',
      isLoading: false
    }
  },
  components: {
    Loading
  },
  methods: {
    register () {
      this.isLoading = true
      const payload = {
        email: this.registerEmail,
        password: this.registerPassword,
        fullname: this.registerFullname
      }

      this.$store.dispatch('register', payload)
        .then(response => {
          const { token, fullname } = response.data
          this.$store.commit('SET_ISLOGIN', true)
          localStorage.setItem('token', token)
          this.$router.push('/dashboard')
          UIkit.notification({
            message: `Welcome ${fullname}`,
            status: 'primary',
            pos: 'top-right',
            timeout: 2500
          })
          this.clearData()
        })
        .catch(err => {
          const message = err.response.data.message[0]
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
    },
    clearData () {
      this.registerEmail = null
      this.registerPassword = null
      this.registerFullname = null
    }
  }

}
</script>

<style scoped>
.register{
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
