<template>
    <div class="user-center">
        <Header></Header>
        <div class="nav-left">
            <UserNav></UserNav>
        </div>

        <!--具体页面操作-->
        <div class="user-page">
            <div style="font-size: 30px">

                当前位置
                <el-icon>
                    <Location/>
                </el-icon>
                : {{ currentMap }}
            </div>
            <router-view></router-view>
            <!--网页底部-->
            <div style="clear: left"></div>
            <Footer></Footer>
        </div>


    </div>
</template>

<script setup>
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import UserNav from "@/view/users/UserNav";
import Footer from "@/components/Footer";
import {Location} from '@element-plus/icons-vue'
import {reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
let currentMap = ref('用户中心>个人中心')
watch(()=>route.path,newPath => {
    switch (newPath) {
        case '/center/home':
            currentMap.value='用户中心>个人中心';
            break;
        case '/center/address':
            currentMap.value='用户中心>地址管理';
            break;
        case '/center/waitOrder':
            currentMap.value='用户中心>未支付';
            break;
        case '/center/receivedOrder':
            currentMap.value='用户中心 > 已支付';
            break;
        case '/center/accountManage':
            currentMap.value='用户中心>账号管理';
            break;
        case '/center/estimate':
            currentMap.value='用户中心>评价管理';
            break;
    }
})
</script>

<style scoped>
.user-center {
    position: fixed;
    /*overflow: auto;*/
    background-color: #ffffff;
    width: 90%;
    height: 100%;
}

.nav-left {
    float: left;
    margin: 5px 0 0 0;
    padding: 0;
    font-size: 20px;
    background-color: #ffffff;
    height: 100%; /* 全屏高度 */
    /*overflow: auto; !* 如果导航栏选项多，允许滚动 *!*/
}

.user-page {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: auto;
}
</style>