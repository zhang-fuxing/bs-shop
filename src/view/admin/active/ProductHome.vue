<template>
    <div class="phome">
        <div class="input-group col-md-6 col-md-offset-3">
            <input type="text" class="form-control" placeholder="搜索商品..." />
            <span class="input-group-btn">
          <button class="btn btn-default" type="button">搜索</button>
        </span>
        </div>
        <div class="tabData">
            <ProductItem></ProductItem>
        </div>
        <div class="options">

        </div>
    </div>
</template>

<script setup>
// 预览文件列表
import {Search} from "@element-plus/icons-vue"

import {reactive} from "vue";
import ProductItem from "@/view/admin/active/ProductItem.vue"
import HeaderSearch from "@/components/HeaderSearch.vue"
import {fileupload1, fileupload2} from "@/api";
import send from "@/http";


let tableData = reactive([
    {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
    },
    {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
    },
])

</script>

<style scoped>


</style>