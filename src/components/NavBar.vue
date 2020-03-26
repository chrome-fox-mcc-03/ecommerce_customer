<template>
  <div class="navbar navbar-expand bg-dark navbar-dark">
    <div class="container-fluid d-flex justify-content-between">
      <router-link to="/products" class="navbar-brand">TCG E-commerce</router-link>
      <div id="user-greeting">
        <h4>Welcome back {{ username }} !</h4>
      </div>
      <button type="button" class="btn btn-danger" @click="logOut">
        Log Out
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export default {
  name: "NavBar",
  methods: {
    logOut() {
      localStorage.clear();
      this.$store.commit("SET_LOGIN", false);
      this.$router.push({ path: "/login" });
      Toast.fire({
        icon: "success",
        title: "Logged out successfully"
      });
    }
  },
  computed: {
    username() {
      return this.$store.state.user.username;
    }
  }
};
</script>

<style scoped>
#user-greeting {
  color: white;
}
</style>
