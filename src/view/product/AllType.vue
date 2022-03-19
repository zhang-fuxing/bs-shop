<template>

    <div class="row">
        <nav>
            <ul class="breadcrumb">

            </ul>
        </nav>
    </div>
</template>

<script>
import {useRoute} from "vue-router"
export default {
    name: "AllType",
    setup() {
        const route = useRoute();

        const id = route.params

        return {
            id
        }
    }
}
</script>

<style scoped>
</style>