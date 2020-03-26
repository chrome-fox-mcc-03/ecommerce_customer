<template>
    <b-modal id="profileModal" :title="title" class="card">
    <!-- <div class="card"> -->
        <img src="https://www.w3schools.com/w3images/team2.jpg" alt="John" style="width:100%" class="shadow">
        <h1>user@mail.com</h1>
        <div style="margin: 24px 0;">
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-linkedin"></i></a>
            <a href="#"><i class="fa fa-facebook"></i></a>
        </div>
    <!-- </div> -->
    </b-modal>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProfileCard',
  props: {
    title: String
  },
  computed: {
    ...mapState(['profile'])
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
</style>
