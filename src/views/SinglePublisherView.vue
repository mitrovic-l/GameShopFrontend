<template>
    <div v-if="publisher" id="pub">
      <SinglePublisher :publisher="publisher"/>
    </div>
  </template>
  
  <script>
  import Footer from '../components/Footer.vue';

    import SinglePublisher from '@/components/SinglePublisher.vue';
    import { mapActions } from 'vuex';
  
    export default {
      name: 'SinglePublisherView',
  
      components: {
        SinglePublisher,
        Footer
      },
  
      data() {
        return {
          publisher: null
        }
      },
      
      methods: {
        ...mapActions([
          'getPublisher'
        ])
      },
  
      mounted() {
        this.getPublisher(this.$route.params.id).then( res => {
            this.publisher = res;
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