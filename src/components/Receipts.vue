<template>
    <div>
      <div v-if="token">
        <br>
        <h2><b>Your receipts</b></h2>
        <br>
        <b-card v-for="receipt in currReceipts" :title="receiptInfo(currReceipts.indexOf(receipt)+1)" :key="receipt.id+Math.random()">
          <b-card-text>
            Total: {{ receipt.total }}$
          </b-card-text>
        </b-card>

        <b-button pill id="homeBtn" variant="info" :to="`/`"> Home </b-button>
      </div>
      <p v-else>You must be signed in to view your receipts.</p>
    </div>
  </template>
  
  <script>
  
    import { mapActions, mapState } from 'vuex';
  
    export default {
      name: 'Wishlist',
  
      props: {
        receipts: []
      },
  
      data() {
        return {
         
        }
      },
  
      computed: {
        ...mapState([
          'token',
          'currReceipts'
        ]),
      },
  
      methods: {
        ...mapActions([
          'getToken',
        ]),
        receiptInfo(id){
            return "Receipt "+ id.toString();
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
      padding-bottom: 20px;
    }
    #homeBtn {
      margin-top: 64px;
    }
  </style>