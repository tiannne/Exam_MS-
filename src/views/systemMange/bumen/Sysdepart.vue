<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-input class="findCom" v-model="input" placeholder="搜索公司名称" @input="selectDepart" />
      </el-col>
      <!-- 添加按钮 -->
      <el-col :span="6" @click="addMainDepart">
        <el-button class="addBtn" type="primary">
          <el-icon>
            <Plus />
          </el-icon>
          添加
        </el-button>
      </el-col>
      <!-- 弹出表单框一 -->
      <el-dialog width="320px " :title="dialogTitle" v-model="dialogFormVisible" class="dialogsize">
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
      <!-- 弹出表单框二 -->
      <el-dialog width="320px " :title="dialogTitle" v-model="dialogFormVisible2" class="dialogsize">
        <el-form :model="form" ref="ruleFormRef" label-width="60px" style="max-width: 260px" :rules="rules">
          <el-form-item label="部门名称 " prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="departDefault">取 消</el-button>
          <el-button type="primary" @click="departAdd2($refs.ruleFormRef)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 表格 -->
    </el-row>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="deptName" label="名称" sortable width="350">
      </el-table-column>
      <el-table-column prop="deptCode" label="编码" sortable width="350">
      </el-table-column>
      <el-table-column prop="address" label="操作项" #default="scope">
        <!-- 添加子部门 -->
        <el-button class="wrap" type="text" size="small" @click="addDepart(scope.row.id)">
          <div class="box"><el-icon>
              <Plus />
            </el-icon></div>
        </el-button>
        <!-- 编辑部门 -->
        <el-button class="wrap" type="text" size="small" @click="editDepart(scope.row)">
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
    <!-- 分页 -->
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
      :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>
<script>
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import { findDepart, finddelete, findDetail } from '../../../api/sysdepart'
import { findPaging, findSave } from '../../../api/user'

export default {
  data() {
    return {
      addId: '',
      editName: '',
      /* 以下是分页的响应式数据 */
      currentPage: 1, //当前页
      total: 0, //总数
      list: [], //后台返回的所有结果
      pageSize: 5, //当前页容量
      tableData: [],//表格数据
      /* -------------------- */
      input: '',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogTitle: '',
      form: reactive({
        name: ''
      }),
      deptName: '',
      idsNum: '',
      rules: {
        name: [
          { required: true, message: '部门名称不能为空！', trigger: 'change' },
          { min: 3, message: '长度不少于3个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    /* ===========================分页============================ */
    handleSizeChange(val) {   //切换每页条数容量
      this.currentPage = 1;
      this.pageSize = val;
      console.log(this.pageSize, 999);
      this.getList();
    },
    handleCurrentChange(val) {   //切换当前页
      this.currentPage = val;
      console.log(this.currentPage, 888);
      this.getList();
    },
    getList() {    //获取数据
      findPaging({ current: 1, size: 9999, params: {} }).then((res) => {
        this.list = res.data.data.records;    //总数组
        this.total = res.data.data.records.length;      //总条数
      })
      findPaging({ current: this.currentPage, size: this.pageSize, params: {} }).then((res) => {
        // console.log('总数组：',res.data.data.records);
        // console.log('总条组：',res.data.data.records.length);

        this.tableData = this.getNeedArr(this.list, this.pageSize)[this.currentPage - 1]  //当前页的表格数据
        // console.log(this.tableData);
      });

    },
    getNeedArr(array, size) {       //获取所需指定长度分割的数组;参数1为用于分割的总数组,参数2为分割数组后每个小数组的长度
      console.log(array, size);
      const length = array.length;
      //判断不是数组，或者size没有设置，size小于1，就返回空数组
      if (!length || !size || size < 1) {
        return [];
      }
      //核心部分
      let index = 0; //用来表示切割元素的范围start
      let resIndex = 0; //用来递增表示输出数组的下标

      //根据length和size算出输出数组的长度，并且创建它。
      let result = new Array(Math.ceil(length / size));
      //进行循环
      while (index < length) {
        //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
        result[resIndex++] = array.slice(index, (index += size));
      }
      //输出新数组
      console.log(result);
      return result;
    },
    /* ----------------------------------------------------------- */
    addMainDepart() {
      this.dialogFormVisible = true
      this.dialogTitle = '添加部门'
    },
    /* ==========================初次渲染========================== */
    firstXuanran() {
      findPaging({ current: 1, size: 9999, params: {} }).then((res) => {
        // console.log(res.data.data.records)
        this.tableData = res.data.data.records
      })
    },
    /* =======================列表添加子部门======================= */
    addDepart(ev) {
      this.dialogFormVisible2 = true
      this.dialogTitle = '添加子部门'
      this.addId = ev
      console.log(this.addId)
    },

    departAdd2(formEl) {
      if (!formEl) return
      formEl.validate((valid, fields) => {
        if (valid) {
          this.dialogFormVisible2 = false;
          findSave({ parentId: this.addId, deptCode: this.deptCode, deptName: this.form.name }).then((res) => {
            this.getList();
            ElMessage.success('子部门添加成功')
            this.form.name = ''
          }).catch((res) => {
            console.log(res, '失败');
          })
        } else {
          console.log('error submit!', fields)
        }
      })
    },
    /* ========================列表编辑部门======================== */
    editDepart(ev) {
      this.dialogTitle = '编辑部门'
      this.form.name = ev.deptName
      this.dialogFormVisible2 = true
      console.log(ev.id);
      this.addId = ev.id
    },
    departAdd2(formEl) {
      if (!formEl) return
      formEl.validate((valid, fields) => {
        if (valid) {
          this.dialogFormVisible2 = false;
          findDetail({ id: this.addId }).then((res) => {
            console.log(res.data.data.deptName, '编辑部门res');
            this.editName = this.form.name
            findSave({ deptCode: res.data.data.deptCode, deptName: this.editName, deptType: res.data.data.deptType, id: res.data.data.id, parentId: res.data.data.parentId, sort: 8 }).then((res2) => {
              this.firstXuanran();
              ElMessage.success('部门编辑成功')
              this.form.name = ''
            }).catch((res2) => {
              console.log(res2, '失败');
            })
          }).catch((res) => {
            console.log(res, '失败');
          })
        } else {
          console.log('error submit!', fields)
        }
      })
    },
    /* ========================列表删除部门======================== */
    delateDepart(ev) {
      //删除信息提示框
      this.$confirm('确定删除该部门吗, 是否继续?', '提示', {
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
          //console.log(res, 111)
          for (let i = 0; i < this.tableData.length; i++) {
            // let that = this
            if (this.tableData[i].id === ev.id) {
              this.tableData.splice(i, 1)
            }
          }
          this.getList();
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
            this.getList();
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
      this.dialogFormVisible2 = false;
      this.form.name = ''
    }
  },
  created() {
    this.firstXuanran();
    this.getList();
    this.$store.commit('userToken/departNum',this.total)
  },
  updated(){
    console.log(this.total,'表格数据数量');
    //window.localStorage.setItem('departNum',this.total)
    this.$store.commit('userToken/departNum',this.total)
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