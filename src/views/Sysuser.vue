<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-input v-model="input1" placeholder="搜索登录名" @input="sousuo" />
      </el-col>
      <el-col :span="4">
        <el-input v-model="input2" placeholder="搜索姓名" />
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="dialogFormVisible = true">
          <el-icon>
            <Plus />
          </el-icon>添加
        </el-button>
      </el-col>
    </el-row>
    <el-select
      v-model="value"
      class="m-2"
      :placeholder="'已选' + this.num + '项'"
      v-if=this.boolean
    >
      <el-option value="启用" @click="del" />
      <el-option value="禁用" @click="del" />
      <el-option value="删除" @click="del" />
    </el-select>
    <el-dialog v-model="dialogFormVisible" title="添加用户">
      <el-form :label-position="labelPosition" label-width="60px" :model="formLabelAlign" style="max-width: 460px">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formLabelAlign.region" />
        </el-form-item>
        <el-form-item label="密码">
<<<<<<< HEAD
          <el-input v-model="formLabelAlign.type" placeholder="不修改请留空" type="password" />
=======
          <el-input
            v-model="formLabelAlign.type"
            placeholder="不修改请留空"
            type="password"
          />
>>>>>>> 87582f6c7cc85b6895825e759569bfec9ebffa23
        </el-form-item>
        <el-form-item label="部门">
          <el-select
            v-model="formLabelAlign.region"
            placeholder="请选择"
          ></el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="formLabelAlign.region" placeholder="请选择角色" />
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
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
      border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="userName" label="用户名" align="center" />
      <el-table-column prop="realName" label="姓名" align="center" />
      <el-table-column prop="roleIds" label="角色" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column prop="state" label="状态" align="center" />
    </el-table>

<<<<<<< HEAD
    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[10, 20, 30, 40]"
      :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="60" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
=======
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
>>>>>>> 87582f6c7cc85b6895825e759569bfec9ebffa23
  </div>
</template>

<script>
<<<<<<< HEAD
import { reactive } from 'vue'
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelAlign: reactive({
        name: '',
        region: '',
        type: '',
=======
import { reactive } from "vue";
import { user } from "../api/tikuguanli";
export default {
  data() {
    return {
      num: 0,
      total: "",
      currentPage4: 1,
      pageSize4: 10,
      input1: "",
      input2: "",
      boolean:false,
      dialogFormVisible: false,
      formLabelAlign: reactive({
        name: "",
        region: "",
        type: "",
>>>>>>> 87582f6c7cc85b6895825e759569bfec9ebffa23
      }),
      tableData: [
        {
          userName: "tom",
          realName: "lzl",
          roleIds: "No. 189",
          createTime: "2023",
          state: "0",
        },
      ],
    };
  },
  methods: {
<<<<<<< HEAD
    add() { },
=======
    add() {},
    sousuo() {},
    handleSelectionChange(val) {
      console.log(val.length);
      if (val.length > 0) {
        this.boolean=true
      } else {
        this.boolean=false
      }
      this.num = val.length;
    },
    xuanran() {
      user(this.currentPage4, this.pageSize4, { userName:this.input1 }).then((res) => {
        // console.log(res.data.data.records);
        res.data.data.records.forEach((item) => {
          if (item.state == 0) {
            item.state = "正常";
          }
        });
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    handleSizeChange() {
      this.xuanran();
    },
    handleCurrentChange() {
      this.xuanran();
    },
    sousuo(){
      console.log(666);
      // user(this.currentPage4, this.pageSize4, {userName:this.input1}).then((res) => {
      //   console.log(res.data.data.records);
      //   res.data.data.records.forEach((item) => {
      //     if (item.state == 0) {
      //       item.state = "正常";
      //     }
      //   });
      //   this.tableData = res.data.data.records;
      //   this.total = res.data.data.total;
      // });
      this.xuanran()
    },
  },
  created() {
    this.xuanran();
>>>>>>> 87582f6c7cc85b6895825e759569bfec9ebffa23
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
<<<<<<< HEAD

.el-select {
  width: 400px;
=======
.el-select {
  width: 400px;
}
.m-2 {
  width: 130px;
  margin-top: 10px;
>>>>>>> 87582f6c7cc85b6895825e759569bfec9ebffa23
}
</style>
