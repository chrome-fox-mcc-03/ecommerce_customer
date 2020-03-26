<template>
  <div class="container d-flex justify-content-center">
      <loading :active.sync="$store.state.isLoading"
      :is-full-page="true"></loading>
    <div id="loginbox" style="margin-top:50px;" class="mainbox col-md-4 col-md-offset-3 col-sm-8 col-sm-offset-2">
      <div class="panel panel-info" >
      <div class="panel-heading">
        <div class="panel-title">Register</div>
      </div>
      <div style="padding-top:30px" class="panel-body">
        <div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>
          <form id="loginform" class="form-horizontal" role="form">
            <div style="margin-bottom: 25px" class="input-group">
              <input
              v-model="user.email"
              id="login-email" type="email" class="form-control" name="email" value="" placeholder="email">
            </div>
            <div style="margin-bottom: 25px" class="input-group">
              <input
              v-model="user.name"
              id="login-name" type="text" class="form-control" name="name" value="" placeholder="name">
            </div>
            <div style="margin-bottom: 25px" class="input-group">
              <input
              v-model="user.password"
              id="login-password" type="password" class="form-control" name="password" placeholder="password">
            </div>
            <div style="margin-top:10px;" class="form-group">
                <!-- Button -->
                <div class="col-sm-12 controls">
                    <button id="btn-register" @click.prevent="register" class="btn btn-secondary">Register</button>
                </div>
            </div>
            <div class="form-group">
              <div class="col-md-12 control">
                <div style="border-top: 1px solid#888; padding-top:15px; font-size:85%" >
                    have an account?
                    <a href="#"
                    @click="changeForm">
                        Login Here
                    </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  components: {
    Loading
  },
  methods: {
    changeForm () {
      this.$store.commit('CHANGE_FORM')
    },
    register () {
      this.$store.dispatch('register', this.user)
    }
  }
}
</script>

<style scoped>
.panel-title {
  font-weight: bolder;
}
</style>
