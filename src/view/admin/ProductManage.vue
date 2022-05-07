<template>
    <div class="pm">
        <el-row>
            <ManageNav></ManageNav>
<!--            <div class="content">

            </div>-->
            <el-col :span="20">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import ManageNav from "@/view/admin/ManageNav.vue"
</script>

<style scoped>
div.pm {
    position: fixed;
    width: 90%;
    height: 100%;
    overflow: auto;
    background-color: #ffffff;
}

div.content {
    margin-left: 15%;
}
</style>