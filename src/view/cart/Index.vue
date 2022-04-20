<template>
    <div class="cart-page">
        <el-affix :offset="1">
            <Header></Header>
            <Nav2></Nav2>
        </el-affix>

        <div class="content">
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
            <h1>cart {{ id }}</h1>
        </div>

        <dviv class="footer">
            <Footer></Footer>
        </dviv>
    </div>

</template>

<script setup>
import Nav2 from "@/components/Nav2.vue"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute();
let id = ref(route.params.id)


</script>

<style scoped>
.cart-page {
    background-color: #ffffff;
    background-image: linear-gradient(to right, #ffffff, #719dc9);
    position: fixed;
    width: 90%;
    height: 100%;
    overflow: auto;

}


</style>