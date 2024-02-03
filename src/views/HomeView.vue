<template>
  <div id="app">
    <div id="forimg">
      <img
      src="../../public/gameshop2.png"
      fluid
      alt="GameSHOP Logo"
    />
    </div>
    <br>
    <h3 id="headerGS">
      <b>
        <b>GameSHOP</b>
      </b>
    </h3>
    <div id="textGS">
      <p>
      Browse for games, publishers as well as game categories.
      <br>
      Buy games or add them to your cart and we will notify you when the price changes!
      <br>
      Already own a game? Feel free to leave a review.
      <br>
      Can't find a game you're looking for? Send us an email at administration@gameshop.rs and we will send you an email when that game is available.
    </p>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '../components/Footer.vue';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Homeview',
  components: {
    Footer
  },
  methods: {
    ...mapState([
      'setToken'
    ])
  },
  mounted(){
    this.setToken(localStorage.token);
    console.log("u view-u: "+ localStorage.token);
  }
}
//console.log("ispisujem");
//console.log(localStorage.token);
</script>

<style>
img{
  border-bottom: 20px solid #000
}
#forimg{
  margin: 0%;
  margin-bottom: 0px;
  background-color: #040b12;
}
#app{
  background-color: #ebebed;
}
#headerGS{
  color: #2c3e50;
}
#textGS{
  color: #040b12;
}
</style>