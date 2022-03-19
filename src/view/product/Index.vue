<template>
    <!-- 轮播图 -->
    <div class="row" id="icarousel">
        <!-- 轮播图 -->
        <div class="col-md-8">
            <!-- 点击轮播 -->
            <div id="myCarousel" class="carousel slide">
                <!-- 轮播（Carousel）项目 -->
                <div class="carousel-inner">
                    <div class="item active">
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

        </div>
    </div>
    <div class="row">
        <ProductTable @click="test1" v-for="(_,index) in count" :key="index">
            <template #image>
                <img class="slot-size" src="@/assets/1/1.jpeg" alt="">
            </template>
            <template #pname>
                <div class="slot-li li-name">123</div>
            </template>
            <template #price>
                <div  class="slot-li li-price">12.9</div>
            </template>
        </ProductTable>

    </div>
</template>

<script>
import ProductTable from "@/view/product/ProductTable";
import {ref} from "vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Index.vue",
    components: {
        ProductTable
    },
    setup() {
        const test1 = () => {
          alert(1)
        }


        const count = ref(new Array(20))
        return {
            count,
            test1,
        }
    }
}
</script>

<style scoped>
.slot-li{
    float: left;
    text-align: center;
    height: 50px;
}
.li-name {
    width: 150px;
}
.li-price {
    width: 50px;
}
.item > img {
    width: 800px;
    height: 400px;
}
.slot-size {
    width: 200px;
    height: 150px;
}

#icarousel {
    margin-top: 10px;
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

.nav_menu {
    line-height: 20px;
    font-weight: 700;
    text-transform: uppercase;
}

.nav_menu-item {
    display: inline-block;
    position: relative;

}

.nav_menu-item:hover {
    background-color: #9ec95e;
}

.nav_menu-item:hover .nav_submenu {
    display: block;
}

.nav_submenu {
    font-weight: 200;
    text-transform: none;
    display: none;
    position: absolute;
    width: 150px;
    background-color: #b2b154;
}

.nav_submenu-item:hover {
    background: rgba(108, 69, 69, 0.1);
}
</style>