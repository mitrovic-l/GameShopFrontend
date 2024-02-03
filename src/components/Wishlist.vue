<template>
    <div>
      
      <div v-if="token">
        <br>
        <h2><b>Your wishlist</b></h2>
        <br>
        <h3>Games</h3>
        <b-card v-for="game in currWishlist" :title=game.title :key="game.id+Math.random()">
          <b-card-text>
            Price: {{ game.price }}$
          </b-card-text>
          <b-card-text class="ms-auto">
            <b-button v-if="game" pill class="ms-auto" id="refBtn" variant="outline-danger" @click="removeG(game)" >Remove</b-button>
          </b-card-text>
        </b-card>
      </div>
      <p v-else>You must be signed in to view your wishlist.</p>
    </div>
  </template>
  
  <script>
  
    import { mapActions, mapState } from 'vuex';
  
    export default {
      name: 'Wishlist',
  
      props: {
        wishlist: []
      },
  
      data() {
        return {
          wl: []
        }
      },
  
      computed: {
        ...mapState([
          'token',
          'currWishlist'
        ]),
      },
  
      methods: {
        ...mapActions([
          'getToken',
          'removeGameFromWL'
        ]),
        removeG(game){
            let payload = this.token.split('.')[1];
            let user = JSON.parse(atob(payload));
            //this.removeFromWishlist(game, user);
            const obj = {
              game: game,
              user: user
            }
            this.removeGameFromWL(obj);
        }
      }
    }
  
  </script>
  
  <style scoped>
    .card {
      margin-top: 10px;
      text-align: left;
    }
  
    .card-title {
      margin-bottom: 0px;
    }
  
    .card-body {
      padding-bottom: 5px;
    }
    #refBtn{
        right: auto;
    }
  </style>