<template>
    <div id="estimate">
        评价管理
        <div class="demo-collapse">
            <el-collapse v-model="activeNames" @change="handleChange">
                <template v-for="es in estimates">
                    <el-collapse-item :name="es.id">
                        <template #title>
                            <img :src="es.pimg" alt="..." style="width: 100px;height: 100px">
                            <p class="title-content">{{ es.pname }}</p>
                            <p class="title-content" v-html="es.description">
                            </p>
                        </template>

                        <p>我的评价</p>
                        <div class="context">
                            <span v-html="es.content"></span>
                        </div>

                        <div class="options">
                            <el-button type="danger" style="margin-right: 20px">删除</el-button>
                            <el-button type="primary" style="margin-right: 20px">修改</el-button>
                        </div>
                    </el-collapse-item>
                </template>

            </el-collapse>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import send from "@/http";
import {estimateSet} from "@/api";

const activeNames = ref([])

const handleChange = (val) => {

}

const estimates = ref([])

const getEstimate = () => {
    send.post(estimateSet).then(resp => {
        estimates.value.length = 0
        for (let i = 0; i < resp.content.length; i++) {
            estimates.value.push(resp.content[i])
        }
    })
}

onMounted(() => {
    getEstimate()
})

</script>

<style>
div.context > span > p > img {
    width: 300px;
}

.el-collapse-item__header {
    height: 120px;
    background-color: #e8d8da;
}

.el-collapse-item__content {
    background-color: #999999;
}

</style>

<style scoped>


#estimate {
    margin: 20px 0 10px 0;
    background-color: #22d0c2;
    border-radius: 10px;
    padding: 10px 0;
    font-size: 20px;
    color: #1f2f3d;
}

.demo-collapse {
    margin: 20px 2%;
}

p.title-content {
    margin: 0 10px;
}


.el-collapse-item {
    margin: 10px;
}

.context {
    margin: 10px;
}

.options {
    margin-left: 35%;
}


</style>