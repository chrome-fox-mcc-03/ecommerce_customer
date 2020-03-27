<template>
  <div>
    <h1 class="title is-2 has-text-black-ter is-family-secondary has-text-centered">Checkout Success</h1><br>
    <div class="columns">
      <div class="column"></div>
      <div class="column is-one-fifth">
        <lottie-player
          src="https://assets6.lottiefiles.com/packages/lf20_YmNE0q.json"
          background="transparent"
          speed="1"
          style="width: %"
          loop
          autoplay >
        </lottie-player>
        <router-link
          to="/products"
          class="button is-primary is-large is-rounded"
          style="width: 100%">
          Shop more
        </router-link>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutSuccess'
}
</script>
