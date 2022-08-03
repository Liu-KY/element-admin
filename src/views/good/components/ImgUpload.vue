<template>
  <div>
    <el-upload
      ref="list"
      action="/api/v1/element/upload/img"
      list-type="picture-card"
      name="good"
      multiple
      :file-list="fileList"
      :on-success="setImg"
    >
      <i slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { string } from 'clipboard'
export default {
  props: {
    value: { style: string, default: '' }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: []
    }
  },
  methods: {
    handleRemove(file) {
      const index = this.$refs.list.uploadFiles.indexOf(file)
      this.$refs.list.uploadFiles.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    setImg(response, file, fileList) {
      this.$emit('input', response.data.img)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
