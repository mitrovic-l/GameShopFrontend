<template>
    <div>
      <h4>List of games from {{ publisher.name }}</h4>
  
      <div v-if="token">
        <b-card v-for="game in publisher.games" :title=game.title :key="game.id+Math.random()">
          <b-card-text>
            Price: {{ game.price }}$
            Info: {{ game.info }}
            Year released: {{ game.year.toString() }}
          </b-card-text>
          <b-card-text class="ms-auto">
            <b-button v-if="game" :to="`/games/${game.id}`" pill class="ms-auto" id="refBtn" variant="outline-success">View details</b-button>
          </b-card-text>
         
        </b-card>
      </div>
      <p v-else>You must be signed in to view games from this publisher.</p>
    </div>
  </template>
  
  <script>
  
    import { mapActions, mapState } from 'vuex';
  
    export default {
      name: 'Reviews',
  
      props: {
        publisher: Object
      },
  
      data() {
        return {
          
        }
      },
  
      computed: {
        ...mapState([
          'token'
        ]),
      },
  
      methods: {
        ...mapActions([
          'getToken'
        ]),
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