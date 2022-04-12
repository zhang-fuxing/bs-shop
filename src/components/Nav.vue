<template>
    <div class="row" id="nav-size">
        <div class="row">
            <nav class="my-nav">
                <ul class="nav_menu nav nav-pills">
                    <li
                        class="nav_menu-item"
                        role="presentation"
                        v-for="(item,index) in categoryLi"
                        :key="index"
                        :class="item.id === liAttr.preId ? liAttr.active:liAttr.noActive"
                    >
                        <a href="javascript:void(0)" @click="toOtherPage(item)">{{ item.name }}</a>
                    </li>
                    <li class="nav_menu-item uc"
                        role="presentation"
                        @click="toUserCenter"
                    >
                        <div>
                            <i class="user" @click="add">
                                <img class=" img-circle center" id="header-bg" src="@/assets/1/3.png" alt=""/><br>
                                <i>个人中心</i>
                            </i>
                        </div>
                    </li>
                </ul>
            </nav> 
        </div>
    </div>
</template>

<script>
import {reactive, onMounted} from "vue";
import send from "@/http/index.js";
import {useRouter} from "vue-router"
import {categoryLevel1} from "@/api";
import store from "@/store";

export default {
    setup() {
        let categoryLi = reactive([{id: 101, name: "首页"}, {id: 102, name: "全部分类"}])
        const liAttr = reactive({
            preId: 101,
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
            liAttr.preId = currentIndex
        }


        const router = useRouter()

        const toOtherPage = (item) => {
            setLiActive(item.id)
            if (item.name === '首页') {
                router.push('/index')
            } else if (item.name === '全部分类') {
                router.push('/all')
            } else {
                router.push('/' + item.id)
            }
        }

        const add = () => {
            store.dispatch('setToken', {token: 'zmfienasf-fejiwfnsfewa-AFWjjsaiefwf'})
        }


        return {
            liAttr,
            categoryLi,
            toOtherPage,
            setLiActive,
            add,
            token: store.getters.getToken,
            toUserCenter: (id) => {
                router.push('/center')
            }
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
    cursor:pointer;
}
</style>