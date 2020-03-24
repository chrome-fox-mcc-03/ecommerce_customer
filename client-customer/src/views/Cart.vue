<template>
    <div>
        <h1 class="title is-2 has-text-black-ter is-family-secondary has-text-centered">My Cart</h1><br>
        <div class="columns">
            <div class="column"></div>
            <div class="column is-three-quarters">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th><abbr title="ID">#</abbr></th>
                            <th>Product</th>
                            <th style="text-align: center">Quantity</th>
                            <th>Price/item</th>
                            <th>Total Price</th>
                            <th style="text-align: center">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Hat</td>
                            <th>
                                <div class="columns">
                                    <div class="column is-4">
                                        <a class="button is-warning is-small">
                                            <i class="fas fa-minus"></i>
                                        </a>
                                    </div>
                                    <div class="column is-4">
                                        2
                                    </div>
                                    <div class="column is-4">
                                        <a class="button is-success is-small">
                                            <i class="fas fa-plus"></i>
                                        </a>
                                    </div>
                                </div>
                            </th>
                            <th>Rp 10.000</th>
                            <th>Rp 20.000</th>
                            <th style="text-align: center">
                                <a class="button is-danger is-small">
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="column"></div>
        </div>
        <div class="columns">
            <div class="column"></div>
            <div class="column is-three-quarters">
                <div style="text-align: right" class="column is-4 is-offset-8">
                    <router-link to='/cart' class="button is-link">
                        <i class="fas fa-money-check"></i>
                        <p class="has-text-link">...</p>
                        Pay Now
                    </router-link>
                </div>
            </div>
            <div class="column"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Cart'
}
</script>

<style scoped>
    div.column.is-4 {
        text-align: center;
    }
</style>
