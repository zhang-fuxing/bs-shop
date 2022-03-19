<template>
    <div class="row">
        <div class="col">
            <ul class="inav">
                <li><router-link to="/home" class="nav-item">| 商城首页 |</router-link></li>
                <li><router-link to="/login" class="nav-item"> 去登陆 |</router-link></li>
                <li><router-link to="/reg" class="nav-item"> 注册账号 |</router-link></li>
                <li><router-link to="/..." class="nav-item"> ... |</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>

</script>
<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;

}
ul li {
    display: inline;
    line-height: 40px;
}
.nav-item {
    font-style: normal;
    font-size:10px;
    color: rgba(46, 45, 54, 0.514);
}
</style>
