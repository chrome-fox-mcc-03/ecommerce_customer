<template>
    <div>
        <h1 class="title is-2 has-text-black-ter is-family-secondary has-text-centered">Product Detail</h1><br>
        <div class="columns">
            <div class="column"></div>
            <div class="column is-four-fifths">
                <div class="columns">
                    <div class="column">
                        <div class="box">
                            <figure class="image">
                                <img src="https://images.pexels.com/photos/89783/belts-belt-buckle-leather-metal-89783.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                            </figure>
                        </div>
                    </div>
                    <div class="column">
                        <div class="box">
                            <br>
                            <p class="title is-3">Nama Barang</p>
                            <p class="subtitle is-4">Harga</p>
                            <p class="subtitle is-5">Stock</p>
                            <p class="subtitle is-5">Category</p>
                            <router-link to='/' class="button is-link">
                                <i class="fas fa-cart-plus"></i>
                                <p class="has-text-link">...</p>
                                Add to Cart
                            </router-link><br><br>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductDetail'
}
</script>
