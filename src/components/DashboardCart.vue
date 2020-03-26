<template>
  <div class="pt-3 mt-3" id="base">
    <div
      id="product-list"
      class="d-flex justify-content-around align-items-between"
    >
      <div>
        <h1>This is your cart</h1>
      </div>
      <div>
        <h1>Total price : ${{ totalPrice }}</h1>
      </div>
    </div>
    <hr />
    <div class="row">
      <CardCart
        v-for="(cart, i) in carts"
        :key="i"
        :data="cart"
        @fetch-data="fetchCarts"
      ></CardCart>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import CardCart from "./CardCart";
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export default {
  name: "DashboardCart",
  components: {
    CardCart
  },
  data() {
    return {
      carts: [],
      totalPrice: 0
    };
  },
  methods: {
    fetchCarts() {
      this.$store
        .dispatch("fetchCarts")
        .then(({ data }) => {
          Toast.fire({
            icon: "success",
            title: data.msg
          });
          this.carts = data.data;
          this.countQuantity();
          this.countPrice();
        })
        .catch(({ response }) => {
          Toast.fire({
            icon: "error",
            title: response.data.msg
          });
        })
        .finally(() => {
          this.$store.commit("SET_LOADING", false);
        });
    },
    countQuantity() {
      this.$emit("count-quantity", this.carts.length);
    },
    countPrice() {
      this.totalPrice = 0;
      this.carts.forEach(el => {
        this.totalPrice += Number(el.Product.price) * el.quantity;
      });
    }
  },
  created() {
    this.fetchCarts();
  }
};
</script>

<style scoped>
#product-list {
  background-color: white;
}

#base {
  background-color: #ffcbcb;
}
</style>
