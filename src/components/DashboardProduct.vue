<template>
  <div class="pt-3 mt-3" id="base">
    <div
      id="product-list"
      class="d-flex justify-content-center align-items-center"
    >
      <div>
        <h1>This is all the product(s) in store right now</h1>
      </div>
    </div>
    <hr />
    <div class="row">
      <CardProduct
        v-for="(product, i) in products"
        :key="i"
        :data="product"
        @add-quantity="addQuantity"
      ></CardProduct>
    </div>
  </div>
</template>

<script>
import CardProduct from "./CardProduct";
import Swal from "sweetalert2";
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
  name: "DashboardProduct",
  components: {
    CardProduct
  },
  data() {
    return {
      products: []
    };
  },
  methods: {
    fetchProducts() {
      this.$store
        .dispatch("fetchProducts")
        .then(({ data }) => {
          this.products = data.data;
          Toast.fire({
            icon: "success",
            title: data.msg
          });
        })
        .catch(() => {
          Toast.fire({
            icon: "error",
            title: "Error fetching products"
          });
        })
        .finally(() => {
          this.$store.commit("SET_LOADING", false);
        });
    },
    addQuantity() {
      this.$emit("add-quantity");
    }
  },
  created() {
    this.fetchProducts();
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
