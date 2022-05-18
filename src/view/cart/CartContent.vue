<template>
    <div class="content">
        <div id="cart-bar">
            <el-row>
                <el-col :span="8">
                    <span>购物车（全部{{ count }}）</span>
                </el-col>

                <el-col :span="8" :offset="8">
                    <div class="cart-sum">
            <span
            >已选商品:
              {{ sumPrice }}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <el-button color="#ffff" @click="centerDialogVisible = true">结算</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <hr/>
        <div id="cart-main">
            <div class="table-responsive">
                <el-table
                    ref="multipleTableRef"
                    :data="userCart"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55" label="全选"/>
                    <el-table-column label="图片" width="400">
                        <template #default="scope">
                            <img :src="scope.row.productPic" alt="." style="height: 100px;float: left">
                            <p class="pname">{{ scope.row.productName }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column property="price" label="单价" width="100"/>
                    <el-table-column label="购买数量" width="200">
                        <template #default="sc">
                            <el-input-number
                                v-model="sc.row.quantity"
                                :min="1"
                                :max="maxnum"
                                @change="handleChange"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="小计" width="200">
                        <template #default="sc">
                            {{ formatDecimal(sc.row.quantity * sc.row.price, 2) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="sc">
                            <el-button type="primary" color="red" @click="removeCartItem(sc.row.id)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>

        <hr/>
        <div id="float-bar">
            <el-row>
                <el-col :span="8">
                    <el-button type="primary" @click="toggleSelection(userCart)">反选</el-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>购物车（全部{{ multipleSelection.length }}）</span>
                </el-col>
                <el-col :span="8" :offset="8">
                    <div class="cart-sum">
            <span>合计:{{ sumPrice }}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <el-button color="#ffff" @click="centerDialogVisible = true">结算</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>


    </div>


    <div>
        <el-dialog
            v-model="centerDialogVisible"
            title="确认订单"
            width="60%"
            destroy-on-close
            center
        >
            <div class="inner_content">
                <p style="font-size: 20px">总价: {{sumPrice}}</p>
                <span class="now-buy-font">配送地址:</span>
                <select v-model="address" style="width: 100%;height: 40px;" required>
                    <template v-for="add in addressSet" :key="add.id">
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

                <el-table
                    :data="multipleSelection"
                >
                    <el-table-column label="商品">
                        <template #default="sc">
                            <img :src="sc.row.productPic" alt=".." style="height: 100px;float:left;">
                            <p>{{ sc.row.productName }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="购买数量" prop="quantity" width="100"/>
                    <el-table-column label="单价" prop="price" width="100"/>
                    <el-table-column label="合计">
                        <template #default="sc">
                            {{parseFloat(sc.row.quantity)*parseFloat(sc.row.price)}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <template #footer>
          <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="payDialog = true">提交</el-button>
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
                    <el-button type="primary" @click="endSelect">支付成功</el-button>
                  </span>
            </template>
        </el-dialog>

        <el-dialog
            v-model="isRemove"
            title="提示"
            width="60%"
        >
            <p>真的要删除吗？</p>
            <template #footer>
              <span class="dialog-footer">
                    <el-button @click="removeNo">我点错了</el-button>
                <el-button type="primary" @click="removeOk">确定删除</el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import {ref, onMounted, reactive, computed} from "vue";
import send from "@/http";
import {cartList} from "@/api/index.js";
import {formatDecimal} from "@/js";
import {createOrderByCart, getAddress, removeCartItems} from "@/api";
import {ElMessage} from "element-plus";

const props = defineProps(["uid"]);

const sumPrice = ref(0);
const maxnum = ref(99);
const userCart = reactive([{}])
const centerDialogVisible = ref(false)
const address = ref('')
const addressSet = ref([])

const isRemove = ref(false)
const payDialog = ref(false)
const tempCid = ref()
// 根据uid查询用户购物车信息
const getCarts = () => {
    if (userCart.length !== 0) {
        userCart.length = 0
    }
    send.post(cartList).then((data) => {
        for (let i = 0; i < data.content.length; i++) {
            userCart[i] = data.content[i]
        }
    });
};
onMounted(() => {
    getCarts();
    send.post(getAddress).then(resp => {
        addressSet.value.splice(0)
        for (let i = 0; i < resp.content.length; i++) {
            addressSet.value[i] = resp.content[i]
            if (resp.content[i].receiveStatus === 1) {
                address.value = resp.content[i]
            }
        }
    })
})


const multipleTableRef = ref()
const multipleSelection = ref([])
const toggleSelection = (rows) => {
    if (rows) {
        rows.forEach((row) => {
            multipleTableRef.value.toggleRowSelection(row, undefined)
        })
    } else {
        multipleTableRef.value.clearSelection()
    }
}
const handleSelectionChange = (val) => {
    multipleSelection.value = val
    sumPrice.value = 0
    if (multipleSelection.value.length !== 0) {
        for (let i = 0; i < multipleSelection.value.length; i++) {
            let cart = multipleSelection.value[i]
            sumPrice.value += (parseFloat(cart.price) * parseFloat(cart.quantity))
        }
    }
}

const endSelect = () => {
    let orders = []
    for (let i = 0; i < multipleSelection.value.length; i++) {
        let cart = multipleSelection.value[i]
        orders[i] = {
            id: cart.id,
            pid: cart.productId,
            pname: cart.productName,
            buyNum: cart.quantity,
            pimg: cart.productPic,
            addressName: address.value.addressName,
            receiveName: address.value.name,
            receivePhone: address.value.phone,
            province: address.value.province,
            city: address.value.city,
            region: address.value.region,
            detailAddress: address.value.detailAddress,
        }
    }
    send.post(createOrderByCart, orders).then(resp => {
        if (resp.code === -1) {
            ElMessage.error(resp.message)
        }
        if (resp.code === 0 && resp.content) {
            ElMessage.success("购买成功")
            getCarts()
            payDialog.value = false
            centerDialogVisible.value = false
        }

    })
}


const removeCartItem = (cid) => {
    isRemove.value = true
    tempCid.value = cid
}
const removeOk = () => {
        send.post(removeCartItems+tempCid.value).then(resp => {
            ElMessage.success("成功删除")
            getCarts()
            isRemove.value = false
        })
}
const removeNo = () => {
    ElMessage.success("下次小心哦。");
    isRemove.value = false
}
</script>

<style scoped>
@import "@/assets/table.css";

.content {
    border: #1f2f3d solid;
    border-radius: 20px;
    margin: 2% 5%;
}

#cart-bar {
    margin: 10px;
    height: 45px;
    font-size: 20px;
}

.cart-sum {
    text-align: right;
}

#float-bar {
    font-size: 20px;
    margin: 10px;
    height: 45px;
}

#cart-main {
    margin: 3px 10px;
    font-size: 20px;
}

p.pname {
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    font-size: 15px;
}

table {
    width: 100%;
}

.pdetile {
    width: 30%;
}

.el-checkbox-group {
    line-height: 20px;
}
</style>