<template>
    <div>
        <Carousel/><br>
        <div class="columns">
          <div class="column"></div>
          <div class="column is-half">
            <div class="buttons">
              <router-link
                to="/products"
                class="button is-primary is-large is-rounded"
                style="width: 100%">
                Start Shopping
              </router-link>
            </div>
          </div>
          <div class="column"></div>
        </div>
        <br>
        <h1 class="title is-3 has-text-black-ter is-family-secondary has-text-centered">Categories</h1><br>
        <div class="columns is-multiline is-mobile">
          <div class="column is-4">
            <p class="is-6 has-text-black-ter is-family-secondary">Fashion</p><br>
            <img src="../assets/c-fashion.svg" style="width:50%">
          </div>
          <div class="column is-4">
            <p class="is-6 has-text-black-ter is-family-secondary">Automotive</p><br>
            <img src="../assets/c-auto.svg" style="width:50%">
          </div>
          <div class="column is-4">
            <p class="is-6 has-text-black-ter is-family-secondary">Hobby</p><br>
            <img src="../assets/c-hobby.svg" style="width:50%">
          </div>
          <div class="column is-4">
            <p class="is-6 has-text-black-ter is-family-secondary">Food and Beverages</p><br>
            <img src="../assets/c-food2.svg" style="width:50%">
          </div>
          <div class="column is-4">
            <p class="is-6 has-text-black-ter is-family-secondary">Electronic</p><br>
            <img src="../assets/c-electronic.svg" style="width:50%">
          </div>
          <div class="column is-4">
            <p class="is-6 has-text-black-ter is-family-secondary">Others</p><br>
            <img src="../assets/c-others.svg" style="width:50%">
          </div>
        </div>
    </div>
</template>

<script>
import Carousel from '../components/Carousel'

export default {
  name: 'Home',
  components: {
    Carousel
  }
}
</script>

<style scoped>
  div.column.is-4 {
    text-align: center;
  }

</style>
