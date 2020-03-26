<template>
  <div class="big-space">
    <Loader v-if="isLoading"/>
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
            <button @click="redirToLandingPage" class="my-btn my-btn-maroon mt-2 special" style="margin-left: 0; font-size: 1rem;">Back</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue'
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
      this.$store.commit('SET_ISLOADING', true)
      this.$store.dispatch('signin', { email: this.email, password: this.password })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          this.$router.push('/catalog')
          this.$toasted.show(`Glad to see you again, ${data.currentUser}`, {
            duration: 4000
          })
        })
        .catch(err => {
          this.$toasted.show(err.response.data, {
            duration: 4000
          })
          console.log(err.response.data)
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    },
    redirToLandingPage () {
      this.$router.push('/')
    }
  },
  components: {
    Loader
  },
  computed: {
    isLoading: function () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="scss">
.btn-space-form {
  width: 100%;
  display: flex;
  justify-content: space-between;
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
