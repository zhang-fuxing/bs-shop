<template>

    <template v-for="esi in estimateList">
        <hr>
        <div
            style="font-size: 20px;color: black;background-color: #be5332;margin: 0 50px;width: 300px;border-radius: 10px">
            <span style="margin-left: 20px">{{ esi.nickname }}</span>
        </div>
        <div v-html="esi.content"
             style="margin-left: 50px;background-color: #f0a1a8;width: 90%;
             border-radius: 3px;height: 200px;position: relative;overflow: auto;
             margin-top: 20px"
             class="es-content">
        </div>
    </template>
    <hr>
    <div style="margin-top: 50px">
        <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
        </v-form-render>
        <el-button type="primary" @click="submitForm" style="margin-left: 100px">添加评价</el-button>
    </div>
</template>

<script setup>
import {ref, reactive, inject, onMounted, getCurrentInstance} from 'vue'
import {ElMessage} from 'element-plus'
import {addEstimate, getEstimateByProduct} from "@/api";
import send from "@/http";


const formJson = reactive({
    "widgetList": [{
        "key": 57341,
        "type": "rich-editor",
        "icon": "rich-editor-field",
        "formItemFlag": true,
        "options": {
            "name": "estimateContent",
            "label": "",
            "placeholder": "",
            "labelWidth": null,
            "labelHidden": false,
            "contentHeight": "200px",
            "disabled": false,
            "hidden": false,
            "required": false,
            "requiredHint": "",
            "customRule": "",
            "customRuleHint": "",
            "customClass": [],
            "labelIconClass": null,
            "labelIconPosition": "rear",
            "labelTooltip": null,
            "minLength": null,
            "maxLength": null,
            "showWordLimit": false,
            "onCreated": "",
            "onMounted": "",
            "onValidate": ""
        },
        "id": "richeditor92134"
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
        "customClass": "",
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
const product = ref(inject('product'))
const estimateList = ref([])

const instance = getCurrentInstance()
const submitForm = () => {
    vFormRef.value.getFormData().then(formData => {
        // Form Validation OK

        if (JSON.stringify(formData.estimateContent) === undefined || JSON.stringify(formData.estimateContent) === null) {
            ElMessage.error("评论内容不能为空");
            return;
        }
        let data = {
            pid: product.value.id,
            content: formData.estimateContent,
            pname: product.value.pname,
            pimg: product.value.pimg,
            description: product.value.description,
        }
        send.post(addEstimate, data).then(resp => {
            if (resp.code === 0) {
                getEstimateList()
            }
        })
        instance.ctx.$refs['vForm'].resetFields()
    })
}

const getEstimateList = () => {
    send.post(getEstimateByProduct + product.value.id).then(resp => {
        if (resp.code === 1) {
            return
        }
        if (resp.code === 0) {
            for (let i = 0; i < resp.content.length; i++) {
                estimateList.value.push(resp.content[i])
            }
        }
    })
}
onMounted(() => {
    getEstimateList()
    console.log("estimate")
    console.log(estimateList.value)
})
</script>

<style>
div.es-content > p > img {
    width: 300px;
}
</style>
