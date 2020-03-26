<template>
  <div class="container shadow login-form">
    <div class="block-heading">
      <h2 class="text-info pt-4">Log In</h2>
      <p class="mt-4">Enter your email and password</p>
    </div>
    <form @submit.prevent="login" class="mt-2 pb-2 pr-4 pl-4">
      <div class="form-group text-left">
        <label for="email">Email</label>
        <input class="form-control item" v-model="userData.email" type="email" id="email" />
      </div>
      <div class="form-group text-left">
        <label for="password">Password</label>
        <input class="form-control" type="password" v-model="userData.password" id="password" />
      </div>
      <button class="btn btn-primary btn-block mt-4" type="submit">Log In</button>
      <router-link class="mt-4 nav-link" to="/user/register"><p> Or register now </p></router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      userData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', this.userData)
        .then((result) => {
          localStorage.setItem('access_token', result.data.access_token);
          this.$router.push('/');
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style>
  .login-form {
    background-color: white;
    border-top: 2px solid #2bb0ed
  }
</style>
