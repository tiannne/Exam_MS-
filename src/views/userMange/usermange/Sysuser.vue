<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-input v-model="input1" placeholder="搜索登录名" @input="sousuo" />
      </el-col>
      <el-col :span="4">
        <el-input v-model="input2" placeholder="搜索姓名" @input="sousuoname" />
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="dialogFormVisible = true;
        kong();
                                      ">
          <el-icon>
            <Plus />
          </el-icon>添加
        </el-button>
      </el-col>
    </el-row>
    <el-select v-model=" value " class="m-2" :placeholder=" '已选' + this.num + '项' " v-if=" this.boolean ">
      <el-option value="启用" @click=" dele " />
      <el-option value="禁用" @click=" dele " />
      <el-option value="删除" @click="dele" />
    </el-select>
    <el-dialog v-model=" dialogFormVisible " title="添加用户">
      <el-form :label-position=" labelPosition " label-width="60px" :model=" formLabelAlign " style="max-width: 460px">
        <el-form-item label="用户名">
          <el-input v-model=" formLabelAlign.userName " />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model=" formLabelAlign.realName " />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model=" formLabelAlign.password " placeholder="不修改请留空" type="password" />
        </el-form-item>
        <el-form-item label="部门">


          <el-tree-select v-model=" formLabelAlign.departId " :data=" bumenarr " :render-after-expand=" false "
            :placeholder=" bumenValue " />


        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model=" formLabelAlign.roleIds " placeholder="请选择角色" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click=" dialogFormVisible = false ">取消</el-button>
          <el-button type="primary" @click="
            dialogFormVisible = false;
            onSubmit();
          ">确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-table ref="multipleTableRef" :data=" tableData " style="width: 100%" @selection-change=" handleSelectionChange "
      border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="userName" label="用户名" align="center">
        <template #default=" scope ">
          <div style="cursor: pointer" @click=" details(scope.row.id, scope.$index) ">
            {{ scope.row.userName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="realName" label="姓名" align="center" />
      <el-table-column prop="roleIds" label="角色" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column prop="state" label="状态" align="center" />
    </el-table>

    <el-pagination v-model:current-page=" currentPage4 " v-model:page-size=" pageSize4 " :page-sizes=" [10, 20, 30, 40] "
      :small=" small " :disabled=" disabled " :background=" background " layout="total, sizes, prev, pager, next, jumper"
      :total=" total " @size-change=" handleSizeChange " @current-change=" handleCurrentChange " />
  </div>
</template>

<script>
import { reactive } from "vue";
import { user, list, del } from "../../../api/sysuser";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  data() {
    return {
      ids:[],
      arr: [],
      bumenarr: [],
      dialogFormVisible: false,
      formLabelAlign: reactive({
        name: "",
        region: "",
        type: "",
      }),
      bumenValue: "",
      num: 0,
      total: "",
      currentPage4: 1,
      pageSize4: 10,
      input1: "",
      input2: "",
      boolean: false,
      dialogFormVisible: false,
      f: [],
      new: [],
      formLabelAlign: reactive({
        name: "",
        region: "",
        type: "",
      }),
      tableData: [
        {
          userName: "",
          realName: "",
          roleIds: "",
          createTime: "",
          state: "",
        },
      ],
    };
  },
  methods: {
    add() { },
    sousuo() { },
    handleSelectionChange(val) {
      console.log(val.length);
      if (val.length > 0) {
        this.boolean = true;
      } else {
        this.boolean = false;
      }
      this.num = val.length;
      for (let i = 0; i < val.length; i++) {
        console.log(val[i].id);
        this.ids.push(val[i].id);
        console.log(this.ids);
      }
    },
    xuanran() {
      user(this.currentPage4, this.pageSize4, { userName: this.input1 }).then(
        (res) => {
          console.log(res.data.data.records, 1);
          this.data = res.data.data.records;
          console.log(this.data, 2);
          res.data.data.records.forEach((item) => {
            if (item.state == 0) {
              item.state = "正常";
            }
          });
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        }
      );
    },
    handleSizeChange() {
      this.xuanran();
    },
    handleCurrentChange() {
      this.xuanran();
    },
    sousuo() {
      this.xuanran();
    },
    sousuoname() {
      user(this.currentPage4, this.pageSize4, { realName: this.input2 }).then(
        (res) => {
          console.log(res.data.data.records);
          res.data.data.records.forEach((item) => {
            if (item.state == 0) {
              item.state = "正常";
            }
          });
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        }
      );
    },
    details(id, index) {
      this.formLabelAlign.departId = this.data[index].departId
      console.log(1);
      console.log(this.bumenarr);
      this.bumenarr[0].children.forEach(item => {
        if (item.value === this.data[index].departId) {
          console.log(item.label);
          this.bumenValue = item.label
          console.log(item.label);
          console.log(this.bumenValue);
        }
      })

      this.dialogFormVisible = true;
      this.new = this.data.find((v) => v.id == id);
      // console.log(this.new);
      this.new.password = [];
      this.new.departId = this.data[index].departId;
      console.log(this.new.roleIds);
      this.formLabelAlign = this.new;
      this.formLabelAlign.departId = this.data.departId

    },
    kong() {
      this.formLabelAlign = [];
    },
    onSubmit() {
      console.log(this.formLabelAlign.departId);
    },
    bumen() {
      list().then((res) => {
        this.arr = res.data.data
        console.log(this.arr, 'arr');

        const obj = {
          value: this.arr[0].id,
          label: this.arr[0].deptName,
          children: []
        }
        for (let i = 0; i < this.arr[0].children.length; i++) {
          obj.children.push({
            value: this.arr[0].children[i].id,
            label: this.arr[0].children[i].deptName
          })
        }
        this.bumenarr = [obj]
        console.log(this.bumenarr);
      });
    },
    dele1() {
      del(this.ids)
    },
    dele() {
    ElMessageBox.confirm("确认要删除吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        this.dele1();
        //渲染数据
        this.xuanran();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "删除已取消",
        });
      });
    }
},
  created() {
    this.xuanran();
    this.bumen();
  },
  updated(){
    window.localStorage.setItem('userNum',this.total)
  }
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

.el-select {
  width: 400px;
}

.m-2 {
  width: 130px;
  margin-top: 10px;
}
</style>
