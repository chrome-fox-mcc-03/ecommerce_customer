<template>
  <div id="carts" class="container">
    <div class="row">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s6"><router-link to="/carts" class="teal-text">Carts</router-link></li>
          <li class="tab col s6"><router-link to="/carts/history" class="teal-text">Order history</router-link></li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import M from 'materialize-css'
export default {
  name: 'Carts',
  mounted () {
    M.AutoInit()
  }
}
</script>

<style>
  #carts {
    padding-top: 3vh;
  }
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
