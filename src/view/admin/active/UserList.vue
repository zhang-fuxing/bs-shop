<template>
    <div class="user-list">
        <h2> 用户信息列表</h2>

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
                    <el-button type="primary" color="red">重置用户密码</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>

import {onMounted, provide, reactive} from "vue";
import send from "@/http";
import {getUserList} from "@/api";
import Freeze from "./Freeze"



const freezeList = []
const userList = reactive([])
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