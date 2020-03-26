<template>
  <div class="container">
      <div class="layout-card">
          <div class="card is-rounded" shadow>
              <div class="layout-form">
                  <div class="header-form">
                      <img src="../assets/newlogo.png" alt="">
                      <h2><b>Login Fruits Ecommerce</b></h2>
                  </div>
                  <form @submit.prevent="login">
                    <b-field>
                        <b-input placeholder="Email"
                        v-model="email"
                        type="email"
                         icon="envelope">
                        </b-input>
                    </b-field>
                    <b-field>
                        <b-input placeholder="Password"
                        v-model="password"
                        type="password"
                         icon="key"
                         password-reveal>
                        </b-input>
                    </b-field>
                    <b-field>
                        <b-button native-type="submit">
                            Login
                        </b-button>
                    </b-field>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(response => {
          const { data } = response
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          this.$store.commit('SET_LOGIN', true)
          this.$router.push('/')
          this.$buefy.toast.open({
            message: `Success login, Halo ${data.name}`,
            type: 'is-success',
            position: 'is-top-left',
            duration: 3000
          })
        })
        .catch(error => {
          const errors = error.response.data.errors
          this.$buefy.toast.open({
            duration: 3000,
            message: errors[0],
            position: 'is-top-left',
            type: 'is-danger'
          })
        })
        .finally(_ => {
          this.$store.commit('SET_LOADING', false)
        })
    }
  }
}
</script>

<style scoped>
.card{
    border-radius: 10px;
}
.layout-card{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}
.layout-form{
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
}
.header-form{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
}

form{
    justify-content: center;
}
</style>
