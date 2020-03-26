<template>
  <div class="col-3 my-3 " id="product-card">
    <div class="card" id="real-card" v-if="!isEditing">
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
          <strong>Quantity : </strong> {{ data.quantity }}
        </p>
      </div>
      <div class="btn-group mb-0" role="group">
        <button @click="showEdit" class="btn btn-warning" type="submit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-danger" @click="deleteCart">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
    <CardCartEdit
      v-else
      :data="data"
      @close-edit="closeEdit"
      @fetch-data="fetchData"
    ></CardCartEdit>
  </div>
</template>

<script>
import CardCartEdit from "./CardCartEdit";
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
  name: "CardCart",
  components: {
    CardCartEdit
  },
  props: ["data"],
  computed: {},
  data() {
    return {
      isEditing: false
    };
  },
  methods: {
    showEdit() {
      this.isEditing = true;
    },
    closeEdit() {
      this.isEditing = false;
    },
    fetchData() {
      this.$emit("fetch-data");
    },
    deleteCart() {
      this.$store
        .dispatch("deleteCart", {
          id: this.data.id
        })
        .then(({ data }) => {
          Toast.fire({
            icon: "success",
            title: data.msg
          });
          this.fetchData();
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
