<template>
    <div id="received">
        <div class="title">
            <p>我的订单</p>
        </div>
        <div class="content">
            <el-table
                :data="orderList"
                stripe style="width: 100%"
            >
                <el-table-column prop="id" label="订单编号" width="160"/>
                <el-table-column prop="pname" label="商品名" width="300"/>
                <el-table-column label="预览图" width="300">
                    <template #default="scope">
                        <img :src="scope.row.pimg" alt="..." style="width: 200px;height: 120px">
                    </template>
                </el-table-column>
                <el-table-column prop="priceCount" label="订单价格" width="120"/>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" @click="dialog(scope.row.id)">点击收货</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
            v-model="dialogVisible"
            title="Tips"
            width="30%"
            center
        >
            <span>{{ status }}</span>
        </el-dialog>
    </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {ElMessageBox} from 'element-plus'
import send from "@/http";
import {getOrderReceive, received} from "@/api";

const orderList = ref([])
const dialogVisible = ref(false)
let status = ref(null)
const dialog = (p) => {
    dialogVisible.value = true
    status.value = p
}

const getOrderList = () => {
    send.post(getOrderReceive).then(resp => {
        orderList.value.length = 0;
        for (let i = 0; i < resp.content.length; i++) {
            orderList.value.push(resp.content[i])
        }
    })
}
const receive = (oid) => {
    send.post(received+oid).then(()=>{
        ElMessageBox.alert("收货成功")
    })
}
onMounted(() => {
    getOrderList()
})
</script>

<style scoped>
#received {
    margin: 10px;
    border-radius: 10px;
    background-color: grey;
    padding-bottom: 10px;
}

.title {
    margin: 20px;
    text-align: left;
    font-size: 20px;
}

.content {
    margin: 10px;
}
</style>