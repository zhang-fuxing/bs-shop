<template>
    <div class="orderProcess">
        <el-switch
            v-model="pageStatus"
            class="mb-2"
            active-text="未发货"
            inactive-text="已发货"
            active-color="#409EFF"
            inline-prompt
            inactive-color="#13ce66"
            width="60"
        />
        <!--    订单处理页面    -->
        <template v-if="pageStatus">
            <el-table
                :data="orderList"
                stripe
            >
                <el-table-column label="预览" width="200">
                    <template #default="sp">
                        <img :src="sp.row.pimg" alt="" style="height: 80px;width: 120px">
                    </template>
                </el-table-column>
                <el-table-column prop="pname" label="商品名" width="200"/>
                <el-table-column prop="buyNum" label="购买数量" width="100"/>
                <el-table-column prop="priceCount" label="总价" width="100"/>
                <el-table-column label="更改时间" width="200">
                    <template #default="sp">
                        <span v-if="sp.row.modifiedTime === null || sp.row.modifiedTime===undefined">{{sp.row.createTime}}</span>
                        <span v-else>{{sp.row.modifiedTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100">
                    <template #default="sp">
                        <span v-if="sp.row.status === 0">未发货</span>
                        <span v-if="sp.row.status === 1">已发货</span>
                        <span v-if="sp.row.status === 2">已收货</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="sp">
                        <el-button type="success">查看详情</el-button>
                        <el-button type="primary" v-if="sp.row.status === 0" @click="sendProduct(sp.row.id)">
                            点击发货
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template v-else>
            <el-table
                :data="processedList"
                stripe
            >
                <el-table-column label="预览" width="200">
                    <template #default="sp">
                        <img :src="sp.row.pimg" alt="" style="height: 80px;width: 120px">
                    </template>
                </el-table-column>
                <el-table-column prop="pname" label="商品名" width="200"/>
                <el-table-column prop="buyNum" label="购买数量" width="100"/>
                <el-table-column prop="priceCount" label="总价" width="100"/>
                <el-table-column label="更改时间" width="200">
                    <template #default="sp">
                        <span v-if="sp.row.modifiedTime === null || sp.row.modifiedTime===undefined">{{sp.row.createTime}}</span>
                        <span v-else>{{sp.row.modifiedTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100">
                    <template #default="sp">
                        <span v-if="sp.row.status === 1">已发货</span>
                        <span v-if="sp.row.status === 2">已收货</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="sp">
                        <el-button type="success">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

    </div>
</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import send from "@/http";
import {getOrderSet1,changeStatus} from "@/api";
import {ElMessage} from "element-plus";
const pageStatus = ref(false);
const orderList = reactive([])
const processedList = reactive([])
// 获取订单列表
const getList = () => {
    send.post(getOrderSet1).then(resp => {
        orderList.length = 0
        processedList.length = 0
        for (let i = 0; i < resp.content.length; i++) {
            if (resp.content[i].status === 0)
                orderList.push(resp.content[i])
            else
                processedList.push(resp.content[i])
        }
    })
}
const sendProduct = (oid)=>{
    send.post(changeStatus+oid).then(resp => {
        ElMessage.success("发货成功！！")
        getList()
    })
}
onMounted(() => {
    getList()
})
</script>

<style scoped>
div.orderProcess {
    margin-top: 30px;
    background-color: orange;
}
</style>