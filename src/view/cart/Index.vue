<template>
    <div class="cart-page">
        <Header></Header>
        <div class="content">
            <h1>cart {{id}}</h1>
        </div>

        <dviv class="footer">
            <Footer></Footer>
        </dviv>
    </div>

</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useRoute} from "vue-router";
import {ref} from "vue";
export default {
    components: {
        Header,
        Footer
    },

    setup() {
        const route = useRoute();
        let id = ref(route.params.id)
        return {
            id,
        }

    }
}
</script>

<style scoped>
.cart-page {
    background-color: #ffffff;
    background-image: linear-gradient(to right, #ffffff, #719dc9);
    position: fixed;
    width: 70%;
    height: 100%;
    overflow: auto;
}

.content {
    height: 80%;
    overflow: auto;
}

.footer {
    height: 10%;
}

</style>