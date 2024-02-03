<template>
  <div id="app">
    <div class="hello mr-auto" id="navBar">
    <b-navbar type="dark" variant="dark">
    <b-navbar-nav class="ml-auto">
      <b-navbar-brand id="shopBrand">
        GameShop
      </b-navbar-brand>
      <b-nav-item to="/">Home</b-nav-item>

      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown text="Games">
              <b-dropdown-item
                v-for="game in games"
                :key=game.id+Math.random()
                :to="`/games/${game.id}`">
                {{ game.title }} ({{ game.price }}$)
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Publishers">
              <b-dropdown-item
                v-for="pub in publishers"
                :key="pub.id"
                :to="`/publishers/${pub.id}`">
                {{ pub.name }}
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Categories" id="catNav">
              <b-dropdown-item
                v-for="category in categories"
                :key="category.id"
                :to="`/categories/${category.id}`">
                {{ category.type }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <input v-model="searchQuery" type="text" placeholder="Search" @keydown.enter="search" />
          </b-navbar-nav>
    <b-navbar-nav class="ms-auto">
       <b-nav-item id="navHeart" v-if="token" to="/wishlist">
        <b-icon icon="bookmark-heart" id="heartIcon"></b-icon>
      </b-nav-item>
      <b-nav-item id="navCart" v-if="token" to="/cart">
        <b-icon icon="cart3" id="cartIcon"></b-icon>
      </b-nav-item>
      <b-nav-item id="navRec" v-if="token" to="/receipts">
        <b-icon icon="receipt" id="recIcon"></b-icon>
      </b-nav-item>
        <b-nav-item v-if="!token" to="/register" id="regBtn">Register</b-nav-item>
        <b-nav-item v-if="!token" to="/login" id="loginBtn">Log In</b-nav-item>
        <b-nav-item v-else @click="logout()" id="logoutBtn" to="/">Log Out</b-nav-item>
            
            
    </b-navbar-nav>
  </b-navbar>
  </div>
  <div id="str">
  <router-view class="stranica" />
  </div>
  <div id="footer">
    <app-footer></app-footer>
  </div>
  </div>
</template>

<script>
//dodati da ako je ulogovan moze u navbaru da vidi i wishlist, cart, users(mozda)
  import { mapActions, mapState, mapMutations } from 'vuex';
  import Vuesax from 'vuesax'
  import Footer from '@/components/Footer.vue';
export default {
  name: "App",
  components: {
    'app-footer': Footer
  },
  computed: {
    ...mapState([
      'games',
      'publishers',
      'categories',
      'users',
      'reviews',
      'token'
    ])
  },
  mounted(){
    this.fetchGames();
    this.fetchPublishers();
    this.fetchCategories();
    if (localStorage.token){
      this.setToken(localStorage.token);
      
    }
  },
  methods: {
    logout() {
        this.removeToken();
      },
      ...mapMutations([
        'removeToken',
        'setToken'
      ]),
      ...mapActions([
        'fetchPublishers',
        'fetchCategories',
        'fetchReviews',
        'fetchGames',
        'search'
      ]),
      search(e) {
       // e.preventDefault();

        const sq = this.searchQuery;
        this.searchQuery = '';
        console.log("Search query: "+ sq);
        //this.search(sq);
        this.$router.push({name: 'Search', query: {q: sq}});
       // this.$router.push({ name: 'Search', query: { q: sq } });
      },
  },
  data() {
    return{
      searchQuery: ''
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  justify-content: space-between;
}

#str{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#footer{
  bottom: 0;
  left: 0;
  margin-top: auto;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

#log {
  margin-left: 512px;
  padding-left: 12px;
  padding-right: 10px;
}
#regbtn {
  padding-left: 12px;
  padding-right: 10px;
}
#logbtn {
  padding-left: 12px;
  padding-right: 10px;
}
#navform{
  align-items: stretch;
}
#logoutBtn:hover{
  background-color: #c13131;
}
#regBtn:hover{
  background-color: #42b983;
}
#loginBtn:hover{
  background-color: #42b983;
}
#loginBtn{
  margin-left: 6px;
  margin-right: 16px;
}
#navBar{
  position: static;
}
#searchBtn{
  padding-left: auto;
  margin-left: 8px;
  height: 31px;
  margin-right: 12px;
}
#searchQ{
  margin-left: 12px;
}
#shopBrand{
  margin-left: 12px;
  color: #17d47f;
}
#cartIcon{
  color: #42b983;
}
#heartIcon{
  color: #e84a5f;
}
#navHeart{
  margin-left: 16px;
}
#navCart{
  margin-left: 10px;
  margin-right: 12px;
}
#navRec{
  margin-right: 24px;
}
input {
  display: block;
  width: 240px;
  height: 36px;
  margin: 20px auto;
  padding: 10px 45px;
  background: #ebebed url("../public/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
#catNav{
  margin-right: 20px;
}

</style>
