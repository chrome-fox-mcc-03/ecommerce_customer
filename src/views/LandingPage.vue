<template>
  <div class="container-fluid d-flex px-0 mx-0 row" id="landing-page">
    <div class="col-8 px-0" id="left-side">
      <div id="left-base">
        <div
          id="left-masking"
          class="d-flex flex-column justify-content-center"
        >
          <h1>TCG E-commerce</h1>
          <h4>Your one stop destination for buying all things card games</h4>
          <p>
            Join one of the most helpful web app for your hobbies. Enjoy these
            awesome features:
          </p>
          <div class="text-left px-5 mx-5" >
            <ul>
              <li>
                Tired of incomplete data? Our CMS storage is already directly
                connected with Scryfall API, one of the best database for every
                kinds of cardgames
              </li>
              <li>
                Can't keep track of your budget? We will give you up-to-date
                price so that you spend your money wisely
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-4 d-flex flex-column justify-content-center"
      id="right-side"
    >
      <h2>Welcome Back Cardgame players!</h2>
      <div>
        <img
          src="../assets/playcard.png"
          alt="landing-image"
          class="img-fluid"
        />
      </div>
      <div v-if="isLoading">
        <Loading></Loading>
      </div>
      <div v-else>
        <LandingLogin
          @switch-toggle="switchToggle"
          v-if="toggle"
        ></LandingLogin>
        <LandingRegister @switch-toggle="switchToggle" v-else></LandingRegister>
      </div>
    </div>
  </div>
</template>

<script>
import LandingLogin from "../components/LandingLogin";
import LandingRegister from "../components/LandingRegister";
import Loading from "../components/Loading";

export default {
  name: "LandingPage",
  data() {
    return {
      toggle: true
    };
  },
  components: {
    LandingLogin,
    LandingRegister,
    Loading
  },
  methods: {
    switchToggle() {
      this.toggle = !this.toggle;
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>

<style scoped>
#landing-page {
  height: 100vh;
}

#right-side {
  background-color: white;
}

#left-side {
  height: 100%;
  width: 100%;
}

#left-base {
  background-image: url("https://media.magic.wizards.com/images/featured/EN_WorldMagicCupQualifier_Header_0.jpg");
  height: 100%;
}

#left-masking {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  color: white;
}
</style>
