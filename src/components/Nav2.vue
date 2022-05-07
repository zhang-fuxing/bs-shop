<template>
    <nav>
        <ul class="breadcrumb thumbnail">
            <li v-for="lv2 in list2" :key="lv2.id">
                <a href="javascript:void(0);" @click="$emit('emitDid',lv2.id,props.categoryId)">{{ lv2.name }}</a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import {onMounted, reactive, watch} from 'vue'
import send from "@/http";
import {lv2} from "@/api";

const props = defineProps(['categoryId'])
let list2 = reactive([{}])

const getLv2 = (cid) => {
    if (list2.length > 0) {
        list2.splice(0)
    }
    send.get(lv2 + cid).then((resp) => {
        for (let i = 0; i < resp.content.length; i++) {
            list2[i] = resp.content[i]
        }
    })

}

onMounted(() => {
    getLv2(props.categoryId)
})
watch(() => props.categoryId, () => {
    getLv2(props.categoryId)
})

</script>
<style scoped>
nav {
    margin: 0 45px;
}

ul {
    margin: 0;
}
</style>
