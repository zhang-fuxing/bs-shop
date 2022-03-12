<template>
  <div class="home">
    <!-- 顶部导航 -->
    <Header></Header>
    <!-- 同步搜索框 -->
    <HeaderSearch></HeaderSearch>
    <!-- 分类导航 -->
    <Nav></Nav>

    <!-- 轮播图 -->
    <div class="row">
      <!-- 轮播图 -->
      <div class="col-md-8">
        <!-- 点击轮播 -->
        <div id="myCarousel" class="carousel slide">
          <!-- 轮播（Carousel）项目 -->
          <div class="carousel-inner">
            <div class="item active">
              <img src="@/assets/1/4.png" alt="" />
            </div>
            <div class="item">
              <img src="@/assets/1/5.jpg" alt="" />
            </div>
            <div class="item">
              <img src="@/assets/1/6.jpg" alt="" />
            </div>
          </div>
          <!-- 轮播（Carousel）导航 -->
          <div>
            <a
              class="left carousel-control"
              href="#myCarousel"
              role="button"
              data-slide="prev"
            >
              <span
                class="glyphicon glyphicon-chevron-left"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="right carousel-control"
              href="#myCarousel"
              role="button"
              data-slide="next"
            >
              <span
                class="glyphicon glyphicon-chevron-right"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="right-info">11111</div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HeaderSearch from "@/components/HeaderSearch.vue";
import Category from "@/components/Category.vue";
import Nav from "@/components/Nav.vue";
export default {
  components: {
    Header,
    HeaderSearch,
    Category,
    Nav,
  },
  setup() {
    
  },
};
</script>

<style scoped>
.item > img {
  width: 800px;
  height: 400px;
}
</style>