<template>
    <div v-if="category" id="pub">
      <SingleCategory :category="category"/>
    </div>
  </template>
  
  <script>
  import Footer from '../components/Footer.vue';

    import SingleCategory from '@/components/SingleCategory.vue';
    import { mapActions } from 'vuex';
  
    export default {
      name: 'SinglePublisherView',
  
      components: {
        SingleCategory,
        Footer
      },
  
      data() {
        return {
          category: null
        }
      },
      
      methods: {
        ...mapActions([
          'getCategory'
        ])
      },
  
      mounted() {
        this.getCategory(this.$route.params.id).then( res => {
            this.category = res;
            //window.location.reload();
        });
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