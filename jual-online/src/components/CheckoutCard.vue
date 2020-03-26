<template>
    <div>
        <div class="card">
            <h5 class="card-header">{{ product.name }}</h5>
            <div class="card-body">
                <h5 class="card-title">{{ product.image_url }}</h5>
                <p class="card-text">Price: {{ product.price }} Stock: {{ product.stock }}</p>
                <input type="number" placeholder="amount"> <button v-on:click.prevent="addToCart" class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    </div>
</template>
