<template>
  <div class="goodfrom">
    <!-- 页头 -->
    <el-page-header :content="id ? '商品编辑' : '商品添加'" @back="$router.back()" />
    <!-- 商品表单 -->
    <el-form ref="form" :model="ruleForm" label-width="80px" :rules="rules">
      <!-- 商品名称 -->
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>

      <!-- 商品描述 -->
      <el-form-item label="商品描述" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" :rows="3" />
      </el-form-item>

      <!-- 商品品类 -->
      <el-form-item label="商品品类" prop="cate">
        <GoodSelect v-model="ruleForm.cate" />
      </el-form-item>

      <!-- 商品价格 -->
      <el-form-item label="商品价格" prop="price">
        <el-input-number
          v-model="ruleForm.price"
          :min="0.0"
          :precision="2"
          :step="0.1"
        />
      </el-form-item>

      <!-- 是否热销 -->
      <el-form-item label="是否热销">
        <el-switch v-model="ruleForm.hot" />
      </el-form-item>

      <!-- 图片上传 -->

      <el-form-item label="商品图片" price="img" prop="img">
        <ImgUpload v-model="fileList" @img="setImgs" />
      </el-form-item>

      <!-- 提交 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import GoodSelect from "./components/GoodSelect.vue";
import ImgUpload from "./components/ImgUpload.vue";
import { submitGood, getGoodInfo } from "@/api/good";
export default {
  components: {
    GoodSelect,
    ImgUpload,
  },
  props: {
    id: { type: String, default: "" },
  },
  mounted() {
    if (this.id) {
      getGoodInfo({ id: this.id }).then((res) => {
        if (res && res.data.info) {
          let obj = res.data.info;
          let info = {
            name: obj.name,
            desc: obj.desc,
            cate: obj.cate,
            price: obj.price,
            hot: obj.hot,
            img: obj.img,
          };
          this.ruleForm = info;
          this.fileList = [
            { name: "微信图片", url: `http://localhost:9999${info.img}` },
          ];
        }
      });
    }
  },
  data() {
    return {
      ruleForm: {
        name: "",
        desc: "",
        cate: "",
        price: 0,
        hot: false,
        img: "",
      },
      fileList: [],
      num: 0.0,
      rules: {
        name: [
          { required: true, message: "请输入商品名称  ", trigger: "blur" },
          {
            pattern: /[\u4e00-\u9fa5]{4,8}/,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
        desc: [
          { required: true, message: "请输入商品描述", trigger: "blur" },
          {
            min: 20,
            max: 30,
            message: "商品名称要求20~30个字符",
            trigger: "blur",
          },
        ],
        cate: [
          { required: true, message: "请选择商品品类  ", trigger: "change" },
        ],
        price: [
          { required: true, message: "请输入商品价格  ", trigger: "change" },
        ],
        img: [{ required: true, message: "请选择活动资源", trigger: "change" }],
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const succed = await this.$refs.form.validate();
        let data = { ...this.ruleForm };
        if (this.id) data.id = this.id;
        const res = await submitGood(data);
        if (res.err === 0) {
          this.$message({
            showClose: true,
            message: "商品添加成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              // 建议使用箭头函数，注意this指向问题
              this.$router.back();
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    setImgs(val) {
      console.log(val);
      this.ruleForm.img = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.goodfrom {
  padding: 20px;
  .el-form {
    margin-top: 20px;
    width: 600px;
  }
}
</style>
