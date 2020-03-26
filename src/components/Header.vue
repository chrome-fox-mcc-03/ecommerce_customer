<template>
  <div id="header">
    <h2>Sweat<span>Al</span>er<span>t</span>.Inc</h2>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
  * {
    margin : 0;
  }
  #header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    background-color: black;
    height: 10vh;
    /* position: fixed; */
  }
  #header h2 {
    font-size: 30px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    text-align: right;
    margin-bottom: 0px;
    margin-top: 20px;
    margin-right: 20px;
    letter-spacing: -2px;
  }

   #header span {
     font-size: 25px;
     color: coral;
   }

</style>
