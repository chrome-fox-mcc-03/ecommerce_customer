<template>
  <div id="category-tabs" class="row">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s2"><a class="teal-text" href="#" @click.prevent="filter(null)">All Categories</a></li>
          <li
            v-for="category in categories"
            :key="category.id"
            class="tab col s2"
          >
            <a
              class="teal-text"
              href="#"
              @click.prevent="filter(category.id)"
            >
              {{ category.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import M from 'materialize-css'
export default {
  name: 'CategoryTabs',
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    filter (categoryId) {
      this.$store.commit('SET_FILTER_ID', categoryId)
    }
  },
  created () {
    this.$store.dispatch('fetchCategories')
  },
  mounted () {
    M.AutoInit()
  }
}
</script>

<style>
  .tabs .tab a{
      /* font-size: 15pt; */
      color:#009688;
  }

  .tabs .tab a:hover {
      background-color:rgb(220, 240, 215);
      color:#009688;
  }

  .tabs .tab a:focus.active {
      background-color:rgba(201, 236, 194, 0.924);
      color:#009688;
  }

  .tabs .indicator {
      color: #009688;
      background-color:#009688;
  }
</style>
