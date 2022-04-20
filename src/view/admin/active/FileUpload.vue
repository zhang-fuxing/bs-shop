<template>

    <div class="container">
        <form class="form-horizontal">
            <div class="form-group">
                <div style="float: left">
                    <label for="getCategory" class="control-label">分类</label>
                </div>
                <div id="getCategory">
                    <div class="col-md-5">
                        <select class="form-control" id="category" required @change="getCate2" ref="category">
                            <option selected disabled>分类选择</option>
                            <option v-for="cate in catelist" :key="cate.id" :value="cate.id">
                                {{ cate.id + '.' + cate.name }}
                            </option>
                        </select>
                    </div>
                    <div v-if="detailList.length !== 0" class="col-md-4">
                        <select class="form-control" id="category2">
                            <option selected disabled>分类选择</option>
                            <option v-for="list in detailList" :key="list.id" :value="list.id">
                                {{ list.id + '.' + list.name }}
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
                <label class="control-label">商品描述</label>
                <br>
                <textarea style="resize:none" cols="120" rows="10" v-model="product.description"></textarea>
            </div>

           <div class="form-group">
               <label class="btn btn-primary btn-sm" style="border-radius: 0">
                   <input type="file" style="left:-9999px;position:absolute;" multiple @change="getFileList($event)">
                   <span>选择预览图</span>
               </label>
               <br>
               <div v-if="tempList.length !== 0">
                   已选文件
                   <div class="preview">
                       <div
                           class="thumbnail" v-for="ls in tempList"
                       >
                           <img class="preview-img" :src="ls.url" alt="..." :title="ls.name">
                       </div>
                   </div>
               </div>
               <div style="clear: left"></div>
           </div>
            <div class="form-group">
                <label class="btn btn-primary btn-sm" style="border-radius: 0">
                    <input type="file" style="left:-9999px;position:absolute;" multiple @change="getFileList2($event)">
                    <span>选择详情图</span>
                </label>
                <br>
                <div v-if="tempList2.length !== 0">
                    已选文件
                    <div class="preview">
                        <div
                            class="thumbnail" v-for="ls in tempList2"
                        >
                            <img class="preview-img" :src="ls.url" alt="..." :title="ls.name">
                        </div>
                    </div>
                </div>
                <div style="clear: left"></div>
            </div>

            <br>
            <el-button type="primary" round @click="submit">提交</el-button>
            <el-button type="danger" round>重置</el-button>
        </form>
    </div>


</template>

<script setup>
// 预览文件列表
import {fileupload1, fileupload2} from "@/api";
import {onMounted, reactive, ref, watch} from "vue";
import send from "@/http/index.js";
import {addProduct, categoryLevel1, lv2} from "@/api";


// 一级分类列表
let catelist = reactive([]);
// 二级分类列表
let detailList = reactive([]);

// 根据一级分类id获取二级分类信息列表
const getCate2 = () => {
    let param = document.getElementById('category').value
    const category = ref(null)
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

const product = reactive({
    pname: '',
    description: '',
    unitPrice: 0.0,
    inventoryNum: 0,

})
const submit = () => {
    let data = {
        categoryId: document.getElementById('category').value,
        ctgId: document.getElementById('category2').value,
        pname: product.pname,
        description: product.description,
        unitPrice: product.unitPrice,
        inventoryNum: product.inventoryNum
    }
    send.post(addProduct,data).then(resp => {
        if (resp.code === 0) {
            alert('添加成功')
        }
    })
}







let fileList = reactive([])
// 预览文件临时列表，存储url和名字
let tempList = reactive([])

// 商品详情文件列表
let fileList2 = reactive([])
// 商品详情文件临时列表，存储url和名字
let tempList2 = reactive([])

// 获取上传的预览图片文件列表
const getFileList = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
        fileList[i] = e.target.files[i]
        tempList[i] = {url: URL.createObjectURL(e.target.files[i]), name: e.target.files[i].name}
    }
    send.fileupload(fileupload1, fileList).then(resp => {
        if (resp.code === 0 && resp.message === 'success') {
            alert("上传成功")
        } else {
            alert("上传失败")
        }

    })
}

// 获取上传的商品详情描述图片文件列表
const getFileList2 = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
        fileList2[i] = e.target.files[i]
        tempList2[i] = {url: URL.createObjectURL(e.target.files[i]), name: e.target.files[i].name}
    }
    send.fileupload(fileupload2, fileList).then(resp => {
        if (resp.code === 0 && resp.message === 'success') {
            alert("上传成功")
        } else {
            alert("上传失败")
        }

    })
}




////////////////////////////////////////////////////////////////////////////////////////////
// 根据商品id查询出需要修改的商品

</script>

<style scoped>
.thumbnail {
    margin: 0;
    padding: 0;
    width: 240px;
    height: 220px;
    float: left;
    border: 1px solid white;
    border-radius: 3px;
}

.preview-img {
    margin: 0;
    padding: 0;
    width: 240px;
    height: 220px;

}

</style>