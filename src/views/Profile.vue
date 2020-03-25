<template>
  <div class="profile uk-column-1-2">
    <div class="profile-navigation">
      <router-link class="uk-button uk-button-primary" :to="'/profile'">Cart</router-link>
      <router-link class="uk-button uk-button-primary" :to="'/history'">History</router-link>
    </div>
    <div class="profile-display">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
.profile {
  display: flex;
  justify-content: center;
  height: 85vh;
  width: 80vw;
  margin: auto;
}

.profile-navigation {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.uk-button-primary{
  background-color: #2a363b;
  margin: 5px;
  border-radius: 10px;
}

.profile-display {
  background-color: blue;
  width: 60vw;
}

</style>
