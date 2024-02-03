<template>
    <div v-if="receipts" id="rcptDiv">
       <Receipts :receipts="receipts"/>
    </div>
    <div v-else></div>

</template>

<script>
    import Receipts from '@/components/Receipts.vue';
    import { mapActions, mapState } from 'vuex';

    export default{
        name: 'ReceiptsView',
        data() {
            return {
                receipts: []
            }
        },
        methods: {
            ...mapActions([
                'getReceipts'
            ])
        },
        mounted() {
            let token = localStorage.token;
            let payload = token.split(".")[1];
            let user = JSON.parse(atob(payload));
            this.getReceipts(user).then( res => {
                this.receipts = res;
            });
        },
        components: { Receipts }
    }
</script>

<style scoped>

</style>