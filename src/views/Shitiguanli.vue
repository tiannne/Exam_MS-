<template>
  <div v-show="showChange">
    <el-row justify="space-between">
      <el-col :span="12" class="colLeft">
        <el-select v-model="valueCheck" class="m-2" placeholder="选择题型">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select
          v-model="valueSearch"
          filterable
          remote
          reserve-keyword
          placeholder="选择或搜索题库"
          remote-show-suffix
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item,index in optionsTikuSearch"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-input v-model="ValueTimu" placeholder="题目内容" />
      </el-col>
      <el-col :span="4" class="colRight">
        <el-button-group>
          <el-button type="primary">
            <el-icon><Download /></el-icon>导入
          </el-button>
          <el-button type="primary">
            <el-icon><Upload /></el-icon>导出
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button type="primary" @click="addTi">
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-select value=""  class="m-2" :placeholder='plhderValue'>
          <el-option
            v-for="(item2, index2) in optionstwo"
            :key="index2"
            :label="item2"
            :value="item2"
            @click="handleChange(item2)"
          />
        </el-select>
      </el-col>
    </el-row>

    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="20%">
      <el-form :model="dialogForm">
        <el-form-item label="操作题库" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.value" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        property="name"
        label="题库类型"
        width="120"
        align="center"
      />
      <el-table-column property="name" label="题目内容" />
      <el-table-column
        label="创建时间"
        prop="date"
        align="center"
        width="240"
      ></el-table-column>
    </el-table>

    <div class="pageChangeBox">
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
  <router-view v-show="!showChange"></router-view>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  data() {
    return {
        showChange:true,
        valueCheck:'',  //输入框1
        valueSearch:'',//输入框2
        ValueTimu:'',//输入框3
        plhderValue:'10项',  //多少项被选中
      dialogFormVisible: false,
      dialogTitle: "",
      selectCount:'10',
      dialogForm: { value: "" },
      options: ["单选题", "多选题", "判断题"],
      optionsTikuSearch:['题库1','题库2','题库3'],
      optionstwo: ["加入题库", "从..题库删除", "删除"],
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
        },
        {
          date: "2016-05-02",
          name: "Tom",
        },
        {
          date: "2016-05-04",
          name: "Tom",
        },
        {
          date: "2016-05-01",
          name: "Tom",
        },
        {
          date: "2016-05-08",
          name: "Tom",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
        },
      ],
    };
  },
  methods: {
    addTi(){
        this.$router.push('/shiti/guanli/add')
    },
    handleChange(item2) {
        console.log(item2);
      if (item2 === "加入题库") {
        this.dialogTitle = "加入题库";
        this.dialogFormVisible = true;
      } else if (item2 === "从..题库删除") {
        this.dialogTitle = "从题库删除";
        this.dialogFormVisible = true;
      } else {
        ElMessageBox.confirm(
          "你确定要删除吗",
          "Warning",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            ElMessage({
              type: "success",
              message: "删除成功",
            });
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "取消删除",
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  width: auto;
}
.colLeft {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.colRight {
  display: flex;
  justify-content: end;
}
.el-icon {
  margin-right: 5px;
}
.el-row {
  margin-bottom: 10px;
}
// :deep(.el-table .el-table__cell ){
//     text-align: center ;
// }
:deep(.el-table th.el-table__cell) {
  background: rgb(217, 214, 214);
}
.pageChangeBox {
  margin-top: 60px;
}
.m-2{
    width: 130px;
}
</style>
