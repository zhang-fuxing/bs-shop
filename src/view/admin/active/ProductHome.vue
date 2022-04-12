<template>
    <input type="file" multiple @change="getFileList($event)">

    <div class="preview" v-if="tempList.length !== 0">
        <div
            class="thumbnail" v-for="ls in tempList"
        >
            <img class="preview-img" :src="ls.url" alt="..." :title="ls.name">
        </div>
    </div>

    <div style="clear: left"></div>
    <input type="button" @click="upload" value="上传">

</template>

<script>
import send from "@/http";
import {ElMessage, UploadProps, UploadUserFile} from "element-plus";
import {Plus} from "@element-plus/icons-vue"
import {ref, reactive, onMounted} from "vue";
import {fileupload} from "@/api";

export default {
    name: "ProductHome",
    components: {Plus},
    setup() {
        let fileList = reactive([])
        let tempList = reactive([])
        const getFileList = (e) => {
            for (let i = 0; i < e.target.files.length; i++) {
                fileList[i] = e.target.files[i]
                tempList[i] = {url: URL.createObjectURL(e.target.files[i]), name: e.target.files[i].name}
            }
        }

        const upload = () => {
            send.fileupload(fileupload,fileList).then(resp => {
                if (resp.code === 0 && resp.message==='success') {
                    alert("上传成功")
                } else {
                    alert("上传失败")
                }

            })
        }
        return {
            fileList,
            tempList,
            getFileList,
            upload
        }
    }

}
</script>

<style scoped>
.preview {
    position: absolute;
    margin: 0 4%;

    height: 30%;
    overflow: auto;
    background-color: white;
}

.thumbnail {
    float: left;
    margin: 10px 5px 0 5px;
    padding: 0;
}

.preview-img {
    width: 240px;
    height: 200px;
}
</style>