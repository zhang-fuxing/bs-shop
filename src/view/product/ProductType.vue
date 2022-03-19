<template>
<ProductTable></ProductTable>
</template>

<script>
import {useRoute} from "vue-router"
import {reactive, watch} from "vue";
import ProductTable from "@/view/product/ProductTable";
export default {

    components: {
        ProductTable
    },
    setup() {
        const route = useRoute();

        let item = reactive({id:route.params.item})

        watch(() => route.params.item, newParam => {
            console.log(newParam)
            item.id = newParam
        })
        return {
            item
        }
    }
}
</script>

<style>

</style>