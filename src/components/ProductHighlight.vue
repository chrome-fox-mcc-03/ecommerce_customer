<template>
  <div class="highlight">
    <li>
      <div class="uk-card uk-card-default">
        <div class="uk-card-media-top">
          <img :src="highlight.image_url" alt="">
        </div>
        <div class="uk-card-body">
          <h4 class="uk-card-title">{{ highlight.name }}</h4>
          <p>{{ highlight.desription }}</p>
          <p>Price: {{ getRupiah }}</p>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  props: ['highlight'],
  computed: {
    getRupiah () {
      let rupiah = ''
      const pricerev = this.highlight.price.toString().split('').reverse().join('')
      for (let i = 0; i < pricerev.length; i++) if (i % 3 === 0) rupiah += pricerev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  }
}
</script>

<style scoped>
.highlight{
  max-width: 65%;
  min-width: 65%;
  max-height: 10%;
  min-height: 10%;
  text-align: center;
}
img{
  height: 150px;
}
.uk-card-media-top{
  display: flex;
  justify-content: center;
}
</style>
