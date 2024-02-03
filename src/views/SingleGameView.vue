<template>
    <div v-if="game">
      <SingleGame :game="game"/>
      <Reviews :game="game"/>
    </div>
  </template>
  
  <script>
    import SingleGame from '@/components/SingleGame.vue';
    import Reviews from '@/components/Reviews.vue';
    import { mapActions, mapState } from 'vuex';
  
    export default {
      name: 'SingleGameView',
  
      components: {
        SingleGame,
        Reviews
      },
  
      data() {
        return {
          game: null,
          gameR: null,
        }
      },
      computed: {
        ...mapState([
          'games'
        ])
      },
      
      methods: {
        ...mapActions([
          'getGame'
        ])
      },
  
      mounted() {
        console.log("poziva se mounted.");
        this.getGame(this.$route.params.id).then( res => {
           this.game = res;
        });
       // this.game = this.games;
       for (let i=0;i<this.games.length;i++){
        if (this.games[i].id == this.$route.params.id){
          this.gameR = this.games[i];
          //console.log("naso game u mounted-----------------");
        }
       }
       
      },
      created(){
        console.log("poziva se created.");
        this.getGame(this.$route.params.id).then( res => {
           this.game = res;
        });
      }
    }
  
  </script>