<template>
    <div class="cart-page">
        <Header></Header>
        <el-row>
            <el-col :span="8">
                <h2>I-SHOP</h2>
            </el-col>
            <el-col :span="8">
                <el-input v-model="str"  placeholder="......" clearable />
            </el-col>
            <el-col :span="8">
                <el-button type="primary" plain>搜索</el-button>
            </el-col>
        </el-row>



        <!--cart content-->
        <CartContent :uid="uid"></CartContent>
        <!--cart content-->


        <dviv class="footer">
            <Footer></Footer>
        </dviv>
    </div>
</template>

<script setup>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import CartContent from "@/view/cart/CartContent.vue"
import store from "@/store";

const route = useRoute();
let id = ref(route.params.id)
let str = ref("")
let uid = ref(1)

onMounted(()=>{
    if (store.state.uid !== null) {
        uid = store.getters.getUid
    }
})
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

nav {
    background-color: #1f2f3d;
}

nav > ul > li:first-child {
    margin-left: 20px;
}
</style>