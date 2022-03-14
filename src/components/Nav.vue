<template>
    <div class="row">
        <div class="col-md-10">
            <div class="row">
                <div>
                    <ul class="nav nav-tabs">
                        <li
                            v-for="(item, index) in calist"
                            :key="index"
                            role="presentation"
                        >
                            <a href="#">{{ item.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <div class="col-md-1 col-md-offset-1 header-bg">
            <a href="#" class="thumbnail header-bg">
                <img src="@/assets/1/3.png" class="img-circle" alt=""/>
                个人中心
            </a>
        </div>
    </div>
</template>

<script>
import {reactive, provide, onMounted} from "vue";

import axios from "axios";

export default {
    setup() {
        const calist = reactive([{id:"200",name:"首页"},{id:"300",name:"全部分类"}]);
        onMounted(() => {
            axios({
                type:'get',
                url:'http://localhost:9000/category/getAllLeve1'
            }).then((resp)=>{
                console.log(resp)
                for (let i = 0; i < resp.data.content.length; i++) {
                    calist[i+2]=resp.data.content[i]
                }
            })

        })
        provide("calist",calist)
        return {
            calist,
        };

    },
};
(() => {

})();
</script>

<style scoped>
.header-bg {
    background-color: rgb(210, 211, 132);
}

/*包含以下四种的链接*/
a {
    text-decoration: none;
}

/*正常的未被访问过的链接*/
a:link {
    text-decoration: none;
}

/*已经访问过的链接*/
a:visited {
    text-decoration: none;
}

/*鼠标划过(停留)的链接*/
a:hover {
    text-decoration: none;
}

/* 正在点击的链接*/
a:active {
    text-decoration: none;
}
</style>