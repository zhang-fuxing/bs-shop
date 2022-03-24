<template>
    <div class="home">
        <!-- 顶部导航 -->
        <Header></Header>
        <!-- 同步搜索框 -->
        <HeaderSearch></HeaderSearch>
        <!-- 分类导航 -->
        <Nav></Nav>

        <div class="row">
            <router-view></router-view>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HeaderSearch from "@/components/HeaderSearch.vue";
import Nav from "@/components/Nav.vue";
import {useStore} from 'vuex'
import {reactive, inject, onMounted, provide, ref} from "vue";
import send from "@/http/index.js";
import Footer from "@/components/Footer";
export default {
    components: {
        Header,
        HeaderSearch,
        Nav,
        Footer
    },
    setup() {

        const store = useStore()

        return {}
    },
};
</script>

<style scoped>
/*.header{*/
/*    position: fixed;*/
/*    top: 11%;*/
/*    width: 100%;*/
/*    z-index: 999;*/
/*}*/
</style>