<template>
    <div id="app">
        <Search  :search="search" />
    </div>
</template>

<script>
    import Search from '../components/Search.vue'
    import { mapActions, mapState } from 'vuex';
    export default {
      name: 'SearchView',
  
      components: {
        Search
      },
  
      data() {
        return {
          s: []
        }
      },
      
      methods: {
        ...mapActions([
          'search'
        ])
      },
  
      mounted() {
        this.search(this.$route.query.q).then( res => {
            this.s = res;
        });
      }
    }

</script>

<style>

</style>