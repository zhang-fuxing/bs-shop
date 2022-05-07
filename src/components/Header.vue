<template>
    <div id="inavbar">
        <ul class="inav">
            <li>
                <el-button type="text" @click="navChange('/index')" class="nav-item">| 商城首页 |</el-button>
            </li>

            <li v-show="token === null">
                <router-link to="/login" class="nav-item">| 去登陆 |</router-link>
            </li>
            <li v-show="token !== null ">
                <router-link to="/center/home" class="nav-item">| 个人中心 |</router-link>
            </li>

            <li>
                <router-link to="/reg" class="nav-item">| 注册账号 |</router-link>
            </li>
            <li>
                <router-link to="/cart" class="nav-item">| 购物车 |</router-link>
            </li>
            <li>
                <router-link to="/..." class="nav-item"> | ... |</router-link>
            </li>
        </ul>
        <hr/>
    </div>
</template>
<script setup>
import store from "@/store";
import {computed, inject, provide, reactive} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const navChange = (to) => {
    // if (to === '/index') {
    //     store.state.currentNav = 0
    // }
    router.push(to)
}

let token = computed(() => store.getters.getToken)
const test1 = inject('test1')
const show = () => {
    console.log(test1.name)
    console.log(test1.ors)
}

</script>
<style scoped>

hr {
    margin: 0;
    padding: 0;
    border: 1px;
}

ul {
    list-style: none;
    background-color: #545c64;
    margin: 0;
    padding: 0;

}

ul li {
    display: inline;
    line-height: 40px;
}

.nav-item {
    font-style: normal;
    font-size: 10px;
    color: white;
}

ul > li {
    margin: 0 10px;
}
</style>