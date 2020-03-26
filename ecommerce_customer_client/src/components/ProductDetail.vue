<template>
  <b-modal :id="modifiedName" hide-header="hide-header" hide-footer="hide-footer" :title="title">
      <h1 class="my-4">{{product.name}}
        <small>Detail Product</small>
      </h1>
      <div class="row">
        <div class="col-md-8">
          <img class="img-fluid" :src="product.image_url" alt="">
        </div>
        <div class="col-md-4">
          <h3 class="my-3">Project Description</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</p>
          <h3 class="my-3">Product Details</h3>
          <ul>
            <li>Price : {{product.price | currency}}</li>
            <li>Stock : {{product.stock}}</li>
          </ul>
        </div>
      </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ProductDetail',
  // props: ['product', 'name']
  props: {
    product: {
      type: Object
    },
    modifiedName: {
      type: String
    },
    title: String
  }
}
</script>

<style scoped>

.right-column {
  margin-top: 2%;
}

.left-column {
  margin-top: 2%;
}

.image-container {
  width: 40vw;
  height: 50vh;
  margin-bottom: 25%;
  margin-top: 10%;
}

.detail-container {
  width: 40vw;
  height: 50vh;
  margin-bottom: 25%;
  margin-top: 10%;
}

</style>
