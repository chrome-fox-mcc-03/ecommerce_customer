<template>
  <form @submit.prevent="editCart">
    <div class="card" id="real-card">
      <span class="text-capitalize pt-2 px-2">
        <h4>
          {{ data.Product.name }}
        </h4>
      </span>
      <div class="p" style="height:300px">
        <img
          :src="data.Product.image_url"
          alt="card image"
          class="img-fluid"
          style="max-height:100%"
        />
      </div>
      <div class="card-body pt-1 pb-2 ">
        <p class="card-text my-1">
          <strong>Price : $</strong> {{ data.Product.price }}
        </p>
        <p class="card-text my-1">
          <strong>Quantity : </strong>
          <input
            v-model="editQuantity"
            type="number"
            placeholder="select quantity"
            style="text-align:center"
            size="3"
          />
        </p>
        <div></div>
      </div>
      <div class="btn-group mb-0" role="group">
        <button class="btn btn-secondary" @click="closeEdit">
          <i class="fas fa-backspace"></i>
        </button>
        <button class="btn btn-warning" type="submit">
          <i class="fas fa-edit"></i>
        </button>
      </div>
    </div>
  </form>
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
  name: "CardCartEdit",
  props: ["data"],
  data() {
    return {
      editQuantity: this.data.quantity
    };
  },
  methods: {
    editCart() {
      this.$store
        .dispatch("editCart", {
          quantity: this.editQuantity,
          id: this.data.id
        })
        .then(() => {
          Toast.fire({
            icon: "success",
            title: `Successfully edited ${this.data.Product.name}`
          });
          this.closeEdit();
          this.$emit("fetch-data");
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
    },
    closeEdit() {
      this.$emit("close-edit");
      this.editQuantity = this.data.quantity;
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
