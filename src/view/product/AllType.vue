<template>

    <div class="row">
        <nav>
            <ul>
                <li class="lv1" v-for="(item,index) in dlist" :key="index">
                    <span>
                        <ul class="breadcrumb">
                            <text href="javascript:void(0)"> &nbsp;&nbsp;{{ item.name }} >| </text>
                            <li v-for="(item2,index2) in item.list" :key="index2">
                                <a href="javascript:void(0)">{{ item2.name }}</a>
                            </li>
                        </ul>
                    </span>
                </li>
            </ul>
        </nav>

        <div class="product-card">
            <ProductTable @click="toDetail(0)">
                <template #image>
                    <img class="thumbnail slot-li li-img" src="@/assets/1/1.jpeg" alt="">
                </template>
                <template #pname>
                    <div class="slot-li li-name">
                        <text>
                            123456789123456789 123456789123456789
                        </text>
                    </div>
                </template>
                <template #price>
                    <div  class="slot-li li-price">￥ 12.9</div>
                </template>
            </ProductTable>
        </div>


    </div>

    <div>
        <ul class="pagelist">
            <li><input type="button" value="首页"></li>
            <li><input type="button" value="上一页"></li>
            <li><input type="text" value="1" class="display"></li>
            <li><input type="text" value="10" class="display" disabled></li>
            <li><input type="button" value="下一页"></li>
            <li><input type="button" value="尾页"></li>
        </ul>
    </div>
</template>

<script>
import {useRoute} from "vue-router"
import {onMounted, provide, reactive, ref} from "vue";
import send from "@/http/index.js";
import {categoryLevel2} from "@/api";
import store from "@/store";
import ProductTable from "@/view/product/ProductTable";
import router from "@/router";
export default {
    name: "AllType",
    components:{
        ProductTable,
    },
    setup() {
        const route = useRoute();
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

        onMounted(() => {
            send.get(categoryLevel2).then((resp) => {
                for (let i = 0; i < resp.content.length; i++) {
                    dlist[i] = resp.content[i]
                }
            })
        })


        return {
            dlist,
            toDetail:pid => {
                router.push('/product/'+pid)
            },
            page:ref(new Array(100))
        }
    }
}
</script>

<style scoped>
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
    margin: 0 0 0 20px;
}
.slot-li{
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
.pagelist > li{
    list-style: none;
    margin: 0;
    padding: 0;
}

input {
    border: none;
    outline-style: none ;
    border-radius: 3px;
}
input:focus {
    outline-style: none ;
    background-color: white;
    border: none;
}
.display{
    width: 50px;
    background-color: #bad9cb;
    text-align: center;
}
</style>