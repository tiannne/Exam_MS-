<template>
  <div>
    <el-row>
      <el-col>
        <el-input v-model="input" placeholder="搜索题库名称"  />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button type="primary"  @click="add">
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </el-col>
    </el-row>
    <el-select v-model="value" class="m-2" placeholder="已选10项" >
      <el-option value="删除" @click="del" />
    </el-select>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="name" label="题库名称" />
      <el-table-column prop="name" label="单选题数量" align="center" />
      <el-table-column prop="address" label="多选题数量" align="center" />
      <el-table-column prop="address" label="判断题数量" align="center" />
      <el-table-column prop="address" label="创建时间" align="center" />
    </el-table>
    <div>
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
  </div>
</template>

<script setup>
import { ref,computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
//
import { useRouter } from "vue-router";
//
import { useStore } from 'vuex'
const store=useStore()
//
const router = useRouter();
const input = ref("");
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const a = computed(()=>store.state.a)

const tableData = [
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
];

const del = () => {
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
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除已取消",
      });
    });
};
const add = () => {
  router.push("/tiku/guanli/tikuadd");
  
};
</script>

<style scoped>
.el-row {
  margin-bottom: 10px;
}
.el-input {
  width: auto;
}

.btn {
  margin: 20px 0;
}
.el-pagination{
    margin-top: 40px;
}

.el-icon {
  margin-right: 5px;
}
:deep(.el-table th.el-table__cell) {
  background: rgb(217, 214, 214);
}
.m-2 {
  width: 130px;
  margin-bottom: 10px;
}
</style>
