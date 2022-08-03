<template>
  <div class="GoodSelect">
    <el-select v-model="NewValue" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item._id"
        :label="item.cate_zh"
        :value="item.cate"
      />
    </el-select>
  </div>
</template>

<script>
import { getAllCates } from '@/api/good'
import { string } from 'clipboard'
export default {
  props: {
    value: { type: string, default: '' }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    NewValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
    getAllCates().then((res) => {
      this.options = res.data.list
    })
  }
}
</script>

<style lang="scss" scoped>
.GoodSelect {
  display: inline-block;
}
</style>
