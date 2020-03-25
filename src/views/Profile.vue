<template>
  <div class="container d-flex justify-content-center">
    <b-card no-body class="overflow-hidden" style="width:70%;">
      <b-row no-gutters>
        <b-col md="3" class="bg-dark">
          <b-card-img :src="avaurl" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="9">
          <b-card-body title="Profile">
            <b-card-text>
              Name: {{ name }}
            </b-card-text>
            <b-card-text>
              Email: {{ email }}
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardImg,
  BCardBody,
  BCardText,
  BRow,
  BCol
} from 'bootstrap-vue'
import { mapState } from 'vuex'
export default {
  components: {
    BCard,
    BCardImg,
    BCardBody,
    BCardText,
    BRow,
    BCol
  },
  computed: {
    ...mapState({
      email: state => state.cred.email,
      name: state => state.cred.name,
      avaurl: state => state.cred.avaurl
    })
  },
  created () {
    this.$store.dispatch('fetchCart')
  }
}
</script>
