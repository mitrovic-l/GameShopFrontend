<template>
    <div>
      <h4>Your cart: </h4>
      <div id="cartDiv" v-if="token">
        <h3>Cart</h3>
        <b-card v-for="item in currCart.games" :title=item.title :key="item.id+Math.random()">
          <b-card-text>
            Price: {{ item.price }}$
            Info: {{ item.info }}
            Id: {{ item.id }}
          </b-card-text>
          <b-card-text class="ms-auto">
            <b-button v-if="item" pill class="ms-auto" id="refBtn" variant="danger" @click="removeFromCart(item, cart)" >Remove</b-button>
          </b-card-text>
        </b-card>
        <div id="totalDiv">
          <br>
         <b> Total: {{ calcTotal(currCart.games).toString() }}  </b>
        </div>
        <br>
        <hr>
        <div id="payDiv">
          <b-button pill class="ms-auto" id="payBtn" variant="success" @click="createReceipt(currCart)"> Checkout </b-button>
        </div>
        <!--<h5>Total: {{ calcTotal(cart.games).toString() }}$</h5>-->
      </div>
      <p v-else>You must be signed in to view your cart.</p>
    </div>
  </template>
  
  <script>
  
    import { mapActions, mapState } from 'vuex';
  
    export default {
      name: 'Cart',
  
      props: {
        cart: Object
      },
  
      data() {
        return {
          cc: null
        }
      },
  
      computed: {
        ...mapState([
          'token',
          'currCart'
        ]),
      },
  
      methods: {
        ...mapActions([
          'getToken',
          'getCart',
          'removeGameFromCart',
          'addReceipt'
        ]),
        calcTotal(games){
          let total = 0;
          games.forEach(gInCart => {
            total += gInCart.price;
          });
          return total.toFixed(2);
        },
        removeFromCart(game, thiscart){
          console.log(JSON.stringify(game) + " removed");
          let token = localStorage.token;
          let payload = token.split('.')[1];
          let user = JSON.parse(atob(payload))
          const obj = {
            game: game,
            cart: thiscart,
            user: user
          }
          this.removeGameFromCart(obj);
          let c;
          this.getCart(user).then( res => {
            c = res;
            console.log("RES "+JSON.stringify(res));
            document.getElementById('totalDiv').innerHTML = '';
            let t = (res.to_pay - game.price).toFixed(2);
            if (t <= 0) t = 0;
            document.getElementById('totalDiv').innerHTML+=`
           <b> Total: ${(res.to_pay - game.price).toFixed(2).toString()} </b>
            `;
          });
          this.$forceUpdate();

          //namesteno trenutno da radi sa reload-om,
          //TODO: namestiti da radi i bez reload-a
          //location.reload();
        },
        createReceipt(cart){
          let token = localStorage.token;
          let payload = token.split('.')[1];
          let user = JSON.parse(atob(payload));
          const rcpInfo = {
            cart: cart,
            user: user
          }
          console.log("pozivam addrcp iz view-a");
          this.addReceipt(rcpInfo);
          this.$router.push({name: 'Receipts'});
        }
      },
      mounted(){
        
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
    #payDiv{
      margin-top: 120px;
    }
    #payBtn{
      float: right;
      margin-right: 32px;
      width: 128px;
    }
  </style>