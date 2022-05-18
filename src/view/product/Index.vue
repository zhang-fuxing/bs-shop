<template>

    <!-- 轮播图 -->
    <div class="" id="icarousel">
        <!-- 轮播图 -->
        <div class="col-md-8">
            <!-- 点击轮播 -->
            <el-carousel indicator-position="outside" height="550px">
                <el-carousel-item v-for="item in carouselLists" :key="item">
                    <img :src="item.url" style="object-fit: fill;height: 550px;width: 100%" />
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="col-md-4">
            <div>推荐</div>
            <ul>

                <li v-for="rm in list1.slice(0,7)">
                    <a href="javascript:;" @click="getProductDetail(rm.pid)">
                        <img :src="rm.pimg" alt="0" style="height: 20px;width: 40px">
                    <p>{{ rm.pname }}</p>
                        <hr style="margin: 1px"/>
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <div class="product-card">
        <div class="cut-off-rule"><p style="text-align: center;font-size: 40px">1F 商品推荐</p></div>
        <ProductTable @click="getProductDetail(f1.pid)" v-for="(f1,index) in list1" :key="index">
            <template #image>
                <img class="thumbnail slot-li li-img" :src="f1.pimg" alt="">
            </template>
            <template #pname>
                <div class="slot-li li-name">
                    <p>{{f1.pname}}</p>
                </div>
            </template>
            <template #price>
                <div class="slot-li li-price">￥ {{f1.price}}</div>
            </template>
        </ProductTable>
        <div style="clear: left"></div>


        <div class="cut-off-rule"><p style="text-align: center;font-size: 40px">2F 商品推荐</p></div>
        <ProductTable @click="getProductDetail(f2.pid)" v-for="(f2,index) in list2" :key="index">
            <template #image>
                <img class="thumbnail slot-li li-img" :src="f2.pimg" alt="">
            </template>
            <template #pname>
                <div class="slot-li li-name">
                    <p>{{f2.pname}}</p>
                </div>
            </template>
            <template #price>
                <div class="slot-li li-price">￥ {{f2.price}}</div>
            </template>
        </ProductTable>
    </div>


</template>

<script setup>
import ProductTable from "@/view/product/ProductTable";
import {onMounted, reactive, ref} from "vue";
import $ from "jquery"
import store from "@/store";
import {useRouter} from "vue-router";
import {icarouselList, rmlist} from "@/api";
import send from "@/http";

(()=>{
    $('.carousel').carousel({
        interval: 3000,
        pause: 'hover'
    })
})();


const router = useRouter();
const count = ref(new Array(10))
let list1 = reactive([])
let list2 = reactive([])
const carouselLists = ref([])
// 获取推荐列表
const getRmList = () => {
    send.post(rmlist).then(res=>{
        console.log(res)
        for (let i = 0; i < res.content.length; i++) {
            if(res.content[i].floor === 1) {
                list1.push(res.content[i])
            }
            if(res.content[i].floor === 2) {
                list2.push(res.content[i])
            }
        }
    })

}

onMounted(()=>{
    getRmList();
    send.get(icarouselList).then(resp => {
        for (let i = 0; i < resp.content.length; i++) {
            carouselLists.value.push(resp.content[i])
        }
    })

})

const getProductDetail = (productId) => {
    router.push('/product/'+productId)
}

</script>

<style scoped>


p {
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
}
.cut-off-rule {
    background-color: #be7040;
    color: white;
    width: 100%;
    height: 60px;
}

/* slot */
.product-card {
    margin: 30px;
    float: left;
}

.slot-li {
    text-align: center;
    height: 50px;
}

.li-name {
    width: auto;
    margin: 0;
    padding: 0;
    border: 0;
    height: 70px;
    text-align: left;
    font-size: 15px;
    color: black;
}

.li-price {
    width: auto;
    margin: 0;
    padding: 0;
    text-align: left;
    height: 30px;
    font-size: 20px;
    color: red;
}

.li-img {
    width: 200px;
    height: 200px;
    margin: 0;
    padding: 0;
    border: 0;
}

/* slot */

.item > img {
    width: 100%;
    height: 400px;
}

#icarousel {
    margin: 10px 0 10px 10px;
    padding: 0;
}

a, a:hover {
    color: #7c93c5;
    text-decoration: none
}

nav ul {
    list-style: none;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
}

.my-nav a {
    display: block;
    padding: 0 16px;
    line-height: inherit;
    cursor: pointer;
}

ul li {
    list-style: none;
}


.el-carousel__item h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 600px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>