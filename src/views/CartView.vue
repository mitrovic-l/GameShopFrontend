<template>
    <div v-if="cart" id="pub">
        <Cart :cart="cart"/>
    </div>
    <div v-else>
        <h4>Empty cart</h4>
    </div>
  </template>
  
  <script>

    import Cart from '@/components/Cart.vue';
    import { mapActions } from 'vuex';
  
    export default {
      name: 'SinglePublisherView',
  
      components: {
        Cart
      },
  
      data() {
        return {
          cart: null
        }
      },
      
      methods: {
        ...mapActions([
          'getCart'
        ])
      },
  
      mounted() {
        let token = localStorage.token;
        let payload = token.split('.')[1];
        let user = JSON.parse(atob(payload));
        console.log("USER JE: "+localStorage.token);
        this.getCart(user).then( res => {
          this.cart = res;
        });
      },
      computed: {
        
      }
    }
  
  </script>

<style>
#footer{
    bottom: 0;
    left: 0;
    margin-top: auto;
}
#pub{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>