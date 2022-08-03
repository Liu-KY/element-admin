<template>
  <div class="goodList">
    <!-- 头部 -->
    <el-row>
      <el-col :span="24">
        <!-- 输入框 -->
        <el-input
          v-model="name"
          placeholder="请输入内容"
          style="width: 200px"
        />
        <!-- 多选框 -->
        <GoodSelect v-model="cate" clearable />

        <!-- 日期选择 -->
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <!-- 按钮 -->
        <el-button type="primary" icon="el-icon-search" @click="openGood(1)"
          >搜索</el-button
        >
        <el-button type="primary" icon="el-icon-edit" @click="openGood(2)"
          >添加</el-button
        >
        <el-button type="primary" icon="el-icon-download">导出</el-button>
        <!-- 多选框 -->
        <el-checkbox v-model="checked" style="margin-left: 20px"
          >审核人</el-checkbox
        >
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="goodList"
      style="width: 100%; margin-top: 20px; margin-bottom: 20px"
      border
      highlight-current-row
      @sort-change="tableSortChange"
    >
      <!-- 序号 -->
      <el-table-column
        width="120"
        sortable
        label="序号"
        prop="_id"
        align="center"
        :sort-method="(a, b) => a.id - b.id"
      >
        <template slot-scope="{ $index }">
          <div>{{ $index + 1 }}</div>
        </template>
      </el-table-column>
      <!-- 商品 -->
      <el-table-column prop="name" label="商品" width="180" align="center">
        <template slot-scope="{ row }">
          <div class="good">
            <img :src="`http://localhost:9999${row.img}`" />
            <div>{{ row.name }}</div>
          </div>
        </template>
      </el-table-column>
      <!-- 价格 -->
      <el-table-column prop="price" label="价格" align="center" />
      <!-- 品类 -->
      <el-table-column prop="cate" label="品类" align="center" >
        <template slot-scope="{ row }">
          <div>
            {{ classZh(row.cate)}}
          </div>
        </template>
      </el-table-column>
      <!-- 是否热销 -->
      <el-table-column prop="hot" label="是否热销" align="center">
        <template slot-scope="{ row }">
          <div>
            {{ row.hot ? "是" : "否" }}
          </div>
        </template>
      </el-table-column>
      <!-- 添加时间 -->
      <el-table-column prop="create_time" label="添加时间" align="center">
        <template slot-scope="{ row }">
          <div>
            {{ row.create_time | time }}
          </div>
        </template>
      </el-table-column>
      <!-- 商品状态 -->
      <el-table-column prop="check_status" label="商品状态" align="center">
        <template slot-scope="{ row }">
          <div>
            {{ row.check_status ? "已上架" : "待审核" }}
          </div>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column prop="address" label="操作" width="280" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            size="mini"
            @click="goodSet(1, row)"
            v-permission="['editor']"
            >编辑</el-button
          >
          <el-button size="mini" v-permission="['admin']">详情</el-button>
          <el-button
            type="success"
            size="mini"
            v-permission="['admin']"
            @click="goodSet(3, row)"
            >审核</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="goodSet(4, row)"
            v-permission="['editor']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :page-sizes="[2, 5, 10, 15]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
      @current-change="changePage"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import GoodSelect from "./components/GoodSelect.vue";
import { getGoodList, goodDel, getCheckGoodList, checkGood } from "@/api/good";
import moment from "moment";
import { mapState } from "vuex";
export default {
  components: {
    GoodSelect,
  },
  computed: {
    ...mapState("good", ["options"]),
  },
  filters: {
    time(val) {
      return moment(val).format("MM月DD日 HH:mm");
    },
  },
  data() {
    return {
      goodList: [],
      checked: true,
      value1: [new Date(2022, 0, 1, 0, 0), new Date(2022, 0, 1, 0, 0)],
      value: "",
      name: "",
      total: 0,
      cate: "",
      size: 2,
      page: 1,
      counter: 0,
    };
  },
  watch: {
    counter() {
      this.getGoodL();
    },
  },
  mounted() {
    this.getGoodL();
  },
  methods: {
    getGoodL() {
      const data = {
        page: this.page,
        size: this.size,
        cate: this.cate,
        name: this.name,
      };
      console.log(this.$route.name);
      if (this.$route.name === "goodCheck") {
        getCheckGoodList(data).then((res) => {
          // console.log(res.data.list);
          this.goodList = res.data.list;
          this.total = res.data.total;
        });
      } else {
        getGoodList(data).then((res) => {
          console.log(res.data.list);
          this.goodList = res.data.list;
          this.total = res.data.total;
        });
      }
    },
    tableSortChange(ev) {
      console.log("--- table sort change", ev);
    },
    changePage(page) {
      this.page = page;
      this.counter++;
    },
    changeSize(size) {
      this.size = size;
      if (this.page == 1) {
        this.counter++;
      }
    },
    // 搜索添加导出
    openGood(num) {
      if (num === 1) this.counter++;
      else if (num === 2) this.$router.push("/good/from");
    },
    // 编辑审核删除
    goodSet(num, row) {
      if (num === 1) this.$router.push(`/particulars/info/${row._id}`);
      if (num === 3) {
        checkGood(row._id).then((res) => {
          if (res && res.err === 0) {
            this.$message({
              type: "success",
              message: "审核成功!",
            });
            this.counter++;
          }
        });
      }
      if (num === 4) {
        this.$confirm(`确定要删除${row.name}吗？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            console.log(row);
            goodDel({ ids: row._id }).then((res) => {
              if (res) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.counter++;
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    //分类渲染
    classZh(val) {
      let arr =  this.options.filter(item=>item.cate === val)
      return arr[0].cate_zh
    },
  },
};
</script>

<style lang="scss" scoped>
.goodList {
  box-sizing: border-box;
  padding: 20px;
  .good {
    text-align: center;
    img {
      display: inline-block;
      width: 60px;
      height: 60px;
    }
  }
}
</style>
