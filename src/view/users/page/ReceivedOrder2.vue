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
                <el-table-column label="状态">
                    <el-button type="text" @click="dialog(scope.row.status)">已收货</el-button>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="text" @click="dialog(scope.row.status)">删除</el-button>
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
            <span>{{status}}</span>
        </el-dialog>
    </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import { ElMessageBox } from 'element-plus'
import send from "@/http";
import {getOrderReceive, getOrderReceive2} from "@/api";

const orderList = ref([])
const dialogVisible = ref(false)
let status = ref(null)
const dialog = (p) => {
    dialogVisible.value = true
    status.value = p
}

const getOrderList = () => {
    send.post(getOrderReceive2).then(resp => {
        orderList.value.length = 0;
        for (let i = 0; i < resp.content.length; i++) {
            orderList.value.push(resp.content[i])
        }
    })
}

onMounted(()=> {
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