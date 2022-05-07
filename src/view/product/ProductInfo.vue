<template>
    <div v-for="img in detailList" :key="img.id">
        <img :src="img.domain+img.projectPath+img.name" alt="">
    </div>
</template>

<script setup>

// 接收信息
import {inject} from "vue";

const detailList = inject('detailList')
</script>

<style scoped>
img {
    margin-left: 20%;
}
</style>