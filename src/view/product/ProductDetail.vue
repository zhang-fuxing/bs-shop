<template>

    <div class="detail-header">
        <div class="imgshow">
            <el-carousel :interval="4000" type="card" height="500px">
                <el-carousel-item v-for="item in previewList" :key="item.id">
                    <img style="width: 400px;height: 500px" :src="item.domain+item.projectPath+item.name" alt="..">
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="product-active">
            <h2>{{ product.pname }}</h2>
            <p class="product-item">
                <span>价格: ￥ <span style="font-size: 30px;color: red;">{{ product.unitPrice }}</span></span>
            </p>
            <p class="product-item">
                <span>库存: {{ product.inventoryNum }}</span>
            </p>
            <p class="product-item">
                <span>购买数量: <el-input-number v-model="buyNum" :min="1" :max="product.inventoryNum"
                                             @change="handleChange"/></span>
            </p>

            <div class="btn-grp">
                <el-button type="primary" color="red" style="margin-left: 15%" @click="nowBuy">
                    <el-icon size="30px">
                        <shop/>
                    </el-icon>
                    <span>立即结算</span>
                </el-button>
                <el-button type="primary" color="red" @click="addToCart">
                    <el-icon size="30px">
                        <shopping-cart/>
                    </el-icon>
                    <span>加入购物车</span>
                </el-button>
            </div>

        </div>
    </div>

    <div style="clear:left;"></div>
    <hr>
    <p>产品参数:</p>
    <div v-html="product.description"></div>
    <div class="detail-img">
        <ul class="nav nav-tabs">
            <li
                :class="{ active: currentTab === tab.component }"
                v-for="(tab,index) in ptable"
                :key="index"
            >
                <a href="javascript:void(0)" @click="changeTable(tab.component)">{{ tab.tabName }}</a>
            </li>
        </ul>
        <keep-alive>
            <component :is="currentTab"></component>
        </keep-alive>
    </div>


    <div>
        <!--立即购买弹窗-->
        <el-dialog
            v-model="centerDialogVisible"
            title="确认订单"
            width="30%"
            destroy-on-close
            center
        >
            <div class="inner_content">
                <span class="now-buy-font">配送地址:</span>
                <select v-model="orderObject.address" style="width: 100%;height: 40px;" required>
                    <template v-for="add in address" :key="add.id">
                        <option v-if="add.receiveStatus===1" selected
                                :value="add"
                                class="sel-item"
                        >
                            {{ add.addressName + '   ' + add.name + '   ' + add.phone + add.province + add.city + add.region + add.detailAddress }}
                        </option>
                        <option v-else :value="add"
                                class="sel-item"
                        >
                            {{
                                add.addressName + '   ' + add.name + '   ' + add.phone + add.province + add.city + add.region + add.detailAddress
                            }}
                        </option>
                    </template>
                </select>

                <p>
                <span class="now-buy-font">
                    商品名:
                </span>
                    <span>{{ orderObject.pname }}</span>
                </p>
                <p><img :src="orderObject.pimg" alt="0"></p>
                <p><span class="now-buy-font">购买数量: </span>
                    <span style="font-family: 'Times New Roman';font-size: 30px;color: red"> {{ orderObject.buyNum }}</span>
                </p>
                <p><span class="now-buy-font">价格: </span>
                    <span style="font-family: 'Times New Roman';font-size: 30px;color: red">￥ {{
                            orderObject.priceCount
                        }}</span>
                </p>
            </div>
            <template #footer>
          <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitOrder">提交</el-button>
          </span>
            </template>
        </el-dialog>
        <el-dialog
            v-model="payDialog"
            title="付款"
            width="30%"
            destroy-on-close
            center
        >
            <img src="http://localhost:9000/static/pay.jpg" alt="." style="width: 100%;"/>
            <template #footer>
          <span class="dialog-footer">
                <el-button @click="payDialog = false">取消支付</el-button>
            <el-button type="primary" @click="payFinish">支付成功</el-button>
          </span>
            </template>
        </el-dialog>
    </div>

    <!-- 加入购物车 -->
</template>

<script setup>
import {useRoute} from "vue-router";
import {computed, onMounted, provide, reactive, ref} from "vue";
import ProductInfo from "@/view/product/ProductInfo";
import Appraise from "@/view/product/Appraise";
import send from "@/http";
import {addCart, createOrder, getAddress, productImage, productInfo} from "@/api";
import {ShoppingCart, Shop} from "@element-plus/icons-vue"
import {formatDecimal} from "@/js";
import {ElMessage} from "element-plus";


const route = useRoute()
const ptable = reactive([
    {
        component: ProductInfo,
        tabName: '商品详情'
    },
    {
        component: Appraise,
        tabName: '用户评价'
    }
])
const id = ref(route.params.id)
const buyNum = ref(1)
const centerDialogVisible = ref(false)
const payDialog = ref(false)
let currentTab = ref(ProductInfo)
// 商品对象
let product = ref({})
// 预览轮播图
let previewList = reactive([])
// 详情图片
let detailList = reactive([])
// 钩子函数
onMounted(() => {
    getProductInfoById(id.value)
    getImageByProductId(id.value)

})


// 自定义函数
const changeTable = (componentName) => {
    currentTab.value = componentName
}
// 根据id获取商品详细信息
const getProductInfoById = (productId) => {
    send.get(productInfo + productId).then(resp => {
        product.value = resp.content;
    })
}

// 根据商品id获取对应图片
const getImageByProductId = (productId) => {
    send.get(productImage + productId).then(res => {
        if (previewList.length !== 0) {
            previewList.length = 0
        }
        if (detailList.length !== 0) {
            detailList.length = 0
        }
        for (let i = 0; i < res.content.length; i++) {
            if (res.content[i].imgType === 1) {
                previewList.push(res.content[i])
            } else if (res.content[i].imgType === 2) {
                detailList.push(res.content[i])
            }
        }
    })
}
const handleChange = (value) => {

}

const orderObject = reactive({
    pid: '',
    pname: '',
    pimg: '',
    buyNum: 0,
    priceCount: 0,
    address: {}
})
const address = reactive([])
const nowBuy = () => {

    send.post(getAddress).then(resp => {
        address.splice(0)
        for (let i = 0; i < resp.content.length; i++) {
            address[i] = resp.content[i]
            if (resp.content[i].receiveStatus === 1) {
                orderObject.address = resp.content[i]
            }
        }
    })

    orderObject.pid = product.value.id
    orderObject.pname = product.value.pname
    orderObject.pimg = previewList[0].domain + previewList[0].projectPath + previewList[0].name
    orderObject.buyNum = buyNum.value
    orderObject.priceCount = formatDecimal(buyNum.value * product.value.unitPrice, 2)

    centerDialogVisible.value = true
}

const submitOrder = () => {
    payDialog.value = true
}
const payFinish = () => {
    payDialog.value = false
    centerDialogVisible.value = false
    let data = {
        pid: orderObject.pid,
        pname: orderObject.pname,
        pimg: orderObject.pimg,
        buyNum: orderObject.buyNum,
        addressName: orderObject.address.addressName,
        receiveName: orderObject.address.name,
        receivePhone: orderObject.address.phone,
        province: orderObject.address.province,
        city: orderObject.address.city,
        region: orderObject.address.region,
        detailAddress: orderObject.address.detailAddress,
    }

    send.post(createOrder,data).then(resp => {
        if (resp.code === 0) {
            ElMessage.success("恭喜下单成功！您可以在 个人中心 > 订单管理 > 待收或 中查看详情")
        }
    })
}

const addToCart = () => {
    let data = {
        productId: product.value.id,
        quantity: buyNum.value,
        productPic: previewList[0].domain + previewList[0].projectPath + previewList[0].name,
        productName: product.value.pname,
        categoryId: product.value.categoryId
    }
    send.post(addCart,data).then(resp => {
        if (resp.code === 1) {
            ElMessage.error(resp.message)
        }
        if (resp.code === -1) {
            ElMessage.error(resp.message)
        }

        if (resp.code === 0) {
            ElMessage.success("添加成功")
        }
    })
}

// 发布信息
provide("detailList", detailList)
provide("product", product)
</script>

<style>
.el-select .el-input {
    display: flex;
    width: 400px;
}
</style>

<style scoped>
.now-buy-font {
    font-size: 20px;
    color: black;
    font-family: 宋体, serif;
}


p.product-item {
    margin: 20px 0;
    height: 50px;
    font-size: 20px;
}

div.imgshow {
    width: 55%;
    float: left;
}

div.product-active {
    margin-left: 51%;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
