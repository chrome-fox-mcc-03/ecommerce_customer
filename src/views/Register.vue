<template>
  <div class="container">
      <div class="layout-card">
          <div class="card is-rounded" shadow>
              <div class="layout-form">
                  <div class="header-form">
                      <img src="../assets/newlogo.png" alt="">
                      <h2><b>Register Fruits Ecommerce</b></h2>
                  </div>
                  <form @submit.prevent="register">
                    <b-field>
                        <b-input placeholder="Name"
                        v-model="name"
                        type="text"
                         icon="user">
                        </b-input>
                    </b-field>
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
  name: 'Register',
  data () {
    return {
      name: '',
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
      this.$store.dispatch('register', payload)
        .then(response => {
          const { data } = response
          this.$router.push('/login')
          this.$buefy.toast.open({
            message: `Hi, ${data.name}, You can login now!`,
            type: 'is-success',
            duration: 3000
          })
        })
        .catch(error => {
          const errors = error.response.data.errors
          console.log(errors, 'ini error')
          this.$buefy.toast.open({
            duration: 2500,
            message: errors[0],
            position: 'is-top',
            type: 'is-danger'
          })
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
