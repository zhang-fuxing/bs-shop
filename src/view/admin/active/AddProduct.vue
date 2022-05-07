<template>
    <div class="add-product container">
        <h2>填写商品信息</h2>
        <form class="form-horizontal">
            <div class="form-group">
                <div style="float: left">
                    <label for="getCategory" class="control-label">分类</label>
                </div>
                <div id="getCategory">
                    <div class="col-md-5">
                        <select class="form-control" id="category" required @change="getCate2" ref="select1">
                            <option selected disabled>分类选择</option>
                            <option v-for="cate in catelist" :key="cate.id" :value="cate.id">
                                {{ cate.id + '.' + cate.name }}
                            </option>
                        </select>
                    </div>
                    <div v-if="detailList.length !== 0" class="col-md-4">
                        <select class="form-control" id="category2" ref="select2">
                            <option selected disabled>分类选择</option>
                            <option v-for="list in detailList" :key="list.id" :value="list.id">
                                {{ list.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-group" style="clear: left">
                <label for="pname" class="control-label" style="float: left">商品名</label>
                <input
                    type="text" class="col-md-5 form-control" id="pname" placeholder="请输入商品名"
                    style="width: 71%;margin-left: 20px" v-model="product.pname">
            </div>

            <div class="form-group">
                <div class="col-md-4">
                    <label for="price" class="control-label" style="float: left">单价</label>
                    <input type="text" class="col-md-5 form-control" id="price" placeholder="请输入商品价格"
                           style="width: 80%;margin-left: 20px" v-model="product.unitPrice">
                </div>

                <div class="col-md-4 col-xs-12">
                    <label for="inventoryNum" class="control-label" style="float: left">库存</label>
                    <input type="text" class="col-md-5 form-control" id="inventoryNum" placeholder="请输入商品数量"
                           style="width: 80%;margin-left: 20px" v-model="product.inventoryNum">
                </div>
            </div>

            <div class="form-group" style="clear: left">
                <div>
                    <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
                    </v-form-render>
                </div>
            </div>

            <h2>上传预览图</h2>
            <FileUpload
                :uploadUrl="'http://localhost:9000/pimage/file/1'"
            ></FileUpload>
            <h2>上传详细图</h2>
            <FileUpload
                @get-files="getListImg"
                :uploadUrl="'http://localhost:9000/pimage/file/2'"

            ></FileUpload>

            <div>
                <el-button type="primary" round @click="submit">提交</el-button>
                <el-button type="danger" round>重置</el-button>
            </div>

        </form>

    </div>
</template>

<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import send from "@/http";
import {addProduct, categoryLevel1, lv2, renderJson} from "@/api";
import Store from "@/store";
import FileUpload from "./FileUpload"
import {ElMessage} from "element-plus";


// 一级分类列表
const catelist = reactive([]);
// 二级分类列表
const detailList = reactive([]);
const product = reactive({
    pname: '',
    description: '',
    unitPrice: null,
    inventoryNum: null,

})

const select1 = ref('select1')
const select2 = ref('select2')
const data = {
    categoryId: null,
    ctgId: null,
    pname: null,
    description: null,
    unitPrice: null,
    inventoryNum: null
}


// 根据一级分类id获取二级分类信息列表
const getCate2 = () => {
    let param = document.getElementById('category').value

    send.get(lv2 + param).then(resp => {
        for (let i = 0; i < resp.content.length; i++) {
            detailList[i] = resp.content[i]
        }
        console.log(detailList)
    }).catch(error => {
        console.log(error)
    })
}
// 获取一级分类信息列表
onMounted(() => {
    send.get(categoryLevel1).then(resp => {
        for (let i = 0; i < resp.content.length; i++) {
            catelist[i] = resp.content[i]
        }
    })

})


const submit = () => {
    // 获取富文本编辑器内容
    vFormRef.value.getFormData().then(formData => {
       data.description = (JSON.stringify(formData.productDescription))
    }).catch(error => {
        // Form Validation failed
        ElMessage.error(error)
    })

}


const getListImg = (val) => {

}


// 富文本
const formJson = reactive(renderJson)
const formData = reactive({})
const optionData = reactive({})
const vFormRef = ref(null)

</script>


<style scoped>
.add-product {
    margin: 30px 10px
}
</style>