<template>
    <div style="margin-top: 20px">
        <el-row>
            <el-col :span="4">当前时间 {{currentDate}}</el-col>
            <el-col :span="16">
                <el-input v-model="searchContent" placeholder="搜索一下">
                    <template #append>
                        <el-button type="primary" :icon="Search">Search</el-button>
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <template v-if="productList.length ===0">
            <el-empty description="description"/>
        </template>
        <template v-else>
            <el-row>
                <el-table
                    :data="productList"
                    stripe
                >
                    <el-table-column prop="id" label="商品ID" width="100"/>
                    <el-table-column prop="pname" label="商品名" width="250"/>
                    <el-table-column label="预览图" width="100">
                        <template #default="scope">
                            <img :src="scope.row.pimg" alt="" style="height: 100px">
                        </template>
                    </el-table-column>
                    <el-table-column label="商品描述" width="200">
                        <template #default="scope">
                            <p>{{ scope.row.description }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="unitPrice" label="单价" width="100"/>
                    <el-table-column prop="inventoryNum" label="库存" width="100"/>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button type="primary" :icon="Edit" @click="editProductInfo(scope.row)">编辑</el-button>
                            <el-button type="success" :icon="List">详情</el-button>
                            <el-button type="danger" :icon="Delete">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-row>

            <el-pagination
                :page-size="page.pageSize"
                :total="pageTotal"
                layout="prev, pager, next"

                @current-change="pageChange"
            />
        </template>
    </div>


    <el-dialog
        v-model="dialogVisible"
        title="修改商品"
        width="80%"
        :before-close="handleClose"
        center
    >
        <UpdateProduct :product="product"></UpdateProduct>
        <template #footer>
          <span class="dialog-footer">
             <div class="productSubmit">
                <el-row>
                    <el-col :span="2" :offset="9" class="grid-cell">
                        <div class="static-content-item">
                            <el-button type="primary" @click="dialogVisible = false">提交</el-button>
                        </div>
                    </el-col>
                    <el-col :span="2" :offset="1" class="grid-cell">
                        <div class="static-content-item">
                            <el-button type="primary" color="red" @click="dialogVisible = false">取消</el-button>
                        </div>
                    </el-col>
                </el-row>
                <hr>
            </div>
          </span>
        </template>
    </el-dialog>
</template>

<script setup>
// 预览文件列表
import {Search, Delete, Edit, List, Plus} from "@element-plus/icons-vue"
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import {fileupload1, fileupload2, productCount, products} from "@/api";
import send from "@/http";
import {ElMessageBox} from 'element-plus'
import {useRouter} from "vue-router";
import UpdateProduct from './UpdateProduct'


const searchContent = ref();
const page = {
    currentPage: null,
    pageSize: null,
    cid: null,
    did: null,
}
const productList = reactive([])
const dialogVisible = ref(false)
const router = useRouter()
const product = ref({})
const pageTotal = ref()
const date = new Date()
const currentDate = ref(date.toLocaleTimeString())

const getProductList = (page) => {
    send.post(products, page).then(resp => {
        if (productList.length !== 0) {
            productList.length = 0;
        }
        for (let i = 0; i < resp.content.length; i++) {
            productList.push(resp.content[i])
        }
    })
}
const editProductInfo = (row) => {
    dialogVisible.value = true;
    product.value = row
}

const handleClose = () => {
        ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            dialogVisible.value = false
        })
        .catch(() => {
            // catch error
        })
}

const pageChange = (nextPage) => {
    page.currentPage = nextPage
    page.pageSize = 10
    getProductList(page)

}
const getPageTotal = () => {
    return  send.get(productCount).then(resp => {
        return resp.content
    })


}

onMounted(async () => {
    page.currentPage = 1;
    page.pageSize = 10;
    getProductList(page);
    pageTotal.value = (await getPageTotal())
    console.log(pageTotal.value)
})


</script>

<style scoped>
p {
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
}

.el-row {
    margin: 10px 5px;

}

.el-button + .el-button {
    margin-left: 5px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
