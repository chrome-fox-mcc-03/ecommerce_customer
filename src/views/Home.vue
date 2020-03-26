<template>
  <div class="home mt-5">
    <category-list />
    <categories />
  </div>
</template>

<script>
// @ is an alias to /src
import Categories from '../components/Home/Categories.vue';
import CategoryList from '../components/Home/CategorieList.vue';

export default {
  name: 'Home',
  components: {
    Categories,
    CategoryList,
  },
  created() {
    this.$store.dispatch('getCategories');
  },
};
</script>
