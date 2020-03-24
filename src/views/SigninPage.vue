<template>
  <div class="big-space">
    <div class="overlaytron" style="background-color: rgba(0, 128, 128, 0.5)">
      <div class="for-form">
        <form @submit.prevent="signin">
          <h2 class="label-form">Sign in</h2>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="email" class="form-control rounded-0" id="email">
          </div>
          <div class="form-group">
            <label for="passowrd">Password</label>
            <input type="password" v-model="password" class="form-control rounded-0" id="passowrd">
          </div>
          <div class="btn-space-form">
            <button type="submit" class="my-btn my-btn-teal mt-2 special" style="margin-left: 0; font-size: 1rem;">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SigninPage',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signin () {
      this.$store.dispatch('signin', { email: this.email, password: this.password })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          this.$router.push('/catalog')
          console.log(data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style lang="scss">
.btn-space-form {
  width: 100%;
  display: flex;
  justify-content: center;
}
.special:hover {
  background-color: $primary;
  color: rgb(255, 255, 255);
  transform: scale(1.1);
}
.label-form {
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
