<template>
    <div class="row" id="nav-size">
        <nav>
            <ul class="nav nav-tabs">
                <li role="presentation"
                    :class="{active : currentNav===index}"
                    v-for="(li,index) in cli"
                    :key="li.id"
                >
                    <a href="javascript:void(0)" @click="toOtherPage(li,index)">{{ li.name }}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import {reactive, onMounted, ref, onBeforeUpdate, onBeforeMount, watchEffect, watch} from "vue";
import send from "@/http/index.js";
import {useRoute, useRouter} from "vue-router"
import {categoryLevel1} from "@/api";
import store from "@/store";

onBeforeMount(() => currentNav.value = store.state.currentNav)
onMounted(() => {
    send.post(categoryLevel1).then((data) => {
        for (let i = 0; i < data.content.length; i++) {
            cli[i + 2] = data.content[i]
        }
    })

    console.log(currentNav.value)

})

const router = useRouter()
const route = useRoute()

let cli = reactive([{id: 101, name: "首页"}, {id: 102, name: "全部分类"}])
let currentNav = ref()

watch(() => route.path, (param) => {
    switch (param) {
        case '/index':
            currentNav.value = 0
            store.state.currentNav = 0
            break
        case '/all':
            currentNav.value = 1
            store.state.currentNav = 1
            break
        case '/1':
            currentNav.value = 2
            store.state.currentNav = 2
            break
        case '/2':
            currentNav.value = 3
            store.state.currentNav = 3
            break
        case '/3':
            currentNav.value = 4
            store.state.currentNav = 4
            break
        case '/4':
            currentNav.value = 5
            store.state.currentNav = 5
            break
        case '/5':
            currentNav.value = 6
            store.state.currentNav = 6
            break
        case '/6':
            currentNav.value = 7
            store.state.currentNav = 7
            break
        case '/7':
            currentNav.value = 8
            store.state.currentNav = 8
            break
        case '/8':
            currentNav.value = 9
            store.state.currentNav = 9
            break
        case '/9':
            currentNav.value = 10
            store.state.currentNav = 10
            break
        case '/10':
            currentNav.value = 11
            store.state.currentNav = 11
            break
        case '/11':
            currentNav.value = 12
            store.state.currentNav = 12
            break
        case '/12':
            currentNav.value = 13
            store.state.currentNav = 13
            break
    }

})

const toOtherPage = (item, index) => {
    if (item.name === '首页') {
        router.push('/index')
    } else if (item.name === '全部分类') {
        router.push('/all')
    } else {
        router.push('/' + item.id)
    }
}




</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

#nav-size {
    height: auto;
    margin: 10px 0 10px 0;
}

#header-bg {
    background-color: rgb(255, 255, 255);
    width: 60px;
    height: 50px;
}

a, a:hover {
    color: #7c93c5;
    text-decoration: none;
    vertical-align: middle;
}

nav ul {
    list-style: none;
    padding-left: 10px;
    margin-top: 0;
    margin-bottom: 0;
}

.my-nav a {
    display: block;
    line-height: inherit;
    cursor: pointer;
    font-size: 20px;
    height: auto;
    text-align: center;
    margin-top: 20px;
    padding: 0 10px 0 10px;
    vertical-align: middle;
}


.nav_menu-item {
    display: inline-block;
    position: relative;
}

.uc {
    float: right;
}

.uc:hover {
    cursor: pointer;
}
</style>