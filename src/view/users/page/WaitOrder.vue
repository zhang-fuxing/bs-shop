<template>
    <div id="waitOrder">
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
               <el-table-column label="预览图" width="250">
                   <template #default="scope">
                       <img :src="scope.row.pimg" alt="..." style="width: 200px;height: 100px">
                   </template>
               </el-table-column>
               <el-table-column prop="priceCount" label="价格" width="100"/>
               <el-table-column label="操作">
                   <template #default="scope">
                       <el-button type="primary" @click="dialogVisible = true">查询详细</el-button>
                           <el-dialog v-model="dialogVisible" title="一个对话框">
                               <div>
                                   <p>订单详情</p>
                                   <p>name</p>
                                   <el-button type="danger" @click="dialogVisible = false">取消</el-button>
                               </div>
                           </el-dialog>
                   </template>
               </el-table-column>
           </el-table>
       </div>
    </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import send from "@/http";
import {getOrderSet} from "@/api";

const orderList = ref([])
const dialogVisible = ref(false)


const getOrderList = () => {
    send.post(getOrderSet).then(resp => {
        orderList.value.length = 0
        for (let i = 0; i < resp.content.length; i++) {
            orderList.value.push(resp.content[i])
        }
    })
}
onMounted(() => {
    getOrderList()
})
</script>

<style scoped>
#waitOrder {
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