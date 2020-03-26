<template>
  <div class="col-3 my-3 " id="product-card">
    <form @submit.prevent="addToCart">
      <div class="card" id="real-card">
        <span class="text-capitalize pt-2 px-2">
          <h4>
            {{ data.name }}
          </h4>
        </span>
        <div class="p" style="height:300px">
          <img
            :src="data.image_url"
            alt="card image"
            class="img-fluid"
            style="max-height:100%"
          />
        </div>
        <div class="card-body pt-1 pb-2 ">
          <p class="card-text my-1">
            <strong>Price : $</strong> {{ data.price }}
          </p>
          <p class="card-text my-1">
            <strong>Stock : </strong> {{ data.stock }}
          </p>
          <div>
            <input
              type="number"
              placeholder="select quantity"
              style="text-align:center"
              v-model="quantity"
            />
          </div>
        </div>
        <div class="btn-group mb-0" role="group">
          <button class="btn btn-success" type="submit">
            Add to Cart
            <i class="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
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
  name: "CardProduct",
  props: ["data"],
  computed: {},
  data() {
    return {
      quantity: null
    };
  },
  methods: {
    addToCart() {
      if (this.quantity <= this.data.stock) {
        this.$store
          .dispatch("addToCart", {
            ProductId: this.data.id,
            quantity: this.quantity
          })
          .then(() => {
            Toast.fire({
              icon: "success",
              title: `Successfully added ${this.data.name} to the cart`
            });
            this.$emit("add-quantity");
          })
          .catch(({ response }) => {
            if (typeof response.data.msg === "object") {
              response.data.msg.forEach(el => {
                Toast.fire({
                  icon: "error",
                  title: el
                });
              });
            } else {
              Toast.fire({
                icon: "error",
                title: response.data.msg
              });
            }
          })
          .finally(() => {
            this.$store.commit("SET_LOADING", false);
          });
      } else {
        Toast.fire({
          icon: "error",
          title: "Cannot add more than what the stock currently has"
        });
      }
    }
  }
};
</script>

<style scoped>
#product-card {
  min-height: 450px;
  width: 300px;
}
</style>
