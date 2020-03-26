<template>
  <div class="home mt-5">
    <!-- Category List Button -->
     <div class="mb-5 container shadow-sm category-list">
        <b-button @click="showProduct(0)" pill variant="info" class="category-button">
         All
        </b-button>

        <b-button v-for="category in categoryName" :key="category.id"
          pill variant="info" class="category-button"
          @click="showProduct(category.id)"
          >
          {{ category.name }}
        </b-button>

      </div>
    <!-- Product card list -->
    <div class="container product-list">
      <product-card v-for="product in products" :product="product" :key="product.id"/>
    </div>

  </div>
</template>

<script>
import ProductCard from '../components/Home/ProductCard.vue';

export default {
  name: 'Home',
  data() {
    return {
      products: [],
    };
  },
  components: {
    ProductCard,
  },
  methods: {
    showProduct(categoryId) {
      if (categoryId > 0) {
        this.products = this.allProducts.filter((el) => el.CategoryId === categoryId);
      } else {
        this.products = this.allProducts;
      }
    },
  },
  computed: {
    categoryName() {
      return this.$store.getters.categoryName;
    },
    allProducts() {
      return this.$store.state.products;
    },
  },
  created() {
    this.$store.dispatch('getCategories');
    this.$store.dispatch('getProducts');
  },
};
</script>

<style scoped>
  .category-list {
    border-radius: 8px;
    overflow-x: auto;
    scrollbar-color: #d6d6d6;
    scrollbar-width: thin;
    padding: 10px 16px;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
  }

  .category-button {
    margin-right: 10px;
  }

  .product-list {
    display: flex;
    justify-content: flex-start;

  }
</style>
