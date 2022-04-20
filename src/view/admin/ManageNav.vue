<template>
    <nav>
        <ul class="nav nav-tabs nav-stacked">
            <li role="presentation" :class="{active : currentNav === 'home'}">
                <a href="javascript:void(0);" @click="changeNav('home')">首页</a>
            </li>
            <li role="presentation" :class="{active : currentNav === 'addProduct'}">
                <a href="javascript:void(0);" @click="changeNav('addProduct')">添加商品</a>
            </li>
            <li role="presentation" :class="{active : currentNav === 'updateProduct'}">
                <a href="javascript:void(0);" @click="changeNav('updateProduct')">修改商品</a>
            </li>
        </ul>
    </nav>
</template>

<script setup>

import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";

const router = useRouter();
let currentNav = ref('home')

const changeNav = (target) => {
    switch (target) {
            case 'home':
                router.push('/admin/index')
                currentNav.value = target
                break
            case 'addProduct':
                router.push('/admin/addProduct')
                currentNav.value = target
                break
            case 'updateProduct':
                router.push('/admin/updateProduct')
                currentNav.value = target
                break
    }
}

</script>

<style scoped>
nav  {
    position: fixed;
    width: 10%;
    height: 100%;
}

</style>