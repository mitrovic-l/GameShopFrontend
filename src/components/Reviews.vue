<template>
    <div>
      <h4>User Reviews</h4>
  
      <div v-if="token">
        <b-form  @submit.stop.prevent @keydown.enter="onSubmit">
        <label for="text">Text</label>
        <b-form-input v-model="text" :state="validationText" id="text"></b-form-input>
        <label for="rating">Rating [1-10]</label>
        <b-form-input v-model="rating" :state="validationRating" id="rating" type="number" min="1" max="10"></b-form-input>
        <b-form-invalid-feedback :state="validationText">
            Text must be between 1 and 512 characters.
        </b-form-invalid-feedback>
        <b-form-invalid-feedback :state="validationRating">
            Rating must be between 1 and 10.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationText && validationRating">
            Looks Good.
        </b-form-valid-feedback>
     </b-form>
  
        <b-card v-for="rev in game.reviews" :title=rev.username :key="rev.id">
          <b-card-text>
            {{ rev.text }} , 
           <b>User rated: {{ rev.rating }}</b> 
          </b-card-text>
        </b-card>
      </div>
      <p v-else>You must be signed in view reviews.</p>
    </div>
  </template>
  
  <script>
  
    import { mapActions, mapState } from 'vuex';
  
    export default {
      name: 'Reviews',
  
      props: {
        game: null
      },
  
      data() {
        return {
          text: '',
          rating: null
        }
      },
  
      computed: {
        ...mapState([
          'token',
          'games'
        ]),
        validationText() {
        return this.text.length > 0 && this.text.length < 512;
      },
        validationRating(){
            return this.rating > 0 && this.rating < 11;
        }

      },
  
      methods: {
        ...mapActions([
          
          'getToken',
          
        ]),
  
        onSubmit() {
            let token = localStorage.token;
            console.log("Izvuko token: " +token);
            let payload = token.split('.')[1];
            let user = JSON.parse(atob(payload));
            console.log("user iz onsubmit "+ JSON.stringify(user));
            this.$socket.emit('review', { text: this.text, rating: this.rating, game_review: this.game.id, user_review: user.usersId, token: this.token });
            this.game['reviews'].push({text: this.text, rating: this.rating, game_review: this.game.id, user_review: user.usersId, username: user.username});
            this.text = '';
            this.rating = null;
            this.$forceUpdate();
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
  </style>