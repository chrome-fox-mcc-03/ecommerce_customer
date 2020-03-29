<template>
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
        <a href="#" data-toggle="modal" :data-target="`#exampleModal${data.id}`"><img class="card-img-top" :src="data.image_url" alt=""></a>
        <div class="card-body">
          <h4 class="card-title">
              <a href="#" data-toggle="modal" data-target="#exampleModalClass">{{data.name}}</a>
          </h4>
          <h5>Rp {{data.price}}</h5>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
        </div>
    </div>
    <div class="modal fade" :id="`exampleModal${data.id}`" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add To Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>Name</label> <br>
            <input type="text" readonly class="form-control" v-model="name">
            <label>Price</label> <br>
            <input type="text" readonly class="form-control" v-model="price">
            <label>Amount</label> <br>
            <input type="number" class="form-control mr-1" style="width:15%;display:inline" v-model="amount" @keyup="increment" @click="increment">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-warning" @click.prevent="addToCart(data.id)" data-dismiss="modal">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      image_url: '',
      price: 0,
      amount: 1
    }
  },
  props: ['data'],
  methods: {
    addToCart (id) {
      const name = this.name
      const imageUrl = this.image_url
      const price = this.price
      const amount = this.amount // untuk quantity
      this.$store.dispatch('addToCart', { name, imageUrl, price, amount, id })
    },
    increment () {
      this.price = this.data.price * this.amount
    }
  },
  created () {
    this.name = this.data.name
    this.image_url = this.data.image_url
    this.price = this.data.price
  }
}
</script>

<style>

</style>
