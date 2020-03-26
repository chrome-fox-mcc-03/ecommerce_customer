<template>
    <b-modal :id='"Modal"+Cart.id' title="Update Item" cancel-disabled ok-disabled ok-variant="hidden" cancel-variant="hidden" ok-title="" cancel-title = "">
        <form>
            Name:<br>
            <input type="text" readonly :value="Cart.Product.Name"><br>
            Quantity:<br>
            <input type="number" v-model="Cart.Quantity"><br>
            Price:<br>
            <input type="number" :value="Cart.Product.Price" readonly><br>
            <br>
            <input type="submit" @click.prevent="Update" value="Update">
            <b-button class="button" @click="DeleteThis" variant="danger" :id="Cart.id" >Delete</b-button>
        </form>
    </b-modal>
</template>

<script>
export default {
  props: ['Cart'],
  data () {
    return {
    }
  },
  methods: {
    Update () {
      console.log(this.Cart)
      this.$store.dispatch('UpdateCart', this.Cart)
    },
    DeleteThis () {
      console.log(this.Cart)
      this.$store.dispatch('DeleteCart', this.Cart)
    }

  }
}
</script>

<style>

</style>
