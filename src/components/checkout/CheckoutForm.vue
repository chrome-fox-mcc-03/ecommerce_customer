<template>
  <div class="shopping-cart">
    <div class="px-4 px-lg-0" v-if="cart">

      <div class="pb-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

              <!-- Shopping cart table -->
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" class="border-0 bg-light">
                        <div class="p-2 px-3 text-uppercase">Product</div>
                      </th>
                      <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Price</div>
                      </th>
                      <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Quantity</div>
                      </th>
                      <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Remove</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cart.Items" :key="item.id">
                      <th scope="row" class="border-0">
                        <div class="p-2">
                          <img :src="item.Product.image_url" alt="" width="70"
                            class="img-fluid rounded shadow-sm">
                          <div class="ml-3 d-inline-block align-middle">
                            <h5 class="mb-0"> <a href="#"
                        class="text-dark d-inline-block align-middle">{{ item.Product.name }}</a>
                            </h5>
                            <span
                              class="text-muted font-weight-normal font-italic d-block">Category:
                              {{ getCategoryNameFromId(item.Product.CategoryId) }}</span>
                          </div>
                        </div>
                      </th>
                      <td class="border-0 align-middle">
                        <strong>{{ currency(item.Product.price) }}</strong></td>
                      <td class="border-0 align-middle"><strong>{{ item.quantity }}</strong></td>
                      <td class="border-0 align-middle"><a href="#"
                          @click="removeItem(cart.id, item.id)" class="text-dark"><i
                            class="fa fa-trash"></i></a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- End -->
            </div>
          </div>

          <div class="row py-5 p-4 bg-white rounded shadow-sm">
            <div class="col-lg-6">
              <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon
                code</div>
              <div class="p-4">
                <p class="font-italic mb-4">If you have a coupon code, please enter it in the box
                  below</p>
                <div class="input-group mb-4 border rounded-pill p-2">
                  <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3"
                    class="form-control border-0">
                  <div class="input-group-append border-0">
                    <button id="button-addon3" type="button"
                      class="btn btn-dark px-4 rounded-pill"><i class="fa fa-gift mr-2"></i>Apply
                      coupon</button>
                  </div>
                </div>
              </div>
              <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                Instructions for seller</div>
              <div class="p-4">
                <p class="font-italic mb-4">If you have some information for the seller you can
                  leave them in the box below</p>
                <textarea name="" cols="30" rows="2" class="form-control"></textarea>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order
                summary </div>
              <div class="p-4">
                <p class="font-italic mb-4">Shipping and additional costs are calculated based on
                  values you have entered.</p>
                <ul class="list-unstyled mb-4">
                  <li class="d-flex justify-content-between py-3 border-bottom"><strong
                      class="text-muted">Order Subtotal
                    </strong><strong>{{ currency(total) }}</strong></li>
                  <li class="d-flex justify-content-between py-3 border-bottom"><strong
                      class="text-muted">Shipping and handling</strong><strong> Rp. 0</strong></li>
                  <li class="d-flex justify-content-between py-3 border-bottom"><strong
                      class="text-muted">Tax</strong><strong>Rp. 0</strong></li>
                  <li class="d-flex justify-content-between py-3 border-bottom"><strong
                      class="text-muted">Total</strong>
                    <h5 class="font-weight-bold">{{ currency(total) }}</h5>
                  </li>
                </ul><a @click="checkout(cart.id)" href="#"
                  class="btn btn-dark rounded-pill py-2 btn-block">Procceed to checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>You have no chart yet</h3>
    </div>
  </div>
</template>

<script>
import axios from '../../config/axios';

export default {
  data() {
    return {
      // total: 0,
    };
  },
  methods: {
    currency(num) {
      return num.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
      });
    },
    getCategoryNameFromId(id) {
      return this.categoryName.filter((el) => el.id === id)[0].name;
    },
    removeItem(cartId, itemId) {
      const loader = this.$loading.show({
        // Optional parameters
        container: null,
        canCancel: true,
        onCancel: this.onCancel,
      });
      axios({
        url: `/cart/${cartId}/${itemId}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(() => {
          loader.hide();
          this.$notify({
            group: 'sucsess',
            title: 'Success',
            text: 'Item removed',
            type: 'success',
          });
          this.$store.dispatch('getCarts');
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            group: 'foo',
            title: 'Error',
            text: err.response.data.errors[0],
            type: 'error',
          });
        });
    },
    checkout(cartId) {
      const loader = this.$loading.show({
        // Optional parameters
        container: null,
        canCancel: true,
        onCancel: this.onCancel,
      });
      axios({
        url: `/cart/${cartId}/checkout`,
        method: 'POST',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(() => {
          loader.hide();
          this.$notify({
            group: 'foo',
            title: 'Success',
            text: 'Your cart has already been placed',
            type: 'success',
          });
          this.$store.dispatch('getCarts');
          this.$router.push('/');
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            group: 'foo',
            title: 'Error',
            text: err.response.data.errors[0],
            type: 'error',
          });
        });
    },
  },
  computed: {
    cart() {
      return this.$store.getters.orderList;
    },
    categoryName() {
      return this.$store.getters.categoryName;
    },
    total() {
      let total = 0;
      this.cart.Items.forEach((el) => {
        total += el.total;
      });
      return total;
    },
  },
  created() {
    this.$store.dispatch('getCarts');
    this.$store.dispatch('getCategories');
  },
};

</script>

<style>

</style>
