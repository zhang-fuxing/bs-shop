<template>
    <div>
        <nav>
            <ul>
                <li class="lv1" v-for="(item,index) in list" :key="index">
                <span>
                    <ul class="breadcrumb">
                        <text href="javascript:void(0)">&nbsp;&nbsp; {{ item.name }} >| </text>
                        <li v-for="(item2,index2) in item.list" :key="index2">
                            <a href="javascript:void(0)">{{ item2.name }}</a>
                        </li>
                    </ul>
                </span>
                </li>
            </ul>
        </nav>
        <div class="product-card">
            <ProductTable @click="show">
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
</template>

<script>
import {useRoute} from "vue-router"
import {inject, onMounted, reactive, watch, watchEffect} from "vue";
import ProductTable from "@/view/product/ProductTable";
import {getByCategoryId} from "@/api";
import send from "@/http";

export default {

    components: {
        ProductTable
    },
    setup() {
        const route = useRoute();
        let list = reactive([
            {
                id: 0,
                name: '',
                list: [{
                    id: 0,
                    name: ''
                }]
            }
        ])
        let item = reactive({id: route.params.item})

        const getLv2ById = (id) => {
            send.get(getByCategoryId + id).then((resp) => {
                if (resp.code === 301) {
                    list = reactive([
                        {
                            id: 0,
                            name: '',
                            list: [{
                                id: 0,
                                name: ''
                            }]
                        }
                    ])
                } else {
                    for (let i = 0; i < resp.content.length; i++) {
                        list[i] = resp.content[i]
                    }
                }
            }).catch(error => {
                console.log(error.status)
                list = reactive([
                    {
                        id: 0,
                        name: '',
                        list: [{
                            id: 0,
                            name: ''
                        }]
                    }
                ])
            })
        }
        onMounted(() => {
            getLv2ById(item.id)
        })
        watch(() => route.params.item, id => {
            getLv2ById(id)
        })
        return {
            item,
            list,
            show: ()=>alert(111)
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;

}

ul li {
    display: inline;
    line-height: 40px;
}


nav ul{
    margin: 10px;
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
</style>