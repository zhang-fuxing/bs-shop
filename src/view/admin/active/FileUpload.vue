<template>

    <!--          :on-change="handleUploadSuccess"  -->
    <div>
        <el-upload
            :action="props.uploadUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-error="handleUploadSuccess"
            :on-success="handleUploadSuccess"
        >
            <el-icon>
                <Plus/>
            </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image"/>
        </el-dialog>

    </div>
</template>

<script setup>

import {Plus} from "@element-plus/icons-vue"
import {reactive, ref} from "vue";
import Store from "@/store";

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const props = defineProps(['uploadUrl'])


const handleRemove = (uploadFile, uploadFiles) => {
    alert(uploadFile)
}

const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true

}
const handleUploadSuccess = (resp, v1, v2) => {
    if (resp.content.imgType === 1)
        Store.dispatch('setPreviewList', resp.content)
    if (resp.content.imgType === 2)
        Store.dispatch('setDetailList',resp.content)

}


</script>

<style scoped>

</style>
<style>
input.el-upload__input {
    display: none;
    width: 0;
}
</style>