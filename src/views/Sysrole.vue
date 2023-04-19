<template>
  <div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column property="id" label="角色ID" />
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
    </el-table>

    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="current"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { initRoleList } from "../api/Sysrole";
export default {
  data() {
    return {
      tableData: [],
      current: 1,
      pageSize: 10,
    };
  },
  methods: {
    Init() {
      const data = {
        current: this.current,
        size: this.pageSize,
        params: {},
      };
      initRoleList(data).then((res) => {
        console.log(res.data.data);
        this.tableData = res.data.data.records;
      });
    },
    handleSizeChange() {
      this.Init();
      console.log("sizechange");
    },
    handleCurrentChange() {
      this.Init();
      console.log("current");
    },
  },
  created() {
    this.Init();
  },
};
</script>

<style lang="scss" scoped>
:deep(.el-table th.el-table__cell) {
  background: rgb(217, 214, 214);
}
:deep(tr) {
  height: 50px;
}
.demo-pagination-block {
  margin-top: 60px;
}
</style>
