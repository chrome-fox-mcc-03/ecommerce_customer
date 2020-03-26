<template>
  <div class='col-md-3'>
    <div class='card mb-3 p-3'>
      <img class='card-img-top' :src='imgUrl' alt='Card image cap'>
      <div class='card-body'>
        <div class="card-content">
          <h5 class='card-title'>{{product.name}}</h5>
          <!-- <h5 class='card-title'>name</h5> -->
          <p class='card-text'>{{product.description}}</p>
          <!-- <p class='card-text'>desc</p> -->
          <p class='card-text'>Price: Rp. {{product.price}}</p>
          <!-- <p class='card-text'>Price: Rp. price</p> -->
          <p class='card-text'>Stock: {{product.stock}} pc(s)</p>
          <!-- <p class='card-text'>Stock: pc(s)</p> -->
        </div>
        <div class="btn-action">
          <form @submit.prevent="addToCart">
            <div class="form-group">
              <input v-model="qty" type="number" min="0" :max="product.stock"><br>
            </div>
            <button v-if="update" type="submit" class="btn btn-primary">Update cart</button>
            <button v-else type="submit" class="btn btn-primary">Add to cart</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default {
  props: ['product'],
  data () {
    return {
      qty: 0,
      update: false
    }
  },
  computed: {
    imgUrl () {
      const defaultUrl = 'https://omegamma.com.au/wp-content/uploads/2017/04/default-image.jpg'
      if (!this.product.img_url) {
        return defaultUrl
      } else {
        return this.product.img_url
      }
    }
  },
  methods: {
    fetchCarts () {
      return this.$store.dispatch('getCarts')
    },
    addToCart () {
      if (this.qty > 0) {
        const payload = {
          id: this.product.id,
          qty: this.qty
        }
        this.$store.dispatch('addToCart', payload)
          .then((result) => {
            Toast.fire({
              icon: 'success',
              title: 'Success!'
            })
            this.fetchCarts()
          }).catch((err) => {
            Toast.fire({
              icon: 'error',
              title: err.response.data.message
            })
          })
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Quantity must be greater than 0'
        })
      }
    },
    setQty () {
      const result = this.$store.getters.cart({ id: this.product.id })
      if (result.length) {
        this.update = true
        this.qty = result[0].qty
      } else {
        this.qty = 0
      }
      // this.qty = this.$store.getters.cart({ id: this.product.id })[0].qty || 0
    }
  },
  created () {
    this.fetchCarts()
      .then((result) => {
        this.setQty()
      }).catch((err) => {
        Toast.fire({
          icon: 'error',
          title: err.response.data.message
        })
      })
  }
}
</script>

<style>
.card {
  /* height: 500px; */
  background-color: #ffd3b6 !important;
  border-radius: 15px !important;
}

.card-content {
  height: 150px;
  overflow-y: auto;
}

.card-img-top {
    width: 100%;
    height: 200px;
}
</style>
