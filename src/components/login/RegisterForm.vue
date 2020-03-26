<template>
  <div class="container shadow login-form">
    <div class="block-heading">
      <h2 class="text-info pt-4">Register</h2>
      <p class="mt-4">Enter your email and password</p>
    </div>
    <form @submit.prevent="register" class="mt-2 pb-2 pr-4 pl-4">
      <div class="form-group text-left">
        <label for="email">Email</label>
        <input class="form-control item" v-model="userData.email" type="email" id="email" />
      </div>
      <div class="form-group text-left">
        <label for="password">Password</label>
        <input class="form-control" v-model="userData.password" type="password" id="password" />
      </div>
      <div class="form-group text-left">
        <label for="password">Confirm Password</label>
        <input class="form-control" type="password" id="password" />
      </div>
        <button class="btn btn-primary btn-block mt-4" type="submit">Register</button>
      <router-link class="mt-4 nav-link" to="/user/login">
        <p> Already have an account? </p>
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      userData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    register() {
      this.$store.dispatch('register', this.userData)
        .then(() => {
          this.$router.push('/user/login');
        })
        .catch((err) => {
          console.log(err.response.data);
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
