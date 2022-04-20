<template>
    <div class="product-detail">
        <div class="content">
            <!--轮播展示商品-->
            <div id="carousel-example-generic" class="carousel slide pimgs" data-ride="carousel">
                <!-- Indicators -->
                <ol class="carousel-indicators">
                    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                </ol>

                <!-- 轮播内容 -->
                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <video controls id="pvideo">
                            <source src="@/assets/1/movie.ogg" type="video/ogg">
                        </video>
                    </div>

                    <div class="item">
                        <img src="@/assets/1/1.jpeg" alt="...">
                        <div class="carousel-caption">
                            描述
                        </div>
                    </div>

                    <div class="item">
                        <img src="@/assets/1/2.jpeg" alt="...">
                        <div class="carousel-caption">
                            ...
                        </div>
                    </div>
                </div>
                <!--轮播内容结束-->

                <!-- Controls -->
                <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <!-- 轮播结束-->

            <!-- start 商品信息展示 start -->
            <div class="product-right">
                <h1>商品名字</h1>

            </div>
            <!-- end 商品信息展示 end -->
        </div>
        <!-- 商品详细展示 -->
        <div class="detail">
            <ul class="nav nav-tabs">
                <li :class="{ active: currentTab === tab.component }"
                    v-for="(tab,index) in ptable"
                    :key="index"
                >
                    <a href="javascript:void(0)" @click="currentTab = tab.component">{{ tab.tabName }}</a>
                </li>
            </ul>
            <keep-alive>
                <component :is="currentTab"></component>
            </keep-alive>
        </div>


    </div>
</template>

<script>
import {useRoute} from "vue-router";
import Header from "@/components/Header";
import store from "@/store";
import Nav from "@/components/Nav";
import {computed, reactive, ref} from "vue";
import ProductInfo from "@/view/product/ProductInfo";
import Appraise from "@/view/product/Appraise";

export default {
    components: {
        Header,
        Nav,
        ProductInfo,
        Appraise
    },
    setup() {

        const route = useRoute()
        const ptable = reactive([
            {
                component: 'ProductInfo',
                tabName: '商品详情'
            },
            {
                component: 'Appraise',
                tabName: '用户评价'
            }
        ])

        let currentTab = ref('ProductInfo')

        return {
            id: route.params.id,
            name: route.query.name,
            ptable,
            currentTab,
            addToken: () => {
                store.dispatch('setToken', {token: '13212312312312312'})
            },
            currentComponent: computed(() => currentTab)
        }
    }
}
</script>

<style scoped>
.product-detail {
    background-color: #ffffff;
    background-image: linear-gradient(to right, #ffffff, #719dc9);
    position: fixed;
    width: 90%;
    height: 100%;
    overflow: auto;
}

.content {
    height: 80%;
}

.pimgs {
    position: absolute;
    width: 50%;
    height: 70%;
    background-color: white;
}

.product-right {
    position: absolute;
    margin-left: 5px;
    left: 50%;
    height: 80%;
}

.pimgs > div.carousel-inner {
    position: absolute;
    width: 100%;
    height: 100%;
}

.pimgs > div.carousel-inner > div.item {
    position: absolute;
    width: 100%;
    height: 100%;
}

#pvideo {
    position: absolute;
    top: 25%;
    width: 100%;
    height: 50%;
}

div#carousel-example-generic {
    float: left;
}

.detail {
    height: 40%;
}


</style>