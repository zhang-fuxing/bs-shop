<template>
    <div class="add-product container">
        <form class="form-horizontal">
            <div class="form-group">
                <div style="float: left">
                    <label for="getCategory" class="control-label">分类</label>
                </div>
                <div id="getCategory">
                    <div class="col-md-5">
                        <select class="form-control" id="category" required @change="getCate2">
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

            <el-button type="primary" round @click="submit">提交</el-button>
            <el-button type="danger" round>重置</el-button>
        </form>

    </div>
</template>

<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import send from "@/http";
import {addProduct, categoryLevel1, lv2} from "@/api";


// 一级分类列表
let catelist = reactive([]);
// 二级分类列表
let detailList = reactive([]);

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

</script>


<style scoped>
/*.file input {*/
/*    position: absolute;*/
/*    font-size: 100px;*/
/*    right: 0;*/
/*    top: 0;*/
/*    opacity: 0;*/
/*}*/
</style>