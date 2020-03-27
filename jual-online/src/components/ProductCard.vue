<template>
    <div>
        <div class="card">
            <h5 class="card-header">{{ product.name }}</h5>
            <div class="card-body">
                <h5 class="card-title">{{ product.image_url }}</h5>
                <p class="card-text">Price: {{ product.price }} Stock: {{ product.stock }}</p>
                <input type="number" v-model="quantity" placeholder="amount"> <button v-on:click.prevent="addToCart" class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  data () {
    return {
      quantity: 0
    }
  },
  methods: {
    addToCart: function () {
      this.$store.dispatch('addToCart', { quantity: this.quantity, id: this.product.id, name: this.product.name })
      this.quantity = 0
    }
  }
}
</script>

<style>
.card {
  width: 50vw;
}
.add-to-cart {
    width: 125px;
    background-color: #00bfa6;
    border: none;
    color: #fff;
    font-weight: bold;
    padding: 10px 15px;
    border-radius: 25px;
    font-size: 14px;
}
.add-to-cart:hover {
    cursor: pointer;
    background-color: #637c79;
}
</style>
