<template>
    <div class="add-product container">
        <form class="form-horizontal">
            <div class="row">
                <div class="col-md-4 form-group">
                   <div class="col-md-3">
                       <span>商品分类</span>
                   </div>
                    <div class="col-md-9">
                        <select class="form-control" id="category">
                            <option selected disabled>分类选择</option>
                            <option v-for="cate in catelist" :key="cate.id">{{cate.name}}</option>
                        </select>
                    </div>
                </div>

                <div class="form-group col-md-7">
                    <label for="pname" class="col-md-2 control-label">商品名</label>
                    <div class="col-md-10">
                        <input type="text" class="form-control" id="pname" placeholder="请输入商品名">
                    </div>
                </div>
            </div>


        </form>


        <center>
            <h3>上传单个文件</h3>

            <hr>
            <h3>上传多个文件</h3>
            <form action="/multiUpload" enctype="multipart/form-data" method="post">
                <input type="file" name="file" required><br>
                <input type="file" name="file" required><br>
                <input type="file" name="file" required><br>
                <input type="submit" value="上传多个文件">
            </form>
        </center>

    </div>
</template>

<script>
import {onMounted, reactive} from "vue";
import send from "@/http";
import {categoryLevel1} from "@/api";

export default {
    setup() {
        let catelist = reactive([{id: 0, name: ''}]);

        onMounted(() => {

            send.get(categoryLevel1).then(resp => {
                for (let i = 0; i < resp.content.length; i++) {
                    catelist[i] = resp.content[i]
                }
                console.log('------------------')
                console.log(catelist);
            })

        })

        return {
            catelist,
        }
    }

}

</script>


<style scoped>


</style>