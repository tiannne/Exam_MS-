<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-input class="findCom" v-model="input" placeholder="搜索公司名称" @input="selectDepart" />
      </el-col>
      <!-- 添加按钮 -->
      <el-col :span="6" @click="dialogFormVisible = true">
        <el-button class="addBtn" type="primary">
          <el-icon>
            <Plus />
          </el-icon>
          添加
        </el-button>
      </el-col>
      <!-- 弹出表单框 -->
      <el-dialog width="320px " title="添加部门" v-model="dialogFormVisible" class="dialogsize">
        <el-form :model="form" ref="ruleFormRef" label-width="60px" style="max-width: 260px" :rules="rules">
          <el-form-item label="部门名称 " prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="departDefault">取 消</el-button>
          <el-button type="primary" @click="departAdd($refs.ruleFormRef)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 表格 -->
    </el-row>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="deptName" label="名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="deptCode" label="编码" sortable width="180">
      </el-table-column>
      <el-table-column prop="address" label="操作项" #default="scope">
        <!-- 添加子部门 -->
        <el-button class="wrap" type="text" size="small" @click="addDepart">
          <div class="box"><el-icon>
              <Plus />
            </el-icon></div>
        </el-button>
        <!-- 编辑部门 -->
        <el-button class="wrap" type="text" size="small" @click="editDepart">
          <div class="box"><el-icon>
              <EditPen />
            </el-icon></div>
        </el-button>
        <!-- 删除部门 -->
        <el-button class="wrap" type="text" size="small" @click="delateDepart(scope.row)">
          <div class="box"><el-icon>
              <Delete />
            </el-icon></div>
        </el-button>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[10, 20, 30, 40]"
      :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="60" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>
<script>
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { findDepart, finddelete } from '../../../api/sysdepart'
import { findPaging, findSave } from '../../../api/user'

export default {
  data() {
    return {
      input: '',
      dialogFormVisible: false,
      form: reactive({
        name: ''
      }),
      deptName: '',
      idsNum: '',
      tableData: [],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    /* ==========================初次渲染========================== */
    firstXuanran() {
      findPaging({ current: 1, size: 10, params: {} }).then((res) => {
        // console.log(res.data.data.records)
        this.tableData = res.data.data.records
      })
    },
    /* ========================列表编辑部门======================== */

    /* ========================列表删除部门======================== */
    delateDepart(ev) {
      //删除信息提示框
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
        //删除操作
        this.ideNum = ev.id
        finddelete({ ids: ev.id }).then((res) => {
          // console.log(ev.id);
          // console.log(res, 111)
          for (let i = 0; i < this.tableData.length; i++) {
            // let that = this
            if (this.tableData[i].id === ev.id) {
              this.tableData.splice(i, 1)
            }
          }
          this.firstXuanran()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    /* ========================列表搜索部门======================== */
    selectDepart() {
      findPaging({ current: 1, size: 10, params: { deptName: this.input } }).then((res) => {
        console.log(res.data.data.records)
        this.tableData = res.data.data.records
      })
    },
    /* ==========================添加部门========================== */
    departAdd(formEl) {
      if (!formEl) return
      formEl.validate((valid, fields) => {
        if (valid) {
          this.dialogFormVisible = false;
          findSave({ parentId: 0, deptCode: this.deptCode, deptName: this.form.name }).then((res) => {
            // if (this.tableData.length === 0) {}
            // console.log(this.tableData.length, '第一个');
            this.tableData.push(JSON.parse(res.config.data))
            ElMessage.success('部门添加成功')
            this.form.name = ''
            this.firstXuanran()
            /* } else {
              if (this.tableData.map((v) => v.deptName).includes(this.form.name)) {
                ElMessage.error('部门名称重复')
                this.form.name = ''
                this.firstXuanran()
              } else {
                this.tableData.push(JSON.parse(res.config.data))
                ElMessage.success('部门添加成功')
                this.form.name = ''
                this.firstXuanran()
              }*/

          }).catch((res) => {
            console.log(res, '失败');
          })
        } else {
          console.log('error submit!', fields)
        }
      })
    },
    /* ==========================取消弹窗========================== */
    departDefault() {
      this.dialogFormVisible = false;
      this.form.name = ''
    }
  },
  created() {
    this.firstXuanran()
  }
}
</script>



<style lang="scss" scoped>
.el-row {
  width: 600px;
  display: flex;
  margin-bottom: 20px;

  .findCom {
    width: 200px;
    height: 38px;
  }

  .dialog-footer {
    margin-left: 120px;
    margin-top: 50px;
  }

  .addBtn {
    width: 85px;
    height: 38px;
    margin-left: 35px;
  }

}

:deep(.el-table th.el-table__cell) {
  background: rgb(242, 243, 244);
  color: #666;
}

:deep(.el-form-item__label) {
  width: 90px !important;
  margin-right: 20px;
  font-weight: bold;
  font-size: 15px;
}

.wrap {
  width: 35px;
  height: 35px;
  margin: 0 5px;

  .box {
    width: 33px;
    height: 33px;
    color: #666;
    text-align: center;
    font-size: 12px;
    line-height: 33px;
    border-radius: 50%;
    border: 1px solid #ccc;
  }
}
</style>