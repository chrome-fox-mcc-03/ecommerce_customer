<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-alert type="error" v-if="isError">{{errorMessage}}</v-alert>
            <v-card class="elevation-12">
              <v-toolbar color="teal" dark flat>
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer />
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large v-on="on" @click="toHome">
                      <v-icon>fas fa-home</v-icon>
                    </v-btn>
                  </template>
                  <span>To Home</span>
                </v-tooltip>
              </v-toolbar>
              <v-progress-linear indeterminate color="teal" v-if="isLoading"></v-progress-linear>

              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="onSubmit">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    required
                    prepend-icon="fas fa-envelope"
                    type="email"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                    prepend-icon="fas fa-lock"
                    type="password"
                  ></v-text-field>

                  <div class>
                    <v-btn color="teal" :disabled="!valid" type="submit">{{title}}</v-btn>
                    <v-btn @click="routeTo" class="float-right">{{moveTo}}</v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'LandingPageForm',
  props: {
    title: String,
    moveTo: String
  },
  data () {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => v.length >= 5 || 'Password too short. Minimum 5 characters',
        v => v.length <= 20 || 'Password too long. Maximum 20 characters'
      ],
      valid: false
    }
  },
  methods: {
    onSubmit () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.commit('SET_LOADING', true)
      if (this.title === 'Register') {
        payload.role = false
        this.$store.dispatch('registerCustomer', payload)
          .then(({ data }) => {
            this.$store.commit('STOP_ERROR')
            this.$store.commit('SET_LOADING', false)
            this.$store.commit('HAS_LOGIN')
            this.$router.push('/')
            localStorage.setItem('access_token', data.access_token)
          })
          .catch(({ response }) => {
            this.$store.commit('SET_LOADING', false)
            this.$store.commit('SET_ERROR', response.data)
          })
      }

      if (this.title === 'Login') {
        this.$store.dispatch('loginCustomer', payload)
          .then(({ data }) => {
            this.$store.commit('STOP_ERROR')
            this.$store.commit('SET_LOADING', false)
            this.$store.commit('HAS_LOGIN')
            this.$router.push('/')
            localStorage.setItem('access_token', data.access_token)
          })
          .catch(({ response }) => {
            this.$store.commit('SET_LOADING', false)
            this.$store.commit('SET_ERROR', response.data)
          })
      }
    },
    routeTo () {
      if (this.title === 'Login') this.$router.push('/register')
      if (this.title === 'Register') this.$router.push('/login')
    },
    toHome () {
      this.$router.push('/')
    }
  },
  computed: {
    isError () {
      return this.$store.state.errorStatus
    },
    isSuccess () {
      return this.$store.state.successStatus
    },
    errorMessage () {
      return this.$store.state.errorMessage
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
