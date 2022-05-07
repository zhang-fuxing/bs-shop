<template>
    <div class="login">
        <div class="login-model">

            <el-switch
                v-model="loginModel"
                class="mb-2"
                active-text="手机登录"
                inactive-text="邮箱登录"
                active-color="#409EFF"
                inactive-color="#13ce66"
                width="40"
            />

            <div>
                <el-form :model="formData" ref="vForm" label-position="left" label-width="80px"
                         size="default" @submit.prevent>
                    <el-form-item label="邮箱" prop="email" class="required label-center-align" v-if="!loginModel">
                        <el-input v-model="formData.email" type="text" clearable>
                            <template #prepend>
                                <el-icon><Message /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="手机" prop="phone" class="required label-center-align" v-if="loginModel">
                        <el-input v-model="formData.phone" type="text" clearable>
                            <template #prepend>
                                <el-icon><Iphone /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password" class="required label-center-align">
                        <el-input v-model="formData.password" type="password" :show-password="true"
                                  clearable>
                            <template #prepend>
                                <el-icon><Key /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="验证码">
                        <el-row>
                            <el-col :span="12">
                                <el-input type="text" v-model="formData.verifyCode"/>
                            </el-col>
                            <el-col :span="8" :offset="2">
                                <el-button type="text" @click="switchover(urlI)">
                                    <el-image  :src="urlI" alt="..."/>
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-button type="primary" style="width: 480px" @click="submit">登录</el-button>
                </el-form>


                <el-button type="text" color="blue">忘记密码？</el-button>
                <el-row>
                    <el-col :offset="17">
                        <el-button type="text">没有账号？前往注册<el-icon><Right /></el-icon></el-button>
                    </el-col>
                </el-row>

            </div>
        </div>
    </div>
</template>

<script setup>


import {onMounted, reactive, ref} from "vue";
import send from "@/http";

import {Right,Message,Iphone,House,Key} from "@element-plus/icons-vue";
import {login} from "@/api";
import store from "@/store";
import {useRouter} from "vue-router";

const loginModel = ref(false)
const router = useRouter()
const urlI = ref('http://localhost:9000/user/verify')
const formData = reactive({
    email: null,
    phone: null,
    password: null,
    verifyCode:null
})

const submit = () => {
    let data
    if (loginModel.value) {
        // 使用手机登录
        data = {
            phone: formData.phone,
            password: formData.password,
            verifyCode: formData.verifyCode
        }
    } else {
        // 使用邮箱登录
        data = {
            email: formData.email,
            password: formData.password,
            verifyCode: formData.verifyCode
        }
    }
    console.log(data)
    // send login request
    send.post(login,data).then(resp => {
        if (resp.code === 0 && resp.message === 'success') {
            localStorage.setItem("token",resp.content)
            store.dispatch('setToken', {token:resp.content})
            router.push('/admin/index')
        }
    })
}
const switchover = (url) => {
    urlI.value = url +'?'+Math.ceil(Math.random()*10)
}

onMounted(()=>{
    if (localStorage.getItem('token') !== null) {
        store.dispatch('setToken',{token:localStorage.getItem('token')})
        router.push('/admin/index')
    }
})
</script>

<style scoped>
div.login {
    margin-top: 10%;
    margin-left: 25%;
    width: 600px;
    height: 400px;
    background-color: #ffffff;
    border-radius: 30px;
}

.login-model {

    margin: 20px 60px 60px 60px;
}
</style>