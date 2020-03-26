<template>
  <div class="container">
    <div class="shopping-cart">
      <div class="title">
        Shopping Bag
      </div>
      <div v-if="fetchDataCart.length !== 0">
        <div class="item" v-for="item in fetchDataCart" :key="item.id">
          <div class="buttons" @click="deleted(item.id)">
            <span class="delete-btn"><i class="icon icon-x"></i></span>
          </div>
          <div class="image">
            <img :src="item.Production.url" alt=""  style="width:78px; height:78px"/>
          </div>
          <div class="description">
            <span>{{item.Production.name}}</span>
            <span>{{item.Production.description}}</span>
            <span></span>
          </div>
          <div class="quantity">
            <button class="plus-btn" type="button" name="button" @click="add(item.ProductionId)" v-if="item.Stock !== item.Production.stock">
              <i class="icon icon-plus"></i>
            </button>
            <button class="plus-btn" type="button" name="button" @click="add(item.ProductionId)" v-else disabled>
              <i class="icon icon-plus"></i>
            </button>
            {{item.Stock}}
            <button class="minus-btn" type="button" name="button" @click="min(item.id)" v-if="item.Stock === 0" disabled>
              <i class="icon icon-minus"></i>
            </button>
            <button class="minus-btn" type="button" name="button" @click="min(item.id)" v-else>
              <i class="icon icon-minus"></i>
            </button>
          </div>
          <div class="total-price">{{item.Production.price}}</div>
        </div>
      </div>
      <div v-if="fetchDataCart.length === 0">
        no data
      </div>
    </div>
    <div class="totals" v-if="fetchDataCart.length !== 0">
      <strong>total Price: Rp.{{total}}</strong>
      <br>
      <at-button @click.prevent="checkout" type="primary" style="width:200px !important; background-color:#2E86C1 !important; margin-top:30px !important;">Checkout</at-button>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    fetchDataCart () {
      return this.$store.state.itemsCart
    },
    total () {
      return this.$store.state.total
    }
  },
  methods: {
    fetchdata () {
      this.$store.dispatch('fetchCart')
    },
    deleted (payload) {
      this.start()
      this.$store.dispatch('deleteFromCart', payload)
        .then(data => {
          this.finish()
          this.open5('success', { err: 'delete success', msg: 'Register Error' })
          this.fetchdata()
        })
        .catch(err => {
          const error = err.response.data.message
          this.open5('error', { err: error, msg: 'Register Error' })
          this.error()
        })
    },
    add (payload) {
      this.$store.dispatch('addToCart', { id: payload })
      this.fetchdata()
    },
    min (payload) {
      this.$store.dispatch('minQty', payload)
      this.fetchdata()
    },
    checkout () {
      this.start()
      this.$Modal.confirm({
        title: 'Tips',
        content: `You bought this item at a price Rp.${this.total}`
      }).then(() => {
        this.$Message('Thanks for buy our product')
        this.$store.dispatch('checkOut')
          .then(data => {
            this.fetchdata()
            this.finish()
          })
          .catch(err => {
            const error = err.response.data.message
            this.open5('error', { err: error, msg: 'Register Error' })
            this.error()
          })
      }).catch(() => {
        this.$Message('I Hope You Backsoon ;)')
      })
    },
    modalConfirm () {
      this.$Modal.confirm({
        title: 'Tips',
        content: 'This operation needs to be very careful. Are you sure you want to do this?'
      }).then(() => {
        this.$Message('Click \'Confirm\' Button')
      }).catch(() => {
        this.$Message('Click \'Cancel\' Button')
      })
    },
    start () {
      this.$Loading.start()
    },
    finish () {
      this.$Loading.finish()
    },
    error () {
      this.$Loading.error()
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
    this.fetchdata()
  }
}
</script>

<style scoped>
.shopping-cart {
  width: 750px;
  margin: 80px auto;
  background: #FFFFFF;
  box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.10);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}
.title {
  height: 60px;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px 30px;
  color: #5E6977;
  font-size: 18px;
  font-weight: 400;
}
.totals {
  right: 0;
  margin-bottom: 20px;
  padding-left: 450px;
}
.item {
  padding: 20px 30px;
  height: 120px;
  display: flex;
}
.item {
  border-top:  1px solid #E1E8EE;
  border-bottom:  1px solid #E1E8EE;
}
.buttons {
  position: relative;
  padding-top: 30px;
  margin-right: 60px;
}
.delete-btn,
.like-btn {
  display: inline-block;
  Cursor: pointer;
}
.delete-btn {
  width: 18px;
  height: 17px;
  background: url(&quot;delete-icn.svg&quot;) no-repeat center;
}
.like-btn {
  position: absolute;
  top: 9px;
  left: 15px;
  width: 60px;
  height: 60px;
  background-size: 2900%;
  background-repeat: no-repeat;
}
.is-active {
  animation-name: animate;
  animation-duration: .8s;
  animation-iteration-count: 1;
  animation-timing-function: steps(28);
  animation-fill-mode: forwards;
}
@keyframes animate {
  0%   { background-position: left;  }
  50%  { background-position: right; }
  100% { background-position: right; }
}
.image {
  margin-right: 50px;
}
.description {
  padding-top: 10px;
  margin-right: 60px;
  width: 115px;
}
.description span {
  display: block;
  font-size: 14px;
  color: #43484D;
  font-weight: 400;
}
.description span:first-child {
  margin-bottom: 5px;
}
.description span:last-child {
  font-weight: 300;
  margin-top: 8px;
  color: #86939E;
}
.quantity {
  padding-top: 20px;
  margin-right: 60px;
}
.quantity input {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 32px;
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
}
button[class*=btn] {
  width: 30px;
  height: 30px;
  background-color: #E1E8EE;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.minus-btn img {
  margin-bottom: 3px;
}
.plus-btn img {
  margin-top: 2px;
}
button:focus,
input:focus {
  outline:0;
}
.total-price {
  width: 83px;
  padding-top: 27px;
  text-align: center;
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
}
@media (max-width: 800px) {
  .shopping-cart {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .item {
    height: auto;
    flex-wrap: wrap;
    justify-content: center;
  }
  .image img {
    width: 50%;
  }
  .image,
  .quantity,
  .description {
    width: 100%;
    text-align: center;
    margin: 6px 0;
  }
  .buttons {
    margin-right: 20px;
  }
}
</style>
