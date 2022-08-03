<template>
  <div class="GoodSelect">
    <el-select v-model="NewValue" placeholder="请选择" :clearable='clearable'>
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
import {mapActions,mapState} from 'vuex'
export default {
  props: {
    value: { type: string, default: '' },
    clearable:{type:Boolean,default:false}
  },
  // data() {
  //   return {
  //     options: []
  //   }
  // },
  methods:{
    ...mapActions('good',['getOptions'])
  },
  computed: {
    ...mapState('good',['options'])
    ,
    NewValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  created() {
    // getAllCates().then((res) => {
    //   this.options = res.data.list
    // })
    this.getOptions()
  },
  mounted(){
    console.log(this.options);
  }
}
</script>

<style lang="scss" scoped>
.GoodSelect {
  display: inline-block;
}
</style>
