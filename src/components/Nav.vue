<template>
  <div class="row">
    <div class="col-md-10">
      <div class="row">
        <div class="col-md-10">
          <ul class="nav nav-tabs">
            <li
              v-for="(item, index) in categoryList"
              :key="index"
              role="presentation"
            >
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </div>
        <div class="col-md-2">
          <ul class="nav nav-tabs">
            <li role="presentation" class="dropdown">
              <a
                class="dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                更多 <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li role="presentation"><a href="#">玩具</a></li>
                <li role="presentation"><a href="#">饰品</a></li>
                <li role="presentation"><a href="#">植物</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

    </div>

    <div class="col-md-1 col-md-offset-1 header-bg">
      <a href="#" class="thumbnail header-bg">
        <img src="@/assets/1/3.png" class="img-circle" alt="" />
        个人中心
      </a>
    </div>
  </div>
</template>

<script>
import { reactive, inject, provider } from "vue";
export default {
  setup() {
    const categoryList = reactive(["首页", "全部分类", "电脑", "衣服"]);
    return {
      categoryList,


    };
      inject(categoryList)
  },
};
</script>

<style scoped>
.header-bg {
  background-color: rgb(210, 211, 132);
}

/*包含以下四种的链接*/
a {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
a:link {
  text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
a:active {
  text-decoration: none;
}
</style>