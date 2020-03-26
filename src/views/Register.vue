<template>
  <div class="cart mt-5 pt-3 d-flex align-items-center justify-content-center">
      <div class="d-flex flex-column mr-5 pr-5 mb-5 pb-5">
        <h2 class="display-6 mt-5 mb-5" style="font-size:26px; font-weight:bold">Register</h2>
            <form @submit.prevent="register">
                <div class="form-group">
                    <input type="email" class="form-control pt-4 pb-4" placeholder="Email" v-model="dataRegister.email">
                    <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control pt-4 pb-4" placeholder="Your Name" v-model="dataRegister.name">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control pt-4 pb-4" placeholder="Password" v-model="dataRegister.password">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control pt-4 pb-4" placeholder="Confirm Password" v-model="dataRegister.passwordConfirm">
                </div>
                <div class="d-flex align-items-center" style="margin-top:auto">
                    <button type="submit" class="btn btn-primary pt-3 pb-3 pr-4 pl-4 ">Submit</button>
                    <router-link to="/login">
                    <button class='btn btn-link'>Already have an account?</button>
                    </router-link>
                </div>
            </form>
      </div>
      <img src="https://images.unsplash.com/photo-1555529733-ba28d9c4587c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=613&q=80"
      alt="" srcset="" class="mr-5 pr-5">
      <loading-now v-if="nowLoading"></loading-now>
  </div>
</template>

<script>
import LoadingNow from '../components/LoadingNow'
export default {
  data: () => {
    return {
      dataRegister: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLtnDcrpDZguhJOW3CvnrPo8VGexVYMy-2tSXPrJfXUO_XXsiJ', // sementara
        role: 'Customer'
      }
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', this.dataRegister)
        .then(_ => this.$router.push({ path: '/' }))
    }
  },
  computed: {
    nowLoading () {
      return this.$store.state.nowLoading
    }
  },
  components: {
    LoadingNow
  }
}
</script>

<style>
.cart {
    min-height: 88.4vh;
}

.cart img{
    height: 80vh;
}
</style>
