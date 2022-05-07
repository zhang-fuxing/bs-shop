<template>
    <div class="orderProcess">
        <!--    订单处理页面    -->
        <el-table
            :data="orderList"
            stripe
        >
            <el-table-column label="预览" width="200">
                <template #default="sp">
                    <img :src="sp.row.pimage" alt="" style="height: 80px;width: 120px">
                </template>
            </el-table-column>
            <el-table-column prop="pname" label="商品名" width="200"/>
            <el-table-column prop="buyNum" label="购买数量" width="100"/>
            <el-table-column prop="price" label="总价" width="100"/>
            <el-table-column label="更改时间" width="200">
                <template #default="sp">
                    <span v-if="sp.row.modifiedTime === null">{{sp.row.createTime}}</span>
                    <span v-else>{{sp.row.modifiedTime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template #default="sp">
                    <span v-if="sp.row.status === 1">未发货</span>
                    <span v-if="sp.row.status === 2">已发货</span>
                    <span v-if="sp.row.status === 3">已收货</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="sp">
                    <el-button type="success">查看详情</el-button>
                    <el-button type="primary" v-if="sp.row.status === 1">
                        点击发货
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>

import {reactive} from "vue";

const orderList = reactive([
    {
        id: 1,
        orderSn: '1521046151021072384',
        uid: 1,
        receiverName: '',
        receiverPhone: '',
        pid: 12,
        pname: 'ALIENWARE外星人全新Aurora R12台式机11代酷睿i7游戏电竞电脑主机3070整机高端官方旗舰店台机',
        pimage: 'http://localhost:9000/static/show/preview/1.1.jpg',
        buyNum:1,
        price:12.9,
        createTime: new Date().getTime(),
        modifiedTime: '2022-06-02',
        status:1

    },
    {
        id: 2,
        orderSn: '1521046151021072385',
        uid: 1,
        receiverName: '',
        receiverPhone: '',
        pid: 136,
        pname: 'ALIENWARE外星人全新Aurora R12台式机11代酷睿i7游戏电竞电脑主机3070整机高端官方旗舰店台机',
        pimage: 'http://localhost:9000/static/show/preview/1.1.jpg',
        buyNum:1,
        price:12.9,
        createTime: new Date().getTime(),
        modifiedTime: '',
        status:2

    },
    {
        id: 3,
        orderSn: '1521046151021072385',
        uid: 1,
        receiverName: '',
        receiverPhone: '',
        pid: 136,
        pname: 'ALIENWARE外星人全新Aurora R12台式机11代酷睿i7游戏电竞电脑主机3070整机高端官方旗舰店台机',
        pimage: 'http://localhost:9000/static/show/preview/1.1.jpg',
        buyNum:1,
        price:12.9,
        createTime: Date(),
        modifiedTime: '',
        status:3

    },
])

// 获取订单列表


</script>

<style scoped>
div.orderProcess {
    margin-top: 30px;
    background-color: orange;
}
</style>