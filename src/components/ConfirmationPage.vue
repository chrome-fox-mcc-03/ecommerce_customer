<template>
  <div class="container">
    <div id="login-page">
      <div align="center">
        <img src="../assets/shop-logo.png" alt="Ecommerce-Logo" width="150px" height="150px" style="margin-top: 30px">
      </div>
      <form class="form-signin" @submit.prevent="confirmation">
        <input v-model="inputedNumber" type="number" class="form-control" placeholder="Confirmation Code" value=1 required autofocus="">
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Confirm
        </button>
        <h6 style="color: red">we have sent a confirmation code to your email</h6>
        or
        <h6><a style="cursor: pointer; color: blue" @click.prevent="resend">Resend</a></h6>
      </form>
    </div>
  </div>
</template>

<script>
const Swal = require('sweetalert2')
export default {
  name: 'ConfirmationPage',
  data () {
    return {
      inputedNumber: 0
    }
  },
  computed: {
    randomNumber () {
      return this.$store.state.randomNumber
    }
  },
  methods: {
    confirmation () {
      if (+this.inputedNumber === this.randomNumber) {
        this.$store.commit('SET_LOADING', true)
        this.$store.dispatch('isPaid')
          .then(_ => {
            this.$router.push('/history')
          })
          .catch(err => {
            this.$toasted.error(err.response.data.message, {
              position: 'bottom-center'
            })
          })
          .finally(_ => {
            this.$store.commit('SET_LOADING', false)
          })
      } else {
        this.$toasted.error('Invalid Confirmation Code')
      }
    },
    resend () {
      const randomNumber = Math.floor(100000 + Math.random() * 900000)
      this.$store.commit('SET_RANDOM_NUMBER', randomNumber)
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('checkout', { number: randomNumber })
            .then(_ => {
              Swal.fire(
                'Check Your Email!!'
              )
            })
            .catch(err => {
              console.log(err.response.data)
            })
        }
      })
    }
  }
}

</script>

<style scoped>
.btn {
  outline: 0;
  border: none;
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: none;
  box-shadow: inset 2px -3px rgba(0, 0, 0, 0.15);
}

.btn:focus {
  outline: 0;
  -webkit-outline: 0;
  -moz-outline: 0;
}
.form-signin {
  max-width: 320px;
  padding-bottom: 15px;
  margin: 0 auto;
  margin-top: 10px;
}

.form-signin .form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
  border-color: #000;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top-style: solid;
  border-right-style: solid;
  border-bottom-style: solid;
  border-left-style: solid;
  border-color: #000;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.form-signin-heading {
  color: #f6bd60;
  text-align: center;
  padding-bottom: 20px;
}
</style>
