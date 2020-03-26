<template>
  <div class="pos-f-t">
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/"><img style="width:100px" class="img-fluid" src="../assets/logocms.png" alt=""></router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto ml-5">
          <li class="nav-item dropdown">
            <a style="font-weight:bolder" class="nav-link dropdown-toggle" href="#" type="button" data-toggle="collapse" data-target="#category" aria-controls="category" aria-expanded="false" aria-label="Toggle navigation">
              Category
            </a>
          </li>
          <li class="ml-5">
            <form class="form-inline">
              <br>
              <br>
                <input v-model="search" name="search" style="width:600px" class="form-control form-control-sm mr-2" type="search" placeholder="Search" aria-label="Search">
                <router-link :to="`/product/search/${search}`" class=" my-2 my-sm-0" type="submit"><img style="width:30px" src="../assets/search.png" alt=""></router-link>
            </form>
          </li>
        </ul>
        <router-link class="mr-5" to="/cart"><img style="width:30px" src="../assets/cart.png" alt=""></router-link>
        <div v-if="$store.state.isLogin">
          <a type="button" class="mr-3" href="#" @click.prevent="logout" ><img style="width:30px" src="../assets/logout.png" alt=""></a>
        </div>
        <div class="d-flex mr-3" v-else>
          <a class="mr-3 btn" type="button" data-toggle="modal" data-target="#login"><img style="width:30px" src="../assets/Login.png" alt=""></a>
          <router-link to="/register" class="mt-2"><img style="width:30px" src="../assets/Register.png" alt=""></router-link>
        </div>
      </div>
    </nav>
    <div class="bg-light">
      <div style="margin-left:190px" class="collapse" id="category">
        <div class="d-flex">
          <div class="mr-5">
            <router-link style="text-decoration: none; color: black" to="/product/adventure">adventure</router-link><br>
            <router-link style="text-decoration: none; color: black" to="/product/action">action</router-link>
          </div>
          <div class="mr-5">
            <router-link style="text-decoration: none; color: black" to="/product/comedy">comedy</router-link><br>
            <router-link style="text-decoration: none; color: black" to="/product/romcom">romcom</router-link>
          </div>
          <div class="mr-5">
            <router-link style="text-decoration: none; color: black" to="/product/horror">horror</router-link><br>
            <router-link style="text-decoration: none; color: black" to="/product/sport">sport</router-link>
          </div>
          <div class="mr-5">
            <router-link style="text-decoration: none; color: black" to="/product/sliceoflife">slice of life</router-link><br>
            <router-link style="text-decoration: none; color: black" to="/product/fantasy">fantasy</router-link>
          </div>
          <div class="mr-5">
            <router-link style="text-decoration: none; color: black" to="/product/isekai">isekai</router-link><br>
            <router-link style="text-decoration: none; color: black" to="/product/mystery">mystery</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <loading :active.sync="$store.state.isLoading"
              :is-full-page="true"></loading>
            <form>
              <div class="form-group">
                <label for="email">Email address</label>
                <input v-model="user.email" type="email" class="form-control" id="email" placeholder="Enter email">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="user.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click.prevent="login" type="submit" class="btn btn-secondary" data-dismiss="modal">Login</button>
            <button type="button" class="btn btn-dark" data-dismiss="modal">Cancel</button>
          </div>
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
      isLogin: false,
      user: {
        email: '',
        password: ''
      },
      search: ''
    }
  },
  components: {
    Loading
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.user)
    },
    logout () {
      this.$store.commit('LOGOUT')
    }
  }
}
</script>

<style>
div.mr-5 a {
  text-decoration: none;
}

</style>
