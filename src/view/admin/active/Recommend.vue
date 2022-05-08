<template>
    <div class="rc-product">
        <h2>商品推荐管理</h2>
        <hr>
        <el-button type="primary" @click="dialogVisible = true">添加推荐商品</el-button>
        <hr>
        <el-table :data="rcList" stripe :default-sort="{prop: 'pid'}">
            <el-table-column prop="pid" label="商品ID" width="100" sortable></el-table-column>
            <el-table-column label="商品详情" width="300">
                <template #default="sc">
                    <img :src="sc.row.pimg" alt=".." style="width: 200px;height: 100px;">
                    <p>{{ sc.row.pname }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="floor" label="推荐楼层" width="120" sortable/>
            <el-table-column prop="price" label="商品价格" width="120" sortable/>
            <el-table-column label="修改时间" width="200">
                <template #default="sc">
                    <span
                        v-if="sc.row.modifiedTime === null || sc.row.modifiedTime === undefined">{{
                            sc.row.createTime
                        }}</span>
                    <span v-else>{{ sc.row.modifiedTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="sc">
                    <el-button type="primary" color="red" @click="cancelRm(sc.row.id)">取消推荐</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog
            v-model="dialogVisible"
            title="添加"
            width="60%"
        >
            <div>
                <el-input type="text" v-model="form.pid">
                    <template #prepend>
                        <span>商品ID</span>
                    </template>
                </el-input>
                <br>
                <el-input type="text" v-model="form.floor">
                    <template #prepend>
                        <span>展示楼层</span>
                    </template>
                </el-input>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm">确定</el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import send from "@/http";
import {add, addrm, removeRM, rmlist} from "@/api";
import {ElMessage} from "element-plus";

const rcList = reactive([])
const dialogVisible = ref(false)

const form  = reactive({
    pid:'',
    floor: 1
})

onMounted(() => {
    send.post(rmlist).then(resp => {
        for (let i = 0; i < resp.content.length; i++) {
            rcList.push(resp.content[i])
        }
    })
})


const submitForm = () => {
    if (typeof form.floor === "number") {
        ElMessage.error("floor error")
        return
    }
    send.post(addrm+form.pid+"/"+form.floor).then(()=>{
        ElMessage.success("添加成功")
        send.post(rmlist).then(resp => {
            rcList.length = 0
            for (let i = 0; i < resp.content.length; i++) {
                rcList.push(resp.content[i])
            }
        })
    })
}
const cancelRm = (rid) => {
    send.post(removeRM+rid).then(() => {
        ElMessage.success("已取消")
        send.post(rmlist).then(resp => {
            rcList.length = 0
            for (let i = 0; i < resp.content.length; i++) {
                rcList.push(resp.content[i])
            }
        })
    })
}

</script>

<style scoped>
.rc-product {
    margin: 40px 0;
}
</style>