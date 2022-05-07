<template>
    <div id="useraddress">
        <div class="address-item">
            <el-input placeholder="例:学校" v-model="address.addressName" size="large">
                <template #prepend>
                    <span>地址名称</span>
                </template>
            </el-input>
        </div>

        <div class="address-item">
            <el-input placeholder="张福兴" v-model="address.name" size="large">
                <template #prepend>
                    <span>收件人</span>
                </template>
            </el-input>
        </div>
        <div class="address-item">
            <el-input placeholder="13648586653" v-model="address.phone" size="large">
                <template #prepend>
                    <span>收件人联系电话</span>
                </template>
            </el-input>
        </div>
        <div class="address-item">
            <el-input placeholder="天津" v-model="address.province" size="large">
                <template #prepend>
                    <span>省/直辖市</span>
                </template>
            </el-input>
        </div>
        <div class="address-item">
            <el-input placeholder="天津市" v-model="address.city" size="large">
                <template #prepend>
                    <span>市</span>
                </template>
            </el-input>
        </div>
        <div class="address-item">
            <el-input placeholder="滨海新区" v-model="address.region" size="large">
                <template #prepend>
                    <span>区</span>
                </template>
            </el-input>
        </div>

        <div class="address-item">
            <el-input placeholder="天津科技大学西院" v-model="address.detailAddress" size="large">
                <template #prepend>
                    <span>详细地址</span>
                </template>
            </el-input>
        </div>
        <div class="address-item add-btn">
            <el-button type="primary" @click="submit">添加新地址</el-button>
            <el-button type="danger" @click="isReset = true">清空表单
                <el-dialog v-model="isReset" title="提示" center width="30%">
                    <p>真的要清除表单吗？！！</p>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="isReset = false">  不  !!!</el-button>
                        <el-button type="primary" @click="reset">是的，确认</el-button>
                      </span>
                    </template>
                </el-dialog>
            </el-button>
        </div>

    </div>
    <div id="existed">
        <p style="text-align: center;font-size: 20px;margin: 5px 0;color: red">当前地址</p>
        <el-table :data="addlist" stripe style="width: 100%">
            <el-table-column prop="addressName" label="地址名" width="150"/>
            <el-table-column prop="name" label="收件人" width="100"/>
            <el-table-column prop="phone" label="联系方式" width="120"/>
            <el-table-column prop="province" label="省/直辖市" width="100"/>
            <el-table-column prop="city" label="市" width="100"/>
            <el-table-column prop="region" label="区" width="100"/>
            <el-table-column prop="detailAddress" label="详细地址" width="200"/>
            <el-table-column label="操作" style="text-align: center">
                <template #default="scope">
                    <el-button size="small" type="info" v-if="scope.row.receiveStatus === 1" disabled>默认地址</el-button>
                    <el-button size="small" type="primary" v-else @click="show(scope.row)">
                        设为默认
                    </el-button>
                    <el-button size="small" type="danger" @click="showDeleteDialog(scope.row)">删除地址</el-button>
                    <el-button size="small" type="primary" color="#C99F78FF" @click="updateActive(scope.row)">修改地址</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog v-model="isDefault" title="设置默认地址" center width="60%">
        <p style="font-size: 20px">以下地址将会被设置为默认地址</p>
        <p style="font-size: 20px">地址名: {{temp.addressName}}</p>
        <p style="font-size: 20px">收货人: {{temp.name}}</p>
        <p style="font-size: 20px">收货人电话: {{temp.phone}}</p>
        <p style="font-size: 20px">省/直辖市: {{temp.province}}</p>
        <p style="font-size: 20px">城市: {{temp.city}}</p>
        <p style="font-size: 20px">区/街道: {{temp.region}}</p>
        <p style="font-size: 20px">详细地址: {{temp.detailAddress}}</p>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isDefault = false">  不  !!!</el-button>
            <el-button type="primary" @click="setDefaultAddress(temp.id)">是的，确认</el-button>
          </span>
        </template>
    </el-dialog>

    <el-dialog v-model="updateDialog" title="地址修改" center width="60%">
        <div class="address-item">
            <el-input placeholder="例:学校" v-model="updateTemp.addressName" size="large">
                <template #prepend>
                    <span>地址名称</span>
                </template>
            </el-input>
        </div>

        <div class="address-item">
            <el-input placeholder="张福兴" v-model="updateTemp.name" size="large">
                <template #prepend>
                    <span>收件人</span>
                </template>
            </el-input>
        </div>
        <div class="address-item">
            <el-input placeholder="13648586653" v-model="updateTemp.phone" size="large">
                <template #prepend>
                    <span>收件人联系电话</span>
                </template>
            </el-input>
        </div>
        <div class="address-item">
            <el-input placeholder="天津" v-model="updateTemp.province" size="large">
                <template #prepend>
                    <span>省/直辖市</span>
                </template>
            </el-input>
        </div>
        <div class="address-item">
            <el-input placeholder="天津市" v-model="updateTemp.city" size="large">
                <template #prepend>
                    <span>市</span>
                </template>
            </el-input>
        </div>
        <div class="address-item">
            <el-input placeholder="滨海新区" v-model="updateTemp.region" size="large">
                <template #prepend>
                    <span>区</span>
                </template>
            </el-input>
        </div>

        <div class="address-item">
            <el-input placeholder="天津科技大学西院" v-model="updateTemp.detailAddress" size="large">
                <template #prepend>
                    <span>详细地址</span>
                </template>
            </el-input>
        </div>
        <template #footer>
            <span class="dialog-footer">
            <el-button @click="updateDialog = false"> 取消</el-button>
            <el-button type="primary" @click="submitChange">修改</el-button>
          </span>
        </template>
    </el-dialog>


    <el-dialog v-model="deleteDialog" title="删除提醒" center width="30%">
        <p>确定删除？？删除后无法找回地址记录</p>
        <template #footer>
            <span class="dialog-footer">
            <el-button @click="deleteDialog = false"> 取消</el-button>
            <el-button type="primary" color="red" @click="deleteAddress(temp.id)">删除</el-button>
          </span>
        </template>
    </el-dialog>
</template>

<script setup>


import {onMounted, ref} from "vue";
import send from "@/http";
import {appendAddress, delAddress, getAddress, setDefault, updateAddress} from "@/api";
import {ElMessage} from "element-plus";

const addlist = ref([])
const isReset = ref(false)
const address = ref({
    addressName: '',
    phone: '',
    name: '',
    province: '',
    city: '',
    region: '',
    detailAddress: ''
})
const isDefault = ref(false)
const temp = ref({});
const updateTemp = ref({})
const updateDialog = ref(false)
const deleteDialog = ref(false)


const reset = () => {
    address.value.addressName = ''
    address.value.phone = ''
    address.value.name = ''
    address.value.province = ''
    address.value.city = ''
    address.value.region = ''
    address.value.detailAddress = ''
    isReset.value = false
}
const submit = () => {
    let data = {
        addressName: address.value.addressName,
        phone: address.value.phone,
        name: address.value.name,
        province: address.value.province,
        city: address.value.city,
        region: address.value.region,
        detailAddress: address.value.detailAddress
    }
    send.post(appendAddress, data).then(resp => {
        if (resp.content === true){
            ElMessage.success("地址添加成功")
            reset()
            getAddressList()
        }
        if (resp.content === false) {
            ElMessage.error("地址添加失败，请稍后再试")
        }
    })

}
const getAddressList = () => {
    addlist.value.length = 0
    send.post(getAddress).then(resp => {
        for (let i = 0; i < resp.content.length; i++) {
            addlist.value.push(resp.content[i])
        }
    })

}
const show = (row) => {
    temp.value = row
    isDefault.value = true
}

const setDefaultAddress = (id) => {
    send.post(setDefault+id).then(resp => {
        if (resp.code === 0) {
            ElMessage.success("更改成功")
            getAddressList();
            isDefault.value = false
        }
    })
}
const updateActive = (row) => {
    updateTemp.value = row
    updateDialog.value = true
}
const submitChange = () => {
    let data = {
        id: updateTemp.value.id,
        addressName: updateTemp.value.addressName,
        phone: updateTemp.value.phone,
        name: updateTemp.value.name,
        province: updateTemp.value.province,
        city: updateTemp.value.city,
        region: updateTemp.value.region,
        detailAddress: updateTemp.value.detailAddress
    }
    send.post(updateAddress,data).then(resp => {
        ElMessage.success("修改成功")
        updateDialog.value = false
    })
}

const showDeleteDialog = (row) => {
    temp.value = row
    deleteDialog.value = true
}
const deleteAddress = (aid) => {
    send.post(delAddress+aid).then(resp => {
        if (resp.code === 0) {
            ElMessage.success("删除成功")
            deleteDialog.value = false
            getAddressList()
        }
    })
}
onMounted(()=>{
    getAddressList()
})
</script>

<style scoped>
#useraddress {
    margin: 20px 0 10px 0;
    background-color: #8f8787;
    border-radius: 10px;
    padding: 10px 0;
}

#existed {
    margin: 0;
    background-color: #f0a1a8;
    border-radius: 10px;
}

.address-item {
    margin-left: 5%;
    width: 90%;
    margin-bottom: 20px;
}

.add-btn {
    margin-left: 45%;
}
</style>