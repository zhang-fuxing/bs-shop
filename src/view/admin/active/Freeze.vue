<template>
    Freeze.vue
    <br>
    <span>用户状态: </span>
    <el-switch
        v-model="value1"
        class="mb-2"
        active-text="已冻结"
        inactive-text="未冻结"
        active-color="#409EFF"
        inline-prompt
        inactive-color="#13ce66"
        width="60"
    />


    <el-table :data="freezeList" stripe v-if="value1">
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
                        v-if="sc.row.modifiedTime === null || sc.row.modifiedTime === undefined">{{
                            sc.row.createdTime
                        }}</span>
                <span v-else>{{ sc.row.modifiedTime }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="sc">
                <el-button type="primary" color="red">解冻</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-table :data="userList" v-if="!value1" stripe>
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
                        v-if="sc.row.modifiedTime === null || sc.row.modifiedTime === undefined">{{
                            sc.row.createdTime
                        }}</span>
                <span v-else>{{ sc.row.modifiedTime }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="sc">
                <el-button type="primary" color="red">冻结用户</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>


import {onMounted, reactive, ref} from "vue";
import send from "@/http";
import {getFreezeList, getUserList} from "@/api";

const freezeList = reactive([]);
const userList = reactive([])
const value1 = ref(true)
onMounted(() => {

    send.post(getFreezeList).then(rs => {
        for (let user of rs.content) {
            freezeList.push(user)
        }
    })

    send.post(getUserList).then(resp => {
        for (const user of resp.content) {
            if (user.userStatus === 1)
                userList.push(user)
        }
    })


})

</script>

<style>

</style>