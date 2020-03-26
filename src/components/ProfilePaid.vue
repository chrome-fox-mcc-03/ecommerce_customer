<template>
    <tr>
      <td>{{ index }}</td>
      <td><img class="uk-preserve-width" :src="paidProduct.Product.image_url" width="50" alt=""></td>
      <td>{{ paidProduct.Product.name }}</td>
      <td>{{ paidProduct.quantity }}</td>
      <td>{{ getInvoice }}</td>
      <td>{{ getDate }}</td>
    </tr>
</template>

<script>
import Moment from 'moment'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  props: ['paidProduct', 'index'],
  created () {
  },
  computed: {
    getInvoice () {
      const invoice = this.paidProduct.Product.price * this.paidProduct.quantity
      let rupiah = ''
      const pricerev = invoice.toString().split('').reverse().join('')
      for (let i = 0; i < pricerev.length; i++) if (i % 3 === 0) rupiah += pricerev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    },
    getDate () {
      return Moment(this.paidProduct.updatedAt).format('Do MMMM YYYY')
    }
  }
}

</script>

<style scoped>
.btn-remove:hover{
  transform: scale(1.2);
  padding: 1px;
  border-radius: 5px;
}

.btn-cancel:hover{
  transform: scale(1.2);
  padding: 1px;
  border-radius: 5px;
}
.uk-modal-dialog{
  border-radius: 25px;
  text-align: center;
}
.uk-modal-body.uk-overflow-auto{
  min-height: 50px !important;
  max-height: 150px;
}
.uk-modal-footer{
  display: flex;
  justify-content: space-around;
  border-radius: 25px;
  border: none;
}
.uk-modal-header{
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom: #ff847c 3px solid;

}

</style>
