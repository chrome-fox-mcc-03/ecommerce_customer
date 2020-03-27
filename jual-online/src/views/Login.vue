<template>
    <div id="login-page">
        <div class="login-screen">
            <!-- <h1 class="logo">JualOnline</h1><br><br> -->
            <img class="screen" src="../assets/undraw_winter_designer_a2m7.png">
        </div>
        <div class="regist-form"><br>
        <h2 class="logo">JualOnline</h2><br><br>
        <form id="login/register">
            <br>
            <input class="single-line" type="text" id="email" v-model="email" placeholder="E-mail"><br><br>
            <input class="single-line" type="password" id="password" v-model="password" placeholder="Password"><br><br><br>
            <div class="log-button" v-on:click.prevent="register()">Register</div><br>
            <div class="log-button" v-on:click.prevent="login()">Login</div>
        </form><br><br>
        </div>
        <!-- <div>something</div> -->
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
    register: function () {
      this.$store.dispatch('register', { email: this.email, password: this.password })
    },
    login: function () {
      this.$store.dispatch('login', { email: this.email, password: this.password })
      // .then(() => {
      //   this.$router.push({ path: '/' })
      // })
    }
  }
}
</script>

<style>
    #login-page {
        display: flex;
        flex-direction: row;
        align-items: space-evenly;
        justify-content: space-evenly;
        padding: 25px;
    }
    .regist-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .logo {
        color: #00bfa6;
        padding: 5px 10px;
    }
    .screen {
        width: 40vw;
    }
    .single-line {
        width: 250px;
        /* height: 75px; */
        border: none;
        padding: 5px 10px;
        font-family: arial;
        resize: none;
        outline: none;
        border-bottom: 2px solid #00bfa6;
    }
    .log-button {
        width: 250px;
        background-color: #00bfa6;
        border: none;
        color: #fff;
        font-weight: bold;
        padding: 10px 15px;
        border-radius: 25px;
        font-size: 16px;
    }
    .log-button:hover {
        cursor: pointer;
        background-color: #637c79;
    }
</style>
