<template>
    <div class="pm">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "ProductManage"
}
</script>

<style scoped>
div.pm{
    position: fixed;
    width: 90%;
    height: 100%;
    overflow: auto;
    background-color: #b4cde7;
}

</style>