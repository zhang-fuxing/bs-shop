<template>


    <div style="margin-top: 30px;">
        <el-button type="primary" @click="isAppend = true">添加图片</el-button>
        <div style="margin-top: 30px"></div>
        <div class="demo-image__preview">
            <template v-for="list in carouselList">
                <el-row>
                    <el-col :span="18">
                        <el-image
                            style="width: 100%; height: 400px"
                            :src="list.url"
                            :preview-src-list="srcList"
                            fit="cover"
                            z-index="9999"
                            lazy
                        />
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-button type="primary" :icon="Delete" color="red" @click="removeCarousel(list.id)"/>
                    </el-col>
                </el-row>
            </template>
        </div>

        <el-dialog
            v-model="isAppend"
            title="添加轮播"
        >
            <el-upload
                action="http://localhost:9000/carousel/append"
                drag
                :on-success="handUploadSuccess"
                multiple
            >
                <el-icon class="el-icon--upload">
                    <upload-filled/>
                </el-icon>
                <div class="el-upload__text">
                    拖拽文件到此 或<em>点击此处上传文件</em>
                </div>
            </el-upload>
        </el-dialog>
    </div>
</template>

<script setup>

import {UploadFilled, Delete} from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";
import send from "@/http";
import {carouselLists, icarouselList, removeOneCarousel} from "@/api";
import {ElMessage} from "element-plus";

const isAppend = ref(false)
const carouselList = ref([])
const srcList = ref([])

const handUploadSuccess = (resp) => {
    if (resp.code === 0) {
        ElMessage.success("上传成功")
        getCarousel()
    }
}
const removeCarousel = (id) => {
    send.post(removeOneCarousel+id).then(resp => {
        if (resp.code === 0) {
            ElMessage.success("删除成功");
            getCarousel()
        }
    })
}
const getCarousel = () => {
    send.get(icarouselList).then(resp => {
        carouselList.value.length = 0
        srcList.value.length = 0
        for (let i = 0; i < resp.content.length; i++) {
            carouselList.value.push(resp.content[i])
            srcList.value.push(resp.content[i].url)
        }
    })
}
onMounted(() => {
    getCarousel()
})
</script>

<style scoped>
.demo-image__error .image-slot {
    font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
    font-size: 30px;
}

.demo-image__error .el-image {
    width: 100%;
    height: 200px;
}


</style>

<style>
input[type=file] {
    display: none;
    width: 0;
}

.el-dialog__body > div > .el-upload {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    outline: 0;
}
</style>