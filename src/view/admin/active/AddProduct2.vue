<!--
Codes Generated By VForm:
https://www.vform666.com
-->

<template>
    <el-form
        :model="state.formData"
        ref="vForm"
        :rules="state.rules"
        label-position="left"
        label-width="80px"
        size="large"
        @submit.prevent>
        <el-row>
            <el-col :span="12" class="grid-cell">
                <el-form-item label="一级分类" prop="cid">
                    <el-select v-model="state.formData.cid" class="full-width-input" clearable>
                        <el-option
                            v-for="(item, index) in state.cidOptions"
                            :key="index" :label="item.name"
                            :value="item.id"
                            :disabled="item.disabled"
                            @change=""
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <template v-if="state.didOptions.length !== 0">
                <el-col :span="12" class="grid-cell">
                    <el-form-item label="二级分类" prop="did">
                        <el-select v-model="state.formData.did" class="full-width-input" clearable>
                            <el-option
                                v-for="(item, index) in state.didOptions"
                                :key="index" :label="item.name"
                                :value="item.id"
                                :disabled="item.disabled"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
        <el-form-item label="商品名" prop="productName">
            <el-input v-model="state.formData.productName" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品单价" prop="productPrice">
            <el-input v-model="state.formData.productPrice" type="text" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="storeNum">
            <el-input v-model="state.formData.storeNum" type="text" clearable></el-input>
        </el-form-item>

        <v-form-render :form-json="formJson" :form-data="formData1" :option-data="optionData" ref="vFormRef">
        </v-form-render>

        <el-form-item label="预览图片" prop="previewList">
            <el-upload
                :action="uploadPreview"
                :headers="{token: store.state.token}"
                list-type="picture-card"
                show-file-list
                :limit="3"
                :on-success="previewSuccess"
            >
                <template #default>
                    <el-icon>
                        <Plus/>
                    </el-icon>
                </template>
            </el-upload>
        </el-form-item>
        <el-form-item label="详情图片" prop="detailsList">
            <el-upload
                :action="uploadDetails"
                :headers="{token: store.state.token}"
                :on-success="detailsSuccess"
                list-type="picture-card"
                show-file-list :limit="3">
                <template
                    #default>
                    <el-icon>
                        <Plus/>
                    </el-icon>
                </template>
            </el-upload>
        </el-form-item>
        <div class="productSubmit">
            <el-row>

                <el-col :span="2" :offset="9" class="grid-cell">
                    <div class="static-content-item">
                        <el-button type="primary" @click="submitForm">提交</el-button>
                    </div>
                </el-col>
                <el-col :span="2" :offset="1" class="grid-cell">
                    <div class="static-content-item">
                        <el-button type="primary" color="red" @click="resetForm">重置</el-button>
                    </div>
                </el-col>
            </el-row>
            <hr>
        </div>

    </el-form>
</template>

<script setup>
import {Plus} from "@element-plus/icons-vue"
import {
    reactive,
    getCurrentInstance, ref, onMounted, watch
} from 'vue'
import {uploadPreview, uploadDetails, renderJson, categoryLevel1, lv2, addProduct} from "@/api";
import send from "@/http";
import store from '@/store'
import {ElMessage} from "element-plus";


const state = reactive({
    formData: {
        cid: "",
        did: "",
        productName: "",
        productPrice: "",
        storeNum: "",
        productDescription: null,
        previewList: null,
        detailsList: null,
    },
    rules: {},
    cidOptions: [],
    didOptions: [],
    previewListFileList: [],
    previewListUploadHeaders: {},
    previewListUploadData: {},
    detailsListFileList: [],
    detailsListUploadHeaders: {},
    detailsListUploadData: {},
})
const instance = getCurrentInstance()
const submitForm = () => {
    vFormRef.value.getFormData().then(formData1 => {
        let product
        if (previewImageList.length !== 0) {
            product = {
                categoryId: state.formData.cid,
                ctgId: state.formData.did,
                pimg: previewImageList[0].domain + previewImageList[0].projectPath + previewImageList[0].name,
                pname: state.formData.productName,
                unitPrice: state.formData.productPrice,
                inventoryNum: state.formData.storeNum,
                description: formData1.productDescription
            }

        } else {
            product = {
                categoryId: state.formData.cid,
                ctgId: state.formData.did,
                pname: state.formData.productName,
                description: formData1.productDescription
            }
        }
        let data = {
            product: product,
            previewImage: previewImageList,
            detailImage: detailsImageList
        }
        send.post(addProduct,data).then(resp => {
            ElMessage.success("商品ID：" + resp.content)
            previewImageList.length = 0
            detailsImageList.length = 0
            resetForm()
        })

    })


}
const resetForm = () => {
    instance.ctx.$refs['vForm'].resetFields()
}

let previewImageList = []
let detailsImageList = []

const previewSuccess = (resp) => {
    previewImageList.push(resp.content)

    console.log(previewImageList)
}

const detailsSuccess = (resp) => {
        detailsImageList.push(resp.content)

}

onMounted(() => {
    send.get(categoryLevel1).then(resp => {
        for (let i = 0; i < resp.content.length; i++) {
            state.cidOptions[i] = resp.content[i]
        }
    })
})
watch(() => state.formData.cid, newCid => {
    if (state.didOptions.length !== 0) {
        state.didOptions.length = 0
    }
    send.get(lv2 + newCid).then(resp => {
        for (let i = 0; i < resp.content.length; i++) {
            state.didOptions[i] = resp.content[i]
        }
    }).catch(error => {
        console.log(error)
    })
})
// 富文本
const formJson = reactive(renderJson)
const formData1 = reactive({})
const optionData = reactive({})
const vFormRef = ref(null)


</script>

<style>
input.el-upload__input {
    width: 0;
}

.productSubmit {
    margin-bottom: 300px;
}
</style>
<style lang="scss">
.el-input-number.full-width-input,
.el-cascader.full-width-input {
    width: 100% !important;
}

.el-form-item--medium {
    .el-radio {
        line-height: 36px !important;
    }

    .el-rate {
        margin-top: 8px;
    }
}

.el-form-item--small {
    .el-radio {
        line-height: 32px !important;
    }

    .el-rate {
        margin-top: 6px;
    }
}

.el-form-item--mini {
    .el-radio {
        line-height: 28px !important;
    }

    .el-rate {
        margin-top: 4px;
    }
}

.clear-fix:before,
.clear-fix:after {
    display: table;
    content: "";
}

.clear-fix:after {
    clear: both;
}

.float-right {
    float: right;
}

</style>
<style lang="scss" scoped>
div.table-container {
    table.table-layout {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;

        td.table-cell {
            display: table-cell;
            height: 36px;
            border: 1px solid #e1e2e3;
        }
    }
}

div.tab-container {
}

.label-left-align :deep(.el-form-item__label) {
    text-align: left;
}

.label-center-align :deep(.el-form-item__label) {
    text-align: center;
}

.label-right-align :deep(.el-form-item__label) {
    text-align: right;
}

.custom-label {
}

.static-content-item {
    min-height: 20px;
    display: flex;
    align-items: center;

    :deep(.el-divider--horizontal) {
        margin: 0;
    }
}

</style>