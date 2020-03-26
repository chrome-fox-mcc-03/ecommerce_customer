<template>
    <div id="loading">
        <lottie-player
            src="https://assets5.lottiefiles.com/datafiles/cb81834f3b75c3d2aba9d8a58ad1f408/AE_JSON/loader1.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay >
        </lottie-player>
    </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style>
#loading {
    height: 100%;
    width: 100%;
    display:flex;
    position: absolute;
    justify-content: center;
    align-items: center;
}
</style>
