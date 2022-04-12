<template>
    <div>
        <ul class="inav">
            <li>
                <router-link to="/index" class="nav-item">| 商城首页 |</router-link>
            </li>

            <li v-show="token.length === 0">
                <router-link to="/login" class="nav-item"> 去登陆 |</router-link>
            </li>
            <li v-show="token.length !==0 ">
                <router-link to="/center/home" class="nav-item"> 个人中心 |</router-link>
            </li>

            <li>
                <router-link to="/reg" class="nav-item"> 注册账号 |</router-link>
            </li>
            <li>
                <router-link to="/..." class="nav-item"> ... |</router-link>
            </li>
            <li><a @click="show">111</a></li>
        </ul>
        <hr/>
    </div>
</template>
<script>
import store from "@/store";
import {computed, inject, provide, reactive} from "vue";

export default {
    setup() {

        let token = computed(() => store.getters.getToken)
        const test1 = inject('test1')
        const show = () => {
            console.log(test1.name)
            console.log(test1.ors)
        }
        return {
            token,
            test1,
            show,
        }
    }
}
</script>
<style scoped>
hr {
    margin: 0 0 5px 0;
    padding: 0;
    border: 1px;
}

ul {
    list-style: none;
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
    color: rgba(46, 45, 54, 0.514);
}
</style>