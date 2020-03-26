<template>
  <div class="card col-12 col-sm-6 col-md-4 col-lg-3 mb-2 rounded-0 mr-2 shadow-sm" style="max-width: 18rem;">
    <div @click="addToCart(shoe.id)" class="add-btn"><i class="fas fa-plus"></i></div>
    <div class="img-shoes" @click="redirToDetail(shoe.id)">
      <img :src="`${shoe.image_url}`" class="card-img-top" alt="Shoes-Img">
    </div>
    <div class="shoe-desc">
      <p class="shoe-name" @click="addToCart(shoe.id)">{{ shoe.name }}</p>
      <p @click="addToCart(shoe.id)">{{ shoe.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoeCard',
  props: ['shoe'],
  methods: {
    addToCart (id) {
      this.$toasted.show(`Add ${this.shoe.name} to cart?`, {
        action: [
          {
            text: 'Yes',
            onClick: (e, toastObject) => {
              this.$store.dispatch('addToCart', id)
                .then(({ data }) => {
                  console.log(data)
                  this.$store.dispatch('fetchCarts')
                  toastObject.goAway(0)
                })
                .catch(err => {
                  console.log(err.response.data)
                })
            }
          },
          {
            text: 'No',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        ]
      })
    },
    redirToDetail (id) {
      console.log('detail!', id)
      this.$router.push(`/catalog/detail/${id}`)
    }
  }
}
</script>

<style lang="scss">
.shoe-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .5rem .5rem;
  text-align: center;
  p {
    margin: 0;
    color: black;
    transition: .3s;
  }
}
.shoe-name {
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
}
.img-shoes {
  cursor: pointer;
}
</style>
