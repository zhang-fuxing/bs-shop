<template>
    <el-row>
        <el-col :span="10" :offset="6">
            <el-input type="text">
                <template #append>
                    <el-button type="primary">搜索</el-button>
                </template>
            </el-input>
        </el-col>
    </el-row>

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
                <el-button type="primary" color="red" @click="unfreeze(sc.row.id)">解冻</el-button>
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
                <el-button type="primary" color="red" @click="freezeUser(sc.row.id)">冻结用户</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>


import {onMounted, reactive, ref} from "vue";
import send from "@/http";
import {freeze_api, getFreezeList, getUserList, unfreeze_api} from "@/api";
import {ElMessage} from "element-plus";

const freezeList = reactive([]);
const userList = reactive([])
const value1 = ref(true)

const freezeUser = (uid) => {
    send.post(freeze_api+uid).then(resp => {
        ElMessage.success("已冻结该用户")
        init()
    })
}

const unfreeze = (uid) => {
    send.post(unfreeze_api+uid).then(resp => {
        ElMessage.success("解冻成功")
        init()
    })
}
const init = () => {
    freezeList.length = 0
    userList.length = 0
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
}
onMounted(() => {
    init()
})

</script>

<style>

</style>