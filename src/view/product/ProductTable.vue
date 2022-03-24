<template>
<div class="itable">
    <slot class="slg" name="image"></slot>
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
    margin: 5px;
    padding: 0;
    border: 0;
    width: 200px;
    height: 300px;
    color: rgb(174, 176, 178);
    background-color: #f0a1a8;
    float: left;
}

.itable:hover{
    cursor:pointer;
}

</style>