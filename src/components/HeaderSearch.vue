<template>
  <div class="row header-search">
    <div class="col-md-3">
      <i>憨批商城</i>
    </div>

    <div class="col-md-6">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="搜索商品..." />
        <span class="input-group-btn">
          <button class="btn btn-default" type="button">搜索</button>
        </span>
      </div>
    </div>

    <div class="col-md-2">
        <div class="cart" @click="toCart">
            <img src="@/assets/cart_icon.jpeg" class="img-circle" alt="">
            <span class="badge">1</span>
            <br/>
            <span class="carts">购物车</span>
        </div>
    </div>
  </div>
</template>
<script>
import {useRouter} from "vue-router";
import {inject} from "vue";

export default {
    setup() {
        const router = useRouter()
        const toCart = () => {
          router.push('/cart')
        }


        return {
            toCart
        }
    }
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