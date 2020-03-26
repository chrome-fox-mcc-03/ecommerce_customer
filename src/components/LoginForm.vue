<template>
  <div id="sign-up-container">
    <form id="signup-form" @submit.prevent="login">
      <p id="signup-text">LOGIN</p>
      <label id="signup-label" for="signup-input">Email:</label>
      <input id="signup-input" type="email" v-model="email" placeholder="Please input your email">
      <label id="signup-label" for="signup-input">Password:</label>
      <input id="signup-input" type="password" v-model="password" placeholder="Please input your password">
      <button id="signup-button">SUBMIT</button>
      <a @click.prevent="back" id="exit-button">X</a>
    </form>
  </div>
</template>

<script>
export default {
  Name: 'LoginForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    back () {
      this.$router.push('/dashboard')
    },
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          console.log(data.token)
          localStorage.setItem('token', data.token)
          this.$store.commit('SET_LOGIN', true)
          this.$router.push('/dashboard')
          this.$toasted.success('welcome back!')
        })
        .catch(error => {
          this.$toasted.error(error.response.data)
          console.log(error)
        })
    }
  }
}
</script>

<style>
#sign-up-container {
    display: flex;
    width: 100vw;
    height: 93vh;
}

#signup-text {
    font-size: 3.5vh;
}

#signup-text, #signup-label {
    background-color: white;
    margin-left: 0.5vw;
    font-weight: bolder;
}

#signup-label {
    margin-top: 1vh;
}

#signup-form {
    position: absolute;
    top: 10vh;
    right: 5vh;
    background-color: white;
    height: 30vh;
    display: flex;
    flex-direction: column;
    padding: 3vh;
    border-radius: 2vh;
}

#signup-input {
    border: transparent;
    background-color: #eeeeee;
    border-radius: 2vh;
    padding: 0.5vh 1.5vh 0.5vh 1.5vh;
    height: 3vh;
}

#signup-button {
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
  font-weight: bolder;
  margin-top: 2vh;
  text-decoration: none;
  border-style: solid;
}

#signup-button:hover {
    background-color: black;
}

#exit-button {
    position: absolute;
    top: 2.5    vh;
    right: 2vh;
    font-size: 2.5vh;
    font-weight: bold;
    text-decoration: none;
    color: white;
    background-color: #ee6f44;
    padding: 0.5vh 1.5vh 0.5vh 1.5vh;
    border-radius: 50%;
    display:flex;
    align-items: center;
    justify-content: center;
    font-family: cursive;
    transition: 0.5s ease-in-out;
    cursor: pointer;
}

#exit-button:hover {
    background-color: black;
}
</style>
