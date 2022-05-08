<template>
    <div class="user-list">
        <h2> 用户信息列表</h2>
        <el-row>
            <el-col :span="10" :offset="6">
                <el-input type="text">
                    <template #append>
                        <el-button type="primary">搜索</el-button>
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="userList" stripe>
            <el-table-column prop="uid" label="用户id" width="200"/>
            <el-table-column prop="nickname" label="用户昵称" width="130"/>
            <el-table-column prop="phone" label="用户电话" width="130"/>
            <el-table-column label="用户性别" width="100">
                <template #default="sc">
                    <span v-if="sc.row.sex === 1">男</span>
                    <span v-else-if="sc.row.sex === 0">女</span>
                    <span v-else>未知</span>
                </template>
            </el-table-column>
            <el-table-column prop="email" label="用户邮箱"/>
            <el-table-column label="用户状态" width="100">
                <template #default="sc">
                    <span v-if="sc.row.userStatus === 1">正常</span>
                    <span v-if="sc.row.userStatus === -1" style="color: #0cb2ec">冻结中</span>
                </template>
            </el-table-column>
            <el-table-column label="修改时间" width="180">
                <template #default="sc">
                    <span
                        v-if="sc.row.modifiedTime === null || sc.row.modifiedTime === undefined">{{sc.row.createdTime }}</span>
                    <span v-else>{{ sc.row.modifiedTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="sc">
                    <el-button type="primary" color="red" @click="resetPwd(sc.row.id)">重置用户密码</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>

import {onMounted, provide, reactive} from "vue";
import send from "@/http";
import {getUserList, remakePwd} from "@/api";
import Freeze from "./Freeze"
import {ElMessage} from "element-plus";



const freezeList = []
const userList = reactive([])
const resetPwd = (uid) => {
    send.post(remakePwd+uid).then(resp => {
        ElMessage.success("新密码以发送到用户邮箱");
    })
}
onMounted(() => {
    send.post(getUserList).then(resp => {
        for (const user of resp.content) {
            userList.push(user)
        }
    })

})

</script>

<style scoped>
.user-list {
    margin: 40px 0;
}
</style>