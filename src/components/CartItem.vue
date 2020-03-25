<template>
    <tr>
        <td>
          <img :src="`${item.Product.image_url}`" alt="product" style="height:200px;">
        </td>
        <td>{{item.Product.name}}</td>
        <td>{{formatMoney(item.Product.price)}}</td>
        <td>
          <div>
            <button class="bg-transparent" style="border: none;">
              <i class="fas fa-minus fa-xs"></i>
            </button>
            {{item.amount}}
            <button class="bg-transparent" style="border: none;">
              <i class="fas fa-plus fa-xs"></i>
            </button>
          </div>
        </td>
        <td>{{formatMoney(total(item.Product.price, item.amount))}}</td>
        <td class="btn btn-link" style="text-decoration:none; color: #b26a6a;">
          <router-link class="row" :to="``" style="text-decoration:none; font-size: 19px; color: #b26a6a;" data-toggle="modal" data-target="#exampleModal">Remove</router-link>
          <router-link class="row" :to="`/`" style="text-decoration:none; font-size: 19px; color: #30b8a4;">Checkout</router-link>
        </td>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="text-align: center;">Remove Confirmation</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <!-- <td class="btn btn-link" style="text-decoration:none; color: black;">Checkout</td> -->
    </tr>

</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: Object
  },
  methods: {
    formatMoney (amount) {
      const price = 'Rp ' + parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.')
      return price
    },
    total (price, amount) {
      const total = price * amount
      return total
    }
  }
}
</script>

<style>
.modal-content{
  background-color: #ffd7dc;
}
</style>
