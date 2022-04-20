<template>
    <div class="pm">
        <ManageNav></ManageNav>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import ManageNav from "@/view/admin/ManageNav.vue"
</script>

<style scoped>
div.pm{
    position: fixed;
    width: 90%;
    height: 100%;
    overflow: auto;
    background-color: #b4cde7;
}

div.content {
    margin-left: 15%;
}
</style>