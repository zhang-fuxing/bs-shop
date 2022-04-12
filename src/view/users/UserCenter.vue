<template>
    <div class="user-center">
        <Header></Header>
        <div class="nav-left">
            <UserNav></UserNav>
        </div>

        <!--具体页面操作-->
        <div class="user-page">
            <router-view></router-view>
            <!--网页底部-->
            <div style="clear: left"></div>
            <Footer></Footer>
        </div>


    </div>
</template>

<script>
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import UserNav from "@/view/users/UserNav";
import Footer from "@/components/Footer";

export default {
    name: "UserCenter",
    components: {
        Nav,
        Header,
        UserNav,
        Footer,
    },
    setup() {

        return {}
    }
}
</script>

<style scoped>
.user-center {
    position: fixed;
    /*overflow: auto;*/
    background-color: #ffffff;
    background-image: linear-gradient(to right, #ffffff, #719dc9);
    width: 90%;
    height: 100%;
}

.nav-left {
    float: left;
    margin: 5px 0 0 0;
    padding: 0;
    width: 20%;
    font-size: 20px;
    background-color: #ffffff;
    background-image: linear-gradient(to right, #ffffff, #719dc9);
    height: 100%; /* 全屏高度 */
    /*overflow: auto; !* 如果导航栏选项多，允许滚动 *!*/
}

.user-page {
    margin: 0;
    padding: 0;
    width: 80%;
    height: 90%;
    overflow: auto;
}
</style>