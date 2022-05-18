<template>


    <div class="file-header">
        <p class="am-title">更换头像</p>
        <el-upload
            class="avatar-uploader"
            :action="uploadURL"
            :headers="{token:store.state.token}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
            <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
                <p>
                    <Upload/>
                </p>
                <p>选择头像</p>
            </el-icon>
        </el-upload>
    </div>

    <div id="emailMa">
        <p class="am-title">昵称更换</p>
        <el-input clearable>
            <template #prepend>
                昵称
            </template>
            <template #append>
                <el-button>修改</el-button>
            </template>
        </el-input>
    </div>

    <div id="emailMa">
        <p class="am-title">邮箱管理</p>
        <el-input clearable>
            <template #prepend>
                邮箱地址
            </template>
            <template #append>
                <el-button>修改邮箱</el-button>
            </template>
        </el-input>
    </div>

    <div id="pwdMa">
        <p class="am-title">密码修改</p>
        <el-input
            v-model="password0"
            type="password"
            placeholder="请输入原密码"
            show-password
            clearable
        >
            <template #prepend>
                原密码:
            </template>
        </el-input>

        <el-input
            v-model="password1.firstinput"
            type="password"
            placeholder="请输入新密码"
            show-password
            clearable
        >
            <template #prepend>
                新密码:
            </template>
        </el-input>
        <el-input
            v-model="password1.secondinput"
            type="password"
            placeholder="请再次输入新密码"
            show-password
            clearable
        >
            <template #prepend>
                确认密码:
            </template>
        </el-input>
        <br>
        <el-button
            type="primary"
            @click="submitPassword"
            style="margin-left: 10px"
        >
            提交修改
        </el-button>
    </div>


    <div id="birMa">
        <p class="am-title">生日修改</p>
        <div class="block">
            <el-date-picker v-model="birthday" type="date" placeholder="选择日期" />
            <br>
            <br>
            <el-button type="primary">修改</el-button>
        </div>
    </div>

    <div id="sexMa">
        <p class="am-title">性别管理</p>
        <el-radio-group v-model="sex">
            <el-radio :label="-1">保密</el-radio>
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
        </el-radio-group>
        <br>
        <br>
        <el-button type="primary">修改性别</el-button>
    </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {Plus, Upload} from '@element-plus/icons-vue'
import store from "@/store";
import send from "@/http";
import {updatePassword} from "@/api";

const imageUrl = ref('')
let password0 = ref('')
let password1 = reactive({
    firstinput: '',
    secondinput:''

})
const birthday = ref(null)
const sex = ref(-1)
const uploadURL = ref('http://localhost:9000/cimage/header')

const handleAvatarSuccess = (response, uploadFile) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw)
}
const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
const submitPassword = () => {
    if (password1.firstinput !== password1.secondinput) {
        ElMessageBox.alert("两次新密码不一致");
        return
    }
  send.post(updatePassword,{oldPassword: password0,newPassword:password1.firstinput}).then(resp => {
      if (resp.code === -1) {
          ElMessage.error("原密码错误")
      }
  })
}
</script>


<style scoped>
.avatar-uploader .avatar {
    width: 100px;
    height: 100px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon .avatar-uploader-icon {
    font-size: 28px;
    color: #4690ff;
    width: 100px;
    height: 100px;
    text-align: center;
}

.file-header {
    margin-top: 20px;
}


.el-input {
    width: 60%;
    margin: 10px 0 10px 10px;
}

.am-title {
    text-align: center;
    font-size: 25px;
    color: white;
    background-color: #429187;
    border-radius: 20px;
    width: 20%;
    height: 30px;
    margin: 20px 0;
}
</style>


<style>
.el-upload__input {
    width: 0;
    height: 0;
}

.avatar-uploader-icon {
    font-size: 15px;
    color: #1e1a21;
    width: 100px;
    height: 100px;
    text-align: center;
    border: #6bc7dc solid;
    border-radius: 20px;
    margin-left: 30px;
}
</style>