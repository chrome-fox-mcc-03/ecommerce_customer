<template>
    <div>
        <div class="card">
            <div class="card-image">
                <figure class="image is-square">
                    <img src="https://images.pexels.com/photos/89783/belts-belt-buckle-leather-metal-89783.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-4">Nama Barang</p>
                <p class="subtitle is-6">Harga</p>
                <div class="columns">
                    <div class="column is-4">
                        <a class="button is-primary">
                            Detail
                        </a>
                    </div>
                    <div class="column"></div>
                    <div class="column is-4">
                        <a class="button is-link">
                            <i class="fas fa-cart-plus"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductCard'
}
</script>
