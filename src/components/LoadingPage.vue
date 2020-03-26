<template>
  <div id="loading-page">
    <lottie-player
    src="https://assets9.lottiefiles.com/datafiles/LZyeA614QaESwNk/data.json"  background="transparent"  speed="1"  style="width: 720px; height: 720px;"  loop  autoplay >
</lottie-player>
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style scoped>
#loading-page{
  width: 100%;
  height: 100vh;
  background-color: rgb(242, 242, 242);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
