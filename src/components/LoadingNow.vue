<template>
    <div class="loading">
        <lottie-player
            src="https://assets10.lottiefiles.com/datafiles/bNwYPnjv3OdFA5w/data.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay >
        </lottie-player>
        <p style="font-weight:bold" class="loading-text">
            Loading ....
        </p>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.loading{
    position: fixed;
    top: 30vh;
    left: 43vw;
}
.loading-text{
    position: fixed;
    top: 45vh;
    left: 49vw;
}
</style>
