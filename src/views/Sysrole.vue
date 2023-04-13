<template>
  <div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column property="UserID" label="角色ID" />
      <el-table-column label="角色名称" prop="Username"></el-table-column>
    </el-table>

    <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
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
export default {
  data() {
    return {
      tableData: [
        {
          UserID: "kerwin",
          Username: "超级管理员",
        },
        {
          UserID: "yichen",
          Username: "学员",
        },
      ],
    };
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
.demo-pagination-block{
    margin-top: 60px;
}
</style>
