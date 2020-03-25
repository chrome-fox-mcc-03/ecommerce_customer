<template>
    <div>
        <div class="card">
            <div class="card-image">
                <figure class="image is-square">
                    <img :src="product.image_url" :alt="product.name">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-4">{{ product.name }}</p>
                <p class="subtitle is-6">{{ product.price | currency }}</p>
                <div class="columns">
                    <div class="column is-4">
                        <router-link :to="`/products/${product.id}`" class="button is-primary is-rounded">
                            Detail
                        </router-link>
                    </div>
                    <div class="column"></div>
                    <div class="column is-4">
                        <a @click="addToCart(product.id)" class="button is-link is-rounded">
                            <i class="fas fa-cart-plus"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
    }
  }

}
</script>
