<template>
  <div class="catalog-page">
    <Navbar/>
    <div class="ads">
      <h1>New Arrival</h1>
      <p>check out our latest collection</p>
    </div>
    <div class="catalog-space">
      <h3 class="mt-2 mb-3">collection</h3>
      <div class="row d-flex">
        <ShoeCard v-for="shoe in products" :key="shoe.id" :shoe="shoe"/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import ShoeCard from '../components/ShoeCard.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
  name: 'CatalogPage',
  components: {
    Navbar,
    ShoeCard,
    Footer
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style lang="scss">
.ads {
  height: 500px;
  background-image: url("../assets/newbal.jpg");
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10rem;
  align-items: flex-end;
  // font-family: 'Cabin', sans-serif;
  color: rgb(0, 0, 0);
  text-align: right;
  h1 {
    font-weight: 900;
    font-size: 4rem;
    font-style: italic;
  }
  p {
    font-size: 1.25rem;
  }
}
.catalog-space {
  background-color: rgb(241, 241, 241);
  padding: .5rem 7.5rem;
}
.shoes-img {
  max-width: 100%;
  max-height: 90%;
  /* object-fit: cover;
  width: 250px;
  height: 250px; */
}
.add-btn{
  height: 30px;
  width: 30px;
  background-color: teal;
  border-radius: 50%;
  position: absolute;
  right: 1rem;
  top: 1rem;
  transition: .3s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
}
.fa-plus {
  color: white;
}
.shoe-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .5rem .5rem;
  text-align: center;
  p {
    margin: 0;
  }
}
</style>
