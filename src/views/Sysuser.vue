<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-input v-model="input" placeholder="搜索登录名" />
      </el-col>
      <el-col :span="4">
        <el-input v-model="input" placeholder="搜索姓名" />
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="dialogFormVisible = true">
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </el-col>
    </el-row>

    <el-dialog v-model="dialogFormVisible" title="添加用户">
      <el-form
        :label-position="labelPosition"
        label-width="60px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formLabelAlign.region" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.type" placeholder="不修改请留空" type="password"/>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="formLabelAlign.region" placeholder="请选择"></el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="formLabelAlign.region" placeholder="请选择角色"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="name" label="用户名" align="center" />
      <el-table-column prop="name" label="姓名" align="center" />
      <el-table-column prop="address" label="角色" align="center" />
      <el-table-column prop="address" label="创建时间" align="center" />
      <el-table-column prop="address" label="状态" align="center" />
    </el-table>

    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="60"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { reactive} from 'vue'
export default {
  data() {
        return {
            dialogFormVisible: false,
       formLabelAlign :reactive({
  name: '',
  region: '',
  type: '',
}),
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189",
        },
      ],
    };
  },
  methods: {
    add() {},
  },
};
</script>

<style scoped>
.el-col {
  margin-right: 6px;
}
:deep(.el-table th.el-table__cell) {
  background: rgb(217, 214, 214);
}
.el-pagination {
  margin-top: 40px;
}
.el-table {
  margin-top: 10px;
}
:deep(.el-dialog) {
  width: 500px;
  height: 500px;
}
.el-form-item {
  margin-bottom: 30px;
}
.el-select{
    width: 400px;
}
</style>
