<template>
  <div>
    <NavBar></NavBar>
    <div class="container-fluid mt-4" id="base">
      <div class="row d-flex align-items-start" style="height : 90vh;">
        <div class="col-2 pt-4" id="left-side">
          <div class="list-group">
            <router-link
              to="/carts"
              class="list-group-item list-group-item-action"
            >
              Your Cart ({{ quantity }})
            </router-link>
            <router-link
              to="/carts/buy"
              class="list-group-item list-group-item-action"
            >
              Buy Products
            </router-link>
          </div>
        </div>
        <div class="col-10" id="right-side">
          <div v-show="isLoading">
            <Loading></Loading>
          </div>
          <div v-show="!isLoading">
            <router-view
              @count-quantity="countQuantity"
              @add-quantity="addQuantity"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
export default {
  name: "DashboardPage",
  components: {
    NavBar,
    Loading
  },
  data() {
    return {
      quantity: 0
    };
  },
  methods: {
    countQuantity(payload) {
      this.quantity = payload;
    },
    addQuantity() {
      this.quantity++;
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>

<style scoped>
#left-side {
  background-color: #407088;
  overflow: hidden;
  height: 100%;
}

#right-side {
  background-color: #ffb5b5;
  overflow: scroll;
  height: 100%;
}

.list-group-item {
  margin-top: 5px;
  margin-bottom: 5px;
}

#base {
  padding-left: 50px;
  padding-right: 50px;
}

.router-link-exact-active {
  font-weight: 900;
  border: solid black 5px;
  font-size: 24px;
}
</style>
