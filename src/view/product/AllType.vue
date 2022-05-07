<template>

    <div class="row">
        <nav>
            <ul>
                <li class="lv1" v-for="(item,index) in dlist" :key="index">
                        <span>{{ item.name }} >| &nbsp; &nbsp;&nbsp;</span>
                        <Nav2
                            :category-id="item.id"
                            @emit-did="getProductByLeve2"
                        ></Nav2>
                        <div style="clear:left;" hidden></div>
                </li>
            </ul>
        </nav>
        <div class="product-card" v-if="store.state.productSet.length !== 0">
            <template v-for="product in store.state.productSet" :key="product.id">
                <ProductTable @click="getProductDetail(product.id)">
                    <template #image>
                        <img class="thumbnail slot-li li-img" :src="product.pimg" alt="...">
                    </template>
                    <template #pname>
                        <div class="slot-li li-name">
                            <p>
                                {{ product.pname }}
                            </p>
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

    </div>

    <div class="example-pagination-block">
        <el-pagination
            layout="prev, pager, next"
            :total="store.state.total"
            :page-size="page.pageSize"
            @current-change="changePage"
        />
    </div>

</template>

<script setup>
import {useRoute,useRouter} from "vue-router"
import {onMounted, provide, reactive, ref, watch} from "vue";
import send from "@/http/index.js";
import {categoryLevel2, productCount, productCount1, productCount2, products} from "@/api";
import store from "@/store";
import ProductTable from "@/view/product/ProductTable";

import Nav2 from "@/components/Nav2.vue"



// 变量定义
let dlist = reactive([
    {
        id: 0,
        name: '',
        list: [{
            id: 0,
            name: ''
        }]
    }
])

const productList = reactive([{}])
const page = reactive({
    currentPage: null,
    pageSize: null,
    cid: null,
    did: null,
})
const route = useRoute();
const router = useRouter();
const lv2Id = ref(null)


// 钩子函数
onMounted(() => {
    // 获取分类列表
    send.get(categoryLevel2).then((resp) => {
        for (let i = 0; i < resp.content.length; i++) {
            dlist[i] = resp.content[i]
        }
    })
    // 获取商品总数
    send.get(productCount).then(r => {
        store.dispatch('setTotal',r.content)
    })
    page.currentPage = 1;
    page.pageSize = 30;
    getList(page)

})

// 方法定义
const getList = (page) => {
    // 获取商品列表
    send.post(products, page).then(r => {
        if (store.state.productSet.length !== 0) {
            store.state.productSet.length = 0
        }
        for (let i = 0; i < r.content.length; i++) {
            store.state.productSet[i] = r.content[i]
        }
    })
}
const changePage = (pageIndex) => {
    page.currentPage = pageIndex;
    page.cid = null
    if (lv2Id.value !== null) {
        page.did = lv2Id.value;
        page.pageSize = 10;
    } else {
        page.did = null;
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
    router.push('/product/'+productId)
}
watch(() => route.params.item, id => {
    page.currentPage = 1;
    page.pageSize = 30;
    page.cid = id;
    page.did = null;
    getList(page)
})
</script>

<style scoped>

.example-pagination-block + .example-pagination-block {
    margin-top: 10px;
}
.example-pagination-block  {
    margin-bottom: 16px;
}
p {
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
}

div {
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 5px;
}

.lv1 {
    display: inline;
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


/* slot */
.product-card {
    margin:30px;
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
.pagelist {
    margin-left: 25%;
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


span{
    margin: 0;
    padding: 0;
    float: left;
    height: 30px;
}

</style>