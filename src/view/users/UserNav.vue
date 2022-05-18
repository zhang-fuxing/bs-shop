<template>

    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false" v-show="isCollapse" style="background-color: #719dc9">展开</el-radio-button>
        <el-radio-button :label="true" v-show="!isCollapse" style="width: 200px">收起</el-radio-button>
    </el-radio-group>
    <el-menu
        default-active="/center/home"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        router
        @open="handleOpen"
        @close="handleClose"
    >

        <el-menu-item index="/center/home">
            <el-icon>
                <icon-menu/>
            </el-icon>
            <template #title>
                个人中心
            </template>
        </el-menu-item>

        <el-menu-item index="/center/address">
            <el-icon>
                    <location/>
            </el-icon>
            <template #title>
                    地址管理
            </template>
        </el-menu-item>

        <el-sub-menu index="3">
            <template #title>
                <el-icon>
                    <document/>
                </el-icon>
                <span>我的订单</span>
            </template>
            <el-menu-item-group>
                <template #title></template>
                <el-menu-item index="/center/waitOrder">
                        待发货
                </el-menu-item>
                <el-menu-item index="/center/receivedOrder">
                        待收货
                </el-menu-item>
                <el-menu-item index="/center/receivedOrder2">
                    已收货
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>

        <el-menu-item index="/center/accountManage">
            <el-icon>
                <setting/>
            </el-icon>
            <template #title>
                    账号管理
            </template>
        </el-menu-item>
        <el-menu-item index="/center/estimate">
            <el-icon>
                <ChatDotSquare/>
            </el-icon>
            <template #title>
                评价管理
            </template>
        </el-menu-item>

    </el-menu>
</template>

<script setup>
import {ref} from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    ChatDotSquare
} from '@element-plus/icons-vue'


const isCollapse = ref(true)
const handleOpen = (key, keyPath) => {
    console.log(key)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-radio-button__inner {
    background-color: #4acfff;
    width: 100%;
    color: white;
}
</style>
