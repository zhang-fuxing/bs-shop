<template>
<div class="itable">
    <slot name="image"></slot>
    <slot name="pname"></slot>
    <slot name="price"></slot>
</div>
</template>

<script>
export default {
    name: "ProductTable",
    setup() {

    }

}
</script>

<style scoped>
.itable {
    margin: 15px;
    padding: 0;
    width: 200px;
    height: 200px;
    background-color: #7c93c5;
    float: left;
}

.itable:hover{
    cursor:pointer
}

</style>