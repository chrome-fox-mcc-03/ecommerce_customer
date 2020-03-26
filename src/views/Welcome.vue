<template>
  <div class="row d-flex justify-content-center align-items-center">
    <div class="col-md-6">
      <img src="../assets/logo-pharmacy.png" alt="logo" style="width: 100%">
    </div>
    <div class="col-md-6">
      <div class="form">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.row {
  height: 100%;
}

.form {
  background-color: #ffd3b6;
  border-radius: 10px;
  padding: 25px;
  text-align: left;
}
</style>
