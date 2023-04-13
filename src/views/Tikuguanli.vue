<template>
  <div class="all">
      <el-row>
        <el-col>
    <el-input v-model="input" placeholder="搜索题库名称" />
  </el-col>
    </el-row>
    <el-row>
        <el-col>
          <el-button type="primary">
            <el-icon><Plus /></el-icon>添加
        </el-button>
        </el-col>
    </el-row>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55" />
       <el-table-column prop="name" label="题库名称"/>
      <el-table-column prop="name" label="单选题数量" />
      <el-table-column prop="address" label="多选题数量" />
      <el-table-column prop="address" label="判断题数量" />
      <el-table-column prop="address" label="创建时间" />
    </el-table>
    <div>
      <div class="demo">
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
const input = ref('')
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>

<style scoped>
.el-row{
  margin-bottom: 10px;
}
.el-input {
  width: auto;
}

.btn {
  margin: 20px 0;
}
.demo {
  margin-top: 40px;
}

.el-icon{
    margin-right: 5px;
}
:deep(.el-table .cell){
    text-align: center;
}
:deep(.el-table th.el-table__cell){
    background:rgb(217, 214, 214);
}
</style>
