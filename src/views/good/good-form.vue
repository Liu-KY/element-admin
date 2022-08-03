<template>
  <div class="goodfrom">
    <!-- 页头 -->
    <el-page-header content="商品新增" @back="$router.back()" />
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
        <ImgUpload v-model="ruleForm.img" />
      </el-form-item>

      <!-- <el-form-item label="商品图片" price='img'>
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item> -->

      <!-- 提交 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import GoodSelect from './components/GoodSelect.vue'
import ImgUpload from './components/ImgUpload.vue'
import { submitGood } from '@/api/good'
export default {
  components: {
    GoodSelect,
    ImgUpload
  },
  data() {
    return {
      ruleForm: {
        name: '',
        desc: '',
        cate: '',
        price: 0,
        hot: false,
        img: ''
      },
      num: 0.0,
      rules: {
        name: [
          { required: true, message: '请输入商品名称  ', trigger: 'blur' },
          {
            pattern: /[\u4e00-\u9fa5]{4,8}/,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        desc: [
          { required: true, message: '请输入商品描述', trigger: 'blur' },
          {
            min: 20,
            max: 30,
            message: '商品名称要求20~30个字符',
            trigger: 'blur'
          }
        ],
        cate: [
          { required: true, message: '请选择商品品类  ', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入商品价格  ', trigger: 'change' }
        ],
        img: [{ required: true, message: '请选择活动资源', trigger: 'change' }]
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        const succed = await this.$refs.form.validate()
        const res = await submitGood(this.ruleForm)
        if (res.err === 0) {
          this.$message({
            showClose: true,
            message: '商品添加成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              // 建议使用箭头函数，注意this指向问题
              this.$router.back()
            }
          })
        }
      } catch (err) {
        console.log(err)
      }
    }

  }
}
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
