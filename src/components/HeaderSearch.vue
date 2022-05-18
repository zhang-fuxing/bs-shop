<template>
  <div class="row header-search">
    <div class="col-md-3">
      <i>I-SHOP</i>
    </div>

    <div class="col-md-6">
      <div class="input-group">
        <input type="text" class="form-control" v-model="searchText" placeholder="搜索商品..." />
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" @click="searchProduct">搜索</button>
        </span>
      </div>
    </div>

    <div class="col-md-2">
        <el-button type="primary" color="red" @click="toCart">
            <el-icon size="30px">
                <shopping-cart/>
            </el-icon>
            <span>购物车</span>
        </el-button>
    </div>
  </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {inject, ref} from "vue";
import {ShoppingCart} from "@element-plus/icons-vue";
import store from "@/store";
import {ElMessage} from "element-plus";
import send from "@/http";
import {cartList, search} from "@/api";

const router = useRouter()
const searchText = ref('')
const toCart = () => {
    if (store.state.token === null) {
        ElMessage.error("未登录，请先登录")
        return
    }
    send.post(cartList).then(resp=>{
        router.push('/cart')
    })
}

const searchProduct = () => {
    send.post(search+searchText.value).then(resp => {
        if (store.state.productSet.length !== 0) {
            store.state.productSet.length = 0;
        }
        if (resp.code === 0 && resp.content !== null) {
            for (let i = 0; i < resp.content.length; i++) {
                store.state.productSet.push(resp.content[i])
            }
        }
    })
}
</script>
<style scoped>
.header-search {
    margin: 10px 0 10px 0;
    padding: 0;
}
img {
    width: 70px;
    height: 40px;
}
span {
    margin-top: 0;
    margin-left: 2px;
}
.col-md-6 {
    margin-top: 10px;
}
.carts {
    margin-left: 15px;
    text-align: center;
    color: #e16c96;
}
.cart {
    width: 100px;
}
.cart:hover {
    cursor: pointer;
}

</style>