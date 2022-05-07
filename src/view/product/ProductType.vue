<template>
    <div id="categoryPage">
        <div class="inav">

            <Nav2 :category-id="$route.params.item"
                  @emit-did="getProductByLeve2"
                  v-if="store.state.productSet.length !== 0"
            ></Nav2>
        </div>
        <div class="product-card" v-if="store.state.productSet.length !== 0">
            <template v-for="product in store.state.productSet" :key="product.id">
                <ProductTable @click="getProductDetail(product.id)">
                    <template #image>
                        <img class="thumbnail slot-li li-img" :src="product.pimg" alt="">
                    </template>
                    <template #pname>
                        <div class="slot-li li-name">
                            <p>{{ product.pname }}</p>
                        </div>
                    </template>
                    <template #price>
                        <div class="slot-li li-price">￥ {{ product.unitPrice }}</div>
                    </template>
                </ProductTable>
            </template>
        </div>
        <div v-if="store.state.productSet.length === 0">
            <el-empty description="什么也没有" />
        </div>
        <div style="clear: left"></div>
        <div class="example-pagination-block">
            <el-pagination
                layout="prev, pager, next"
                :total="store.state.total"
                :page-size="page.pageSize"
                @current-change="changePage"
            />
        </div>
    </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router"
import {inject, onMounted, reactive, ref, watch} from "vue";
import ProductTable from "@/view/product/ProductTable";
import send from "@/http";
import {productCount, productCount1, productCount2, products} from "@/api";
import Nav2 from "@/components/Nav2.vue";
import store from "@/store";


// 变量定义
const route = useRoute();
let list = reactive([{}])
const page = reactive({
    currentPage: null,
    pageSize: null,
    cid: null,
    did: null,
})
const count = ref(0)
const lv2Id = ref(null)
const router = useRouter();
// 方法定义

const getList = (page) => {
    send.post(products, page).then(res => {
        if (store.state.productSet.length !== 0) {
            store.state.productSet.length = 0
        }
        for (let i = 0; i < res.content.length; i++) {
            store.state.productSet.push(res.content[i])
        }
    })
}
const getCount = (lv2id) => {
    if (lv2id !== null && lv2id !== undefined) {
        send.get(productCount2 + lv2id).then(res => {
            count.value = res.content
        })
    } else {
        send.get(productCount).then(res => {
            count.value = res.content
        })
    }
}
const getCount1 = (lv1id) => {
    send.get(productCount1 + lv1id).then(resp => {
        store.dispatch('setTotal', resp.content)
    })
}
const changePage = (pageIndex) => {

    page.currentPage = pageIndex;

    if (lv2Id.value !== null) {
        page.did = lv2Id.value;
        page.pageSize = 10;
    } else {
        page.did = null;
        page.cid = route.params.item
        page.pageSize = 30;
    }
    getList(page)
}
const getProductByLeve2 = (lv2id,cid) => {
    lv2Id.value = lv2id
    page.currentPage = 1;
    page.pageSize = 10;
    page.cid = cid;
    page.did = lv2id;
    send.get(productCount2+lv2id).then(rs => {
        store.dispatch('setTotal',rs.content)
    })
    getList(page)
}
const getProductDetail = (productId) => {
    router.push('/product/' + productId)
}
// 钩子函数
onMounted(() => {
    page.currentPage = 1;
    page.pageSize = 30;
    page.cid = route.params.item;
    page.did = null;
    send.get(productCount1+page.cid).then(rs => {
        store.dispatch('setTotal',rs.content)
    })
    getList(page)
})
watch(() => route.params.item, id => {
    page.currentPage = 1;
    page.pageSize = 30;
    page.cid = id;
    page.did = null;
    getCount1(id)
    getList(page)

})


</script>

<style scoped>
@import url("@/assets/css/p.css");

.example-pagination-block + .example-pagination-block {
    margin-top: 10px;
}

.example-pagination-block {
    margin-bottom: 16px;
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


nav ul {
    margin: 10px;
}

/* slot */
.product-card {
    /*height: 90%;*/
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

.pagination {
    padding: 0;
    height: 5%;
    margin: 0 0 0 30%;
}

.pagelist > li {
    list-style: none;
    margin: 0;
    padding: 0;
}

input {
    border: none;
    outline-style: none;
    border-radius: 3px;
}

input:focus {
    outline-style: none;
    background-color: white;
    border: none;
}

.display {
    width: 50px;
    background-color: #bad9cb;
    text-align: center;
}

</style>