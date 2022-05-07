<template>
    <div class="home">
       <div id="header">
           <!-- 顶部导航 -->
           <Header></Header>
           <!-- 同步搜索框 -->
           <HeaderSearch></HeaderSearch>
           <!-- 分类导航 -->
           <Nav></Nav>
       </div>

        <div id="content">
            <router-view></router-view>
        </div>

        <div style="clear: left"></div>
       <div id="footer">
           <Footer></Footer>
       </div>
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
import store from "@/store";
export default {
    components: {
        Header,
        HeaderSearch,
        Nav,
        Footer
    },
    setup() {

        const store = useStore()
        const test1 = reactive({
            name:'test1',
            ors:'header.vue'
        })
        provide('test1',test1)
        return {

        }
    },
};
</script>

<style scoped>
.home {
    background-color: #ffffff;
    /*background-image: linear-gradient(to right, #c9a953, #e00a0a);*/
    position: fixed;
    width: 90%;
    height: 100%;
    overflow: auto;
}
</style>