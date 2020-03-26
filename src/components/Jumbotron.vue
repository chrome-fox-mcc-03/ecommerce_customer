<template>
  <div id="jumbotron-container" class="jumbotron">
    <div id="jumbotron-text-container">
      <h1 id="jumbotron-text-head">Winter is Coming!</h1>
      <p id="jumbotron-text">Perpare yourself with our newest winter collection</p>
      <a id="see-now-button" href="#">SEE</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Jumbotron'
}
</script>

<style>

.jumbotron {
  background-image: url("https://papers.co/wallpaper/papers.co-hr46-girl-kpop-cold-winter-smile-29-wallpaper.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-weight: bolder;
}

.lead {
  background-color: transparent;
}

#jumbotron-text-head {
  font-size: 6vh;
  background-color: transparent;
  color: white;
}

#jumbotron-text {
  background-color: transparent;
  font-size: 3vh;
}

#see-now-button {
  text-decoration: none;
  font-weight: bolder;
  cursor: pointer;
  background-color: #4000ff;
  padding: 0.5vh 1.5vh 0.5vh 1.5vh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s ease-in-out;
  height: 4vh;
  border-radius: 2vh;
  width: 5vw;
  font-size: 1.8vh;
}

#see-now-button:hover {
  background-color: black;
}

#jumbotron-text-container {
  width: 30vw;
  margin-left: 5vw;
  padding: 5vh;
  background-color: #ee6f44;
  border-radius: 3vh 3vh 0 0;
}

#jumbotron-container {
  padding: 0;
}
</style>
