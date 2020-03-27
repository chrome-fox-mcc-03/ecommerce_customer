<template>
  <div class="mb-5 container shadow-sm category-list">
    <b-button pill variant="info" class="category-button">
      All
    </b-button>
    <b-button v-for="(category, index) in categoryName" :key="index"
      pill variant="info" class="category-button">
      {{ category.name }}
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  methods: {
    // fetchProducts(categoryId) {

    // },
  },
  computed: {
    categoryName() {
      return this.$store.getters.categoryName;
    },
  },
};
</script>

<style>
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
</style>
