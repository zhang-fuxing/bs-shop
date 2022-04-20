<template>
    <div             class="menu" >
        <div
            :key="(item.id).toString()"
            v-for="(item,index) in category.slice(0,5)"
            class="menu-item"
        >
            {{item.name}}

        </div>


    </div>


</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import send from "@/http";
import {categoryLevel1} from "@/api";

const activeIndex2 = ref('1')
const handleSelect = (key) => {
    console.log(key)
}
let category = reactive([])
onMounted(() => {
    send.post(categoryLevel1).then((data) => {
        for (let i = 0; i < data.content.length; i++) {
            category[i] = data.content[i]
        }

    })
})
</script>
<style scoped>
.menu{
    width:100%;
    background-color:grey;
    display: flex;
    flex-direction: row;
    height: 40px;
}
.menu-item{
    border: 1px solid #000;
    width: 6%;
    display: flex;
    justify-content: center;
    align-items: center;
 }
.menu-item:hover{
    background-color: #ffa;
}
</style>
