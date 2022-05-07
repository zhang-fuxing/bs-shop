<template>
    <div class="rc-product">
        <h2>商品推荐管理</h2>
        <hr>
        <el-button type="primary" @click="dialogVisible = true">添加推荐商品</el-button>
        <hr>
        <el-table :data="rcList" stripe :default-sort="{prop: 'pid'}">
            <el-table-column prop="pid" label="商品ID" width="100" sortable></el-table-column>
            <el-table-column label="商品详情" width="300">
                <template #default="sc">
                    <img :src="sc.row.pimg" alt=".." style="width: 200px;height: 100px;">
                    <p>{{ sc.row.pname }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="floor" label="推荐楼层" width="120" sortable/>
            <el-table-column prop="price" label="商品价格" width="120" sortable/>
            <el-table-column label="修改时间" width="200">
                <template #default="sc">
                    <span
                        v-if="sc.row.modifiedTime === null || sc.row.modifiedTime === undefined">{{
                            sc.row.createTime
                        }}</span>
                    <span v-else>{{ sc.row.modifiedTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="sc">
                    <el-button type="primary" color="red">取消推荐</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog
            v-model="dialogVisible"
            title="添加"
            width="30%"
        >
            <div>
                <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
                </v-form-render>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm">确定</el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>

import {onMounted, reactive, ref} from "vue";
import send from "@/http";
import {rmlist} from "@/api";

const rcList = reactive([])
const dialogVisible = ref(false)

const formJson = reactive({
    "widgetList": [{
        "key": 68217,
        "type": "grid",
        "category": "container",
        "icon": "grid",
        "cols": [{
            "type": "grid-col",
            "category": "container",
            "icon": "grid-col",
            "internal": true,
            "widgetList": [{
                "key": 30558,
                "type": "input",
                "icon": "text-field",
                "formItemFlag": true,
                "options": {
                    "name": "productId",
                    "label": "商品id",
                    "labelAlign": "label-center-align",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "请输入商品的id",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": false,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                },
                "id": "input59317"
            }],
            "options": {
                "name": "center1",
                "hidden": false,
                "span": 24,
                "offset": 0,
                "push": 0,
                "pull": 0,
                "responsive": false,
                "md": 12,
                "sm": 12,
                "xs": 12,
                "customClass": []
            },
            "id": "grid-col-37041"
        }],
        "options": {"name": "grid115752", "hidden": false, "gutter": 24, "colHeight": null, "customClass": []},
        "id": "grid115752"
    }, {
        "type": "grid",
        "category": "container",
        "icon": "grid",
        "cols": [{
            "type": "grid-col",
            "category": "container",
            "icon": "grid-col",
            "internal": true,
            "widgetList": [{
                "key": 30558,
                "type": "input",
                "icon": "text-field",
                "formItemFlag": true,
                "options": {
                    "name": "floorNum",
                    "label": "推荐楼层",
                    "labelAlign": "label-center-align",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "首页第几楼展示",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": false,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                },
                "id": "input90931"
            }],
            "options": {
                "name": "gridCol26534",
                "hidden": false,
                "span": 24,
                "offset": 0,
                "push": 0,
                "pull": 0,
                "responsive": false,
                "md": 12,
                "sm": 12,
                "xs": 12,
                "customClass": ""
            },
            "id": "grid-col-26534"
        }],
        "options": {"name": "grid51588", "hidden": false, "gutter": 24, "colHeight": null, "customClass": ""},
        "id": "grid51588"
    }],
    "formConfig": {
        "modelName": "formData",
        "refName": "vForm",
        "rulesName": "rules",
        "labelWidth": 80,
        "labelPosition": "left",
        "size": "",
        "labelAlign": "label-left-align",
        "cssCode": "",
        "customClass": [],
        "functions": "",
        "layoutType": "PC",
        "jsonVersion": 3,
        "onFormCreated": "",
        "onFormMounted": "",
        "onFormDataChange": ""
    }
})
const formData = reactive({})
const optionData = reactive({})
const vFormRef = ref(null)

onMounted(() => {
    send.post(rmlist).then(resp => {
        for (let i = 0; i < resp.content.length; i++) {
            rcList.push(resp.content[i])
        }
    })
})


const submitForm = () => {
    dialogVisible.value = false
    vFormRef.value.getFormData().then(formData => {
        alert(JSON.stringify(formData))
    }).catch(error => {

    })
}
</script>

<style scoped>
.rc-product {
    margin: 40px 0;
}
</style>