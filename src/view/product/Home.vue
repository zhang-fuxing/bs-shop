<template>
    <div class="home">
        <!-- 顶部导航 -->
        <Header></Header>
        <!-- 同步搜索框 -->
        <HeaderSearch></HeaderSearch>
        <!-- 分类导航 -->
        <Nav></Nav>

        <!-- 轮播图 -->
        <div class="row">
            <!-- 轮播图 -->
            <div class="col-md-8">
                <!-- 点击轮播 -->
                <div id="myCarousel" class="carousel slide">
                    <!-- 轮播（Carousel）项目 -->
                    <div class="carousel-inner">
                        <div class="item active">
                            <img src="@/assets/1/4.png" alt=""/>
                        </div>
                        <div class="item">
                            <img src="@/assets/1/5.jpg" alt=""/>
                        </div>
                        <div class="item">
                            <img src="@/assets/1/6.jpg" alt=""/>
                        </div>
                    </div>
                    <!-- 轮播（Carousel）导航 -->
                    <div>
                        <a
                            class="left carousel-control"
                            href="#myCarousel"
                            role="button"
                            data-slide="prev"
                        >
              <span
                  class="glyphicon glyphicon-chevron-left"
                  aria-hidden="true"
              ></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a
                            class="right carousel-control"
                            href="#myCarousel"
                            role="button"
                            data-slide="next"
                        >
              <span
                  class="glyphicon glyphicon-chevron-right"
                  aria-hidden="true"
              ></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <nav class="my-nav">
                    <ul class="nav_menu nav nav-tabs">
                        <li class="nav_menu-item" role="presentation">
                            <a href="" target="_blank">Services</a>
                            <ul class="nav_submenu nav nav-tabs">
                                <li class="nav_submenu-item"
                                    v-for="(item, index) in list"
                                    :key="index"
                                    role="presentation"
                                >
                                    <a href="#">{{ item.name }}</a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>


    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HeaderSearch from "@/components/HeaderSearch.vue";
import Category from "@/components/Category.vue";
import Nav from "@/components/Nav.vue";
import {useStore} from 'vuex'
import {reactive, inject, onMounted, provide} from "vue";
import axios from "axios";

export default {
    components: {
        Header,
        HeaderSearch,
        Nav,
    },
    setup() {
        const store = useStore()
        const addToken = () => {
            store.dispatch('setToken', {token: 'zfiwnwiahgsdfoiwef'})
            alert('添加成功')
        }
        const showToken = () => {
            alert(store.getters.getToken())
            alert(localStorage.getItem('token'))

        }

        const remove = () => {
            store.dispatch('removeToken')
            localStorage.clear()
            alert('移除成功')

        }

        const list=reactive([])
        onMounted(() => {
            axios({
                type:'get',
                url:'http://localhost:9000/category/getAllLeve1'
            }).then((resp)=>{
                console.log(resp)
                for (let i = 0; i < resp.data.content.length; i++) {
                    list[i]=resp.data.content[i]
                }
            })

        })

        return {
            addToken,
            showToken,
            remove,
            list,
        }
    },
};
</script>

<style scoped>
.item > img {
    width: 800px;
    height: 400px;
}

a, a:hover {
    color: #FFF;
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
}

/*.nav_menu {
    line-height: 45px;
    font-weight: 700;
    text-transform: uppercase;
}*/

.nav_menu-item {
    display: inline-block;
    position: relative;

}

.nav_menu-item:hover {
    background-color: #5ebcc9;
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
    background-color: #b2b154;
}

.nav_submenu-item:hover {
    background: rgba(0, 0, 0, 0.1);
}
</style>