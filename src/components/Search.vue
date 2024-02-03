<template>
    <div>
        <br>
      <h4 id="searchH" >Search found: {{ searchResults.length }} games</h4>
  
      <div v-if="token">
        <b-card v-for="game in searchResults" :title=game.title :key="game.id+Math.random()">
          <b-card-text>
            Price: {{ game.price }}$
            Year released: {{ game.year.toString() }}
          </b-card-text>
          <b-card-text class="ms-auto">
            <b-button v-if="game" :to="`/games/${game.id}`" pill class="ms-auto" id="refBtn" variant="outline-success">View details</b-button>
          </b-card-text>
         
        </b-card>
      </div>
      <p v-else>You must be signed in to search for games.</p>
    </div>
  </template>
  
  <script>
  
    import { mapActions, mapState } from 'vuex';
  
    export default {
      name: 'Search',
  
      props: {
        
      },
  
      data() {
        return {
          
        }
      },
  
      computed: {
        ...mapState([
          'token',
          'searchResults'
        ]),
      },
  
      methods: {
        ...mapActions([
          'getToken'
        ]),
        numOfResults(){
            return searchResults.length;
        }
      },
      mounted() {
        
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