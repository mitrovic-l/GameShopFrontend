<template>
    <div v-if="wishlist" id="wldiv">
        <Wishlist :wishlist="wishlist"/>
    </div>
    <div v-else>
        <h5>Empty wishlist</h5>
    </div>
</template>

<script>

    import Wishlist from '@/components/Wishlist.vue';
    import { mapActions } from 'vuex';

    export default{
    name: "WishlistView",
    data() {
        return {
            wishlist: []
        }
    },
    methods: {
        ...mapActions([
            "getWishlist"
        ])
    },
    mounted() {
        let token = localStorage.token;
        let payload = token.split(".")[1];
        let user = JSON.parse(atob(payload));
        this.getWishlist(user).then(res => {
            this.wishlist = res;
            console.log(JSON.stringify(res));
        });
    },
    components: { Wishlist }
}

</script>

<style scoped>

</style>