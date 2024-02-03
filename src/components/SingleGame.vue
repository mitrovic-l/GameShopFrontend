<template>
    <div>
      <div class="game">
        <h3>Game details</h3>       
        <ul>
          <li>Publisher: {{ game.publisherName }}</li>

          <li>Title: <b>{{ game.title }}</b></li>
          <li>Price {{ game.price }}$</li>
          <li>Release year: {{ game.year }}</li>
          <li>Info: {{ game.info }}</li>

          <li>Game category: {{ game.categoryType }}</li>
          <li>Reviews: {{ game.numberOfReviews }}</li>
          <li><b>Average user rating: {{ checkOverall(game.overall) }}</b></li>
        </ul>
        <b-button class="buttons" id="cartBtn" variant="success" @click="addToCart(game, game.price)">Add to cart</b-button>
        <b-button class="buttons" id="wlBtn" variant="outline-secondary" @click="addToWL(game)" >Add to wishlist</b-button>
        <b-button class="buttons" id="backBtn" variant="outline-info" to="/">Go Home</b-button>
        <hr>
        <div>
            <h5>Other info: </h5>
            Other games from this publisher:  <b-button pill :to="`/publishers/${game.publisher_game}`" variant="outline-secondary">{{ game.publisherName }}</b-button>
            <br>
            <br>
            Games from this category: <b-button pill :to="`/categories/${game.category_game}`" variant="outline-secondary">{{ game.categoryType }}</b-button>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
  //to be finished 
  import { mapActions, mapState } from 'vuex';
    export default {
      name: 'SingleGame',
      props: {
        game: Object
      },
      data(){
        return{
          cart: null,
          currGame: null,
          cartID: null
        }
      },
      computed: {
        ...mapState([
          'token',
          'gamesInCart'
        ])
      },
      methods: {
        ...mapActions([
          'getCart',
          'addGameToCart',
          'getCartID',
          'setCartID',
          'addGamesInCart',
          'addGameToWL'
        ]),
        checkOverall(overall){
            if (overall == 0){
                return 'No user reviews.'
            } else return overall;
        },

        addToCart(game, gPrice){
          //console.log(JSON.stringify(this.cart));
          let token = localStorage.token;
          if (token === ''){
            console.log("not signed in.");
            alert(`You need to be signed in to add ${game.title} to your wishlist.`)
            return;
          }
          let payload = token.split('.')[1];
          let user = JSON.parse(atob(payload));
          const obj = {
            game: game,
            cart: this.cart,
            user: user
          };
          console.log("Ispisujem obj: "+JSON.stringify(obj));
          //posalji ga u f-ju kao obj
          this.addGameToCart(obj);
          return;
        },
        addToWL(game){
          let token = localStorage.token;
          let payload = token.split('.')[1];
          let user = JSON.parse(atob(payload));
          game['reviews'] = []
          const obj = {
            game: game,
            user: user
          }
          this.addGameToWL(obj);
          console.log(JSON.stringify(obj));
          return;
        }
      },
      mounted() {
        let token = localStorage.token;
        if (token === ''){
            console.log("not signed in.");
            document.getElementById('cartBtn').disabled = true;
            document.getElementById('wlBtn').disabled = true;
            //alert(`You need to be signed in to add ${game.title} to cart.`)
            return;
          }
        let payload = token.split('.')[1];
        let user = JSON.parse(atob(payload));
        console.log("usersId: "+user.usersId);
        this.getCart(user).then( res => {
        //  console.log("res: "+ JSON.stringify(res));
          this.cart = res;
         // console.log("CART: "+JSON.stringify(this.cart));
        });
      }
    }
  
  </script>
  
  <style scoped>
    .game {
      border-bottom-style: solid;
      margin-bottom: 10px;
      padding: 36px;
    }
    .game.buttons{
        margin: 36px;
        padding: 36px;
    }
    .buttons{
        padding: 12px;
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 24px;
        margin-bottom: 16px;
    }

   
  </style>