<template>
  <nav class="uk-navbar-container uk-margin" uk-navbar>
      <div class="uk-navbar-center">
          <div class="uk-navbar-center-left">
            <div>
              <ul v-if="isLogin" class="uk-navbar-nav">
                  <li><router-link :to="'/dashboard'" class="uk-navbar-item">Home</router-link></li>
                  <li><router-link :to="'/profile'" class="uk-navbar-item">Profile</router-link></li>
                  <li></li>
              </ul>
            </div>
          </div>
          <a class="uk-navbar-item uk-logo"><i>TOO-KU MARKETPLACE</i></a>
          <div class="uk-navbar-center-right">
            <div>
              <ul class="uk-navbar-nav">
                <li v-if="isLogin" @click.prevent="logout"><a>Logout</a></li>
                <li></li>
              </ul>
            </div>
          </div>
      </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    if (localStorage.token) this.$store.commit('SET_ISLOGIN', true)
  }
}
</script>

<style scoped>
.uk-navbar-container.uk-margin{
  background-color: rgba(254, 206, 168, 0.5);
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.uk-logo{
  cursor: default;
  font-size: 100%;
}

</style>
