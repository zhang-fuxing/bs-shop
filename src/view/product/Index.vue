<template>

    <!-- 轮播图 -->
    <div class="" id="icarousel">
        <!-- 轮播图 -->
        <div class="col-md-8">
            <!-- 点击轮播 -->
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                    <li data-target="#myCarousel" data-slide-to="3"></li>
                </ol>
                <!-- 轮播（Carousel）项目 -->
                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <img src="http://localhost:9000/static/1/3.png" alt=""/>
                        <div class="carousel-caption">
                            图片描述
                        </div>
                    </div>
                    <div class="item">
                        <img src="@/assets/1/4.png" alt=""/>
                    </div>
                    <div class="item">
                        <img src="@/assets/1/5.jpg" alt=""/>
                    </div>
                    <div class="item">
                        <img src="@/assets/1/6.jpg" alt=""/>
                    </div>
                </div>
                <!-- 轮播（Carousel）导航 -->
                <div>
                    <a
                        class="left carousel-control"
                        href="#myCarousel"
                        role="button"
                        data-slide="prev"
                    >
              <span
                  class="glyphicon glyphicon-chevron-left"
                  aria-hidden="true"
              ></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a
                        class="right carousel-control"
                        href="#myCarousel"
                        role="button"
                        data-slide="next"
                    >
              <span
                  class="glyphicon glyphicon-chevron-right"
                  aria-hidden="true"
              ></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div>推荐</div>
            <ul>
                <li><a href="">123132</a></li>
                <li><a href="">123132</a></li>
                <li><a href="">123132</a></li>
                <li><a href="">123132</a></li>
                <li><a href="">123132</a></li>
                <li><a href="">123132</a></li>
                <li><a href="">123132</a></li>
                <li><a href="">123132</a></li>
                <li><a href="">123132</a></li>
                <li><a href="">123132</a></li>
                <li><a href="">123132</a></li>

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
import {rmlist} from "@/api";
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
</style>