<template>
    <div id="user-home">
        <div class="header-user">

            <div>
                <el-card :body-style="{ padding: '0px' }">
                    <img
                        :src="user.headImg"
                        class="image"
                    />
                    <div style="padding: 14px;margin-left: 25%">
                        <p style="font-size: 30px;">UID: 1521046151021072384</p>
                        <p style="font-size: 30px;">用户名: {{ user.uname }}</p>
                        <p style="font-size: 30px;">昵称: {{ user.nickname }}</p>
                        <p style="font-size: 30px;">生日: {{ user.birthday }}</p>
                        <p style="font-size: 30px;">
                            性别: <span v-if="user.sex === 1">男</span>
                            <span v-if="user.sex === 0">女</span>
                            <span v-if="user.sex === -1">保密</span>
                        </p>
                    </div>
                </el-card>
            </div>

            <div>
                <el-card class="box-card">
                    <p style="font-size: 20px">联系方式: {{ user.phone }}</p>
                    <p style="font-size: 20px">邮箱地址: {{ user.email }}</p>
                    <div>
                        <p style="font-size: 20px">默认地址: </p>
                        <span v-if="defaultAddress===null">无默认地址</span>
                        <span v-if="defaultAddress !== null">
                            <el-card>
                                <p style="font-size: 15px">地址名: {{defaultAddress.addressName}}</p>
                                <p style="font-size: 15px">收货人: {{defaultAddress.name}}</p>
                                <p style="font-size: 15px">收货人电话: {{defaultAddress.phone}}</p>
                                <p style="font-size: 15px">省/直辖市: {{defaultAddress.province}}</p>
                                <p style="font-size: 15px">城市: {{defaultAddress.city}}</p>
                                <p style="font-size: 15px">区/街道: {{defaultAddress.region}}</p>
                                <p style="font-size: 15px">详细地址: {{defaultAddress.detailAddress}}</p>
                            </el-card>
                        </span>
                    </div>
                </el-card>
            </div>

        </div>


        <h2 style="clear:left;">推荐商品</h2>

    </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import send from "@/http";
import {getAddressById, userInfo} from "@/api";

let input1 = ref('username: 单推人')
let isChange = ref(false)
const changeStatus = () => {
    isChange.value = !isChange.value
}
let isChange1 = ref(false)
const changeStatus1 = () => {
    isChange1.value = !isChange1.value
}
let isChange2 = ref(false)
const changeStatus2 = () => {
    isChange2.value = !isChange2.value
}
let sex = ref('1')
let date = ref('2022-04-27')


const user = ref({});
const defaultAddress = ref(null)
onMounted((() => {
    send.post(userInfo).then(resp => {
        if (resp.code === 0) {
            user.value = resp.content;
            send.post(getAddressById + user.value.id).then(resp => {
                if (resp.code === 0)
                    defaultAddress.value = resp.content
            })
        }
    })
}))


</script>

<style scoped>
#user-home {
    margin: 0 0 0 5px;
    padding: 0;
}

.header-user {
    margin-top: 10px;
}

.user-item {
    width: 60%;
}
</style>

<style scoped>
.image {

    width: 20%;
    height: 300px;
    display: block;
    float: left;
}
</style>