<template>
  <div id="jumbotron" class="row">
    <div class="col s12">
      <h1>Welcome To Vood App</h1>
      <h5>Your dialy food online shop</h5>
      <button class="waves-effect waves-light btn-large">Order Our Food Now!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Jumbotron'
}
</script>

<style scoped>
  #jumbotron {
    background: url('../assets/—Pngtree—cartoon black food poster background_1035986.jpg');
    height: 50vh;
    color: #e0dbd1;
  }
  #jumbotron div {
    padding-top: 5vh;
  }
  #jumbotron button {
    margin: 5vh 0;
    width: 20vw;
  }
</style>
