<template>
    <div class="row" id="nav-size">
        <div class="col-md-10">
            <div class="row">
                <nav class="my-nav">
                    <ul class="nav_menu nav navbar-left navbar-collapse">
                        <li
                            class="nav_menu-item navbar-collapse"
                            role="presentation"
                            v-for="(item,index) in categoryLi"
                            :key="index"
                        >
                            <a href="javascript:void(0)" @click="toOtherPage(item)">{{ item.name }}</a>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
        <div class="col-md-1 col-md-offset-1">
            <div>
                <a href="#">
                    <img class=" img-circle" id="header-bg" src="@/assets/1/3.png" alt=""/><br>
                    <i>个人中心</i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, onMounted} from "vue";
import send from "@/http/index.js";
import {useRouter} from "vue-router"
import {categoryLevel1} from "@/api";

export default {
    setup() {
        let categoryLi = reactive([{id: 101, name: "首页"}, {id: 102, name: "全部分类"}])
        const liAttr = reactive({
            preId: -1,
            active: 'active',
            noActive: ''

        })
        onMounted(() => {
            send.post(categoryLevel1).then((data) => {
                for (let i = 0; i < data.content.length; i++) {
                    categoryLi[i + 2] = data.content[i]
                }
            })
        })
        const setLiActive = (currentIndex) => {
            liAttr.preIndex = currentIndex
        }
        const test_list = reactive([
            {id: 1, name: "首页"},
            {id: 2, name: "全部分类"},
            {id: 3, name: "3"},
            {id: 4, name: "4"},
            {id: 5, name: "5"},
            {id: 6, name: "6"},
            {id: 7, name: "7"},
            {id: 8, name: "8"}])

        const router = useRouter()

        const toOtherPage = (item) => {
            if (item.name === '首页') {
                router.push('/index')
            }
            else if (item.name === '全部分类') {
                router.push('/all_type')
            }
            else {
                router.push('/'+item.id)
            }
        }
        return {
            liAttr,
            categoryLi,
            test_list,
            toOtherPage,
            setLiActive,
        };

    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

#nav-size {
    height: auto;
}

#header-bg {
    background-color: rgb(255, 255, 255);
    width: 60px;
    height: 50px;
}

a, a:hover {
    color: #7c93c5;
    text-decoration: none
}

nav ul {
    list-style: none;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 0;
}

.my-nav a {
    display: block;
    padding: 0 16px;
    line-height: inherit;
    cursor: pointer;
    font-size: 15px;
    height: 40px;
    text-align: justify-all;
    margin-top: 20px;
    /*z-index: 9999;*/
}


.nav_menu-item {
    display: inline-block;
    position: relative;


}

.nav_menu-item:hover {
    background-color: #ffffff;
}

.nav_menu-item:hover .nav_submenu {
    display: block;
}

.nav_submenu {
    font-weight: 200;
    text-transform: none;
    display: none;
    position: absolute;
    width: 150px;
    background-color: #c54975;
    z-index: 9999;
}

.nav_submenu-item:hover {
    background: rgba(108, 69, 69, 0.1);
}
</style>