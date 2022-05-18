<template>
    <el-col :span="4">
        <h2 class="mb-2">I-SHOP后台管理</h2>
<!--        unique-opened-->
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="currentIndex"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
            router
        >
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <location/>
                    </el-icon>
                    <span>商品管理</span>
                </template>
                <el-menu-item index="index">商品列表</el-menu-item>
                <el-menu-item index="addProduct">添加商品</el-menu-item>
                <el-menu-item index="orderProcessing">订单处理</el-menu-item>
                <el-menu-item index="recommend">推荐商品</el-menu-item>
                <el-menu-item index="carousel">轮播管理</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <icon-menu/>
                    </el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="userList">
                    用户列表
                </el-menu-item>
                <el-menu-item index="freeze">
                    冻结管理
                </el-menu-item>
            </el-sub-menu>

        </el-menu>
    </el-col>
</template>

<script setup>
import {ref, watch} from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import {useRoute} from "vue-router";


const route = useRoute()

const currentIndex = ref('index')


watch(()=>route.path,newPath => {
     let str = newPath.split('/');
     currentIndex.value = str[str.length-1]
})

const handleOpen = (key, keyPath) => {

}
const handleClose = (key, keyPath) => {

}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
