<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-input class="findCom" v-model="input" placeholder="搜索公司名称" />
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
        <el-form :model="form" ref="form" label-width="60px" style="max-width: 260px" :rules="rules">
          <el-form-item label="部门名称 " prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="departAdd">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 表格 -->
    </el-row>
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="date" label="名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="编码" sortable width="180">
      </el-table-column>
      <el-table-column prop="address" label="操作项">

        <el-button class="wrap" type="text" size="small">
          <div class="box"><el-icon>
              <Plus />
            </el-icon></div>
        </el-button>
        <el-button class="wrap" type="text" size="small">
          <div class="box"><el-icon>
              <EditPen />
            </el-icon></div>
        </el-button>
        <el-button class="wrap" type="text" size="small">
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
import { reactive } from 'vue'
import { findPaging, findSave,findDepart,finddelete } from '../api/Sysdepart'
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: reactive({
        name: ''
      }),
      tableData: [],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    departAdd() {
      this.dialogFormVisible = false;
      findSave({parentId:0,deptName:this.form.name}).then((res) => {
       this.tableData = res.data
        console.log(res.data);
      }).catch((res)=>{
        console.log(res,1111);
      })
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '林俊杰',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '林俊杰',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    }
  },
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