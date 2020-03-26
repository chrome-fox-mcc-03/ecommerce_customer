<template>
  <div class="container">
    <div class="row at-row flex-center" style="margin-top: 30px">
      <div class="card col-md-6" v-for="item in items" :key="item.id">
        <at-card :loading="loading" :style="{ padding: '0px'}" :bordered="true">
          <div class="main">
            <img :src="item.url" alt="" style="width: 230px" height="230">
            <div class="detail">
            <h1 slot="title" style="padding-top: 20px font-weight: bold; font-size: 30px">{{item.name}}</h1>
              <div class="description" style="padding-top: 15px">
                <p>{{item.description}}</p>
                <div @click="changePage(item.Category.name)" >
                  <at-tag color="primary" style="cursor: pointer;" >{{item.Category.name}}</at-tag>
                </div>
              </div>
              <div class="harga" style="padding:15px">
                <p>Rp.{{item.price}}</p>
              </div>
            </div>
            <div @click="test(item.id)">
              <at-rate style="padding-bottom:15px"
                :allow-half="false"
                :show-text="true"
                :value="item.ratings[0].rate"
                @on-change="changeHandle"
              >
              </at-rate>
            </div>
          </div>
          <at-button type="warning" style="width: 100%" @click.prevent="addQty(item)">Add To Cart</at-button>
        </at-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landingPage',
  data () {
    return {
      // loading: true
      value2: 0,
      tamp: 0
    }
  },
  computed: {
    items () {
      return this.$store.getters.findOne
    },
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    fetchItem () {
      this.$store.dispatch('fetchItem')
    },
    addQty (item) {
      this.$store.dispatch('addToCart', item)
        .then(data => {
          this.$store.commit('SET_QTY', data.data)
          this.fetchcart()
        })
        .catch(err => {
          const error = err.response.data.message
          this.open5('error', { err: error, msg: 'addCart Error' })
        })
    },
    fetchcart () {
      this.$store.dispatch('fetchCart')
    },
    changePage (item) {
      this.$router.push(`/${item}`)
    },
    changeHandle (item, test) {
      this.tamp = item
      // this.$store.dispatch('addRate', item)
    },
    test (item) {
      const rate = this.tamp
      const payload = { rate, id: item }
      this.$store.dispatch('addRate', payload)
    },
    open5 (type, data) {
      this.$Notify({
        title: data.msg,
        message: data.err,
        type: type
      })
    }
  },
  created () {
    this.fetchItem()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card {
    margin: 40px;
    width: 500px;
  }
  .description p {
    word-wrap: break-word;
      color: grey;
  }
  .card h1 {
    word-wrap: break-word
  }
</style>
