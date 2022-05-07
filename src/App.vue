<template>
    <div class="app-vue">
        <router-view></router-view>
    </div>
</template>

<script setup>
import {onMounted} from "vue";
import store from "@/store";

onMounted(()=>{
    if (localStorage.getItem('token') !== null) {
        store.dispatch('setToken',{token: localStorage.getItem('token')})
    }
})
</script>


<style>
body {
   background-color: black;

}
.app-vue {
    margin-left: 5%;
}
</style>
