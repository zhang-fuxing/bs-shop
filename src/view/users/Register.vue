<template>

    <div class="reg-user">
        <router-link to="/index" style="margin-left: 10px">[返回首页<el-icon><House /></el-icon>]</router-link>
        <el-row>
            <el-col :offset="11">
                <h2 style="color: #0cb2ec">注 册</h2>
            </el-col>
        </el-row>
        <el-form
            v-model="regUser"
            label-position="left"
            label-width="80px"
            size="default"
            @submit.prevent
        >

            <el-form-item label="用户昵称" prop="nickname" class="label-center-align required">
                <el-input v-model="regUser.nickname" type="text" clearable placeholder="用户用户昵称">
                </el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="nickname" class="label-center-align">
                <el-input v-model="regUser.uname" type="text" clearable placeholder="用户名不可重复" @change="checkUnames">
                </el-input>
            </el-form-item>

            <el-form-item label="手机*" prop="phone" class="label-center-align required">
                <el-input v-model="regUser.phone" type="text" clearable placeholder="请输入电话号码" @change="checkPhones"/>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" class="label-center-align">
                <el-input v-model="regUser.email" clearable placeholder="请输入您的邮箱" type="text" @change="checkEmails"/>
            </el-form-item>
            <el-form-item label="密码*" prop="password" class="label-center-align required">
                <el-input type="password" :show-password="true" v-model="regUser.password" clearable placeholder="请输入您的登录密码"/>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="生日" prop="date47153">
                        <el-date-picker
                            v-model="regUser.birthday"
                            type="date" class="full-width-input"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                            clearable placeholder="例：2000-01-01"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                    <el-form-item label="性别">
                        <el-radio-group v-model="regUser.sex" size="default ">
                            <el-radio-button :label="-1" >保密</el-radio-button>
                            <el-radio-button :label="1">男</el-radio-button>
                            <el-radio-button :label="0" >女</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="验证码*">
                <el-row>
                    <el-col :span="14">
                        <el-input type="text"/>
                    </el-col>
                    <el-col :span="8" :offset="2">
                        <el-button type="text" @click="switchover(urlI)">
                            <el-image  :src="urlI" alt="..."/>
                        </el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-button type="primary" style="width: 520px" @click="submit">注册</el-button>
        </el-form>
        <br>
        <router-link to="/login">返回登录</router-link>
    </div>
</template>

<script setup>
import Header from "@/components/Header.vue"
import {Right,Message,Iphone,House,Key} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import send from "@/http";
import {checkEmail, checkPhone, checkUname} from "@/api";
import {ElMessage} from "element-plus";
const urlI = ref('http://localhost:9000/user/verify')
const regUser = reactive({
    nickname:'',
    phone:'',
    email:'',
    uname:'',
    password:'',
    sex: -1,
    birthday:'',
})
const switchover = (url) => {
    urlI.value = url +'?'+Math.ceil(Math.random()*10)
}

const checkEmails = () => {
    send.get(checkEmail+regUser.email).then(rs => {
        if (rs.code === -1) {
            ElMessage.error(rs.message)
        }
    })
}
const checkUnames = () => {
    send.get(checkUname+regUser.uname).then(rs => {
        if (rs.code === -1) {
            ElMessage.error(rs.message)
        }
    })
}
const checkPhones = () => {
    send.get(checkPhone+regUser.phone).then(rs => {
        if (rs.code === -1) {
            ElMessage.error(rs.message)
        }
    })
}

const submit = () => {
    send.post(register,regUser).then(resp => {
        console.log(resp)
    })
}
</script>
<style scoped>
.reg-user {
    width: 600px;

    background-color: white;
    padding: 20px;
    border-radius: 30px;
    margin-left: 25%;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>