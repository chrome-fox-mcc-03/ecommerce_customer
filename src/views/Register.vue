<template>
  <div class="bg-light pt-4">
    <div class="row">
      <div class="col-8">
        /register placeholder dolor sit amet
      </div>
      <div class="col-4">
        <b-overlay :show="$store.state.pageLoading" rounded="sm">
          <b-form @submit.prevent="submit">
            <b-form-group label="Email:">
              <b-form-input
                required
                v-model="email"
                type="email"
                placeholder="e.g lelegoyang@mail.com"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:">
              <b-form-input
                required
                v-model="password"
                type="password"
                placeholder="your secret password"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Name:">
              <b-form-input
                type="text"
                v-model="name"
                placeholder="your display name"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Avatar Url:">
              <b-form-input
                type="text"
                v-model="avaurl"
                placeholder="your image avatar url"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Register</b-button>
            <b-alert class="mt-4 text-wrap text-break" :variant="variant" :show="show">
              {{ error }}
            </b-alert>
          </b-form>
        </b-overlay>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BOverlay,
  BAlert
} from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: '',
      name: '',
      avaurl: ''
    }
  },
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BOverlay,
    BAlert
  },
  methods: {
    submit () {
      const payload = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      if (this.avaurl) {
        payload.avaurl = this.avaurl
      }
      // console.log(payload)
      this.register(payload)
    },
    ...mapActions({
      register: 'register'
    })
  },
  computed: {
    ...mapState({
      error: state => state.errorMsg.msg,
      variant: state => state.errorMsg.color,
      show: state => state.errorMsg.show
    })
  },
  created () {
    this.$store.commit('removeError')
  }
}
</script>
