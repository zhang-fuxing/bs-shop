<template>
  <div class="userlogin">
    <!-- 顶部导航 -->
    <ul>
      <li><router-link to="/index">返回首页</router-link></li>
    </ul>
    <!-- form表单 -->
    <div class="row" style="margin: 11%">
      <div class="col-md-6 col-md-offset-3">
        <form action="javascript:void(0)">
          <div class="form-group">
            <label for="phone">手机号</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              placeholder="请输入您的手机号"
              v-model="form.name"
            />
          </div>
          <div class="form-group">
            <label for="password">登录密码</label>
            <input
              type="password"
              v-model="form.password"
              class="form-control"
              id="password"
              placeholder="请输入您的密码"
            />
          </div>
          <!-- 输入验图片证码 -->
          <div class="form-group row">
            <div class="col-md-8">
              <label for="validate-code">验证码</label>
              <input
                type="text"
                id="validate-code"
                v-model="form.code"
                class="form-control"
                placeholder="请输入验证码"
              />
            </div>
            <!-- 验证码切换 -->
            <div class="col-md-4">
              <label for="img" disabled="true"></label>
              <input
                type="image"
                id="img"
                :src="form.url"
                class="form-control"
                @click="next(form.url)"
                alt="请稍等"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 col-md-offset-4 ">
              <button type="submit" onclick="signIn()" class="btn btn-default">
                &nbsp;&nbsp;&nbsp;&nbsp;登录&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </div>
            <br />
            <br />
            <div align="center">
              <a href="#"> 没有账号，去注册 </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import  Header from "@/components/Header.vue"
import {verifyImg} from "@/api";
import send from "@/http";
import axios from "axios";
export default {
  components:{
    Header
  },
  setup() {
    // do not use same name with ref
    const form = reactive({
      name: "",
      password: "",
      code: "",
      url: 'http://localhost:9000/user/verify',
    });

    const next = (p) => {
      form.url = "";
      axios.get(p).then(() => {
        setTimeout(()=> {form.url = p},100)
      })
    };
    return {
      form,
      next,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

</style>
