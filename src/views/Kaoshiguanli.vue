<template>
    <div>
      <el-row justify="space-between">
        <el-col :span="12" class="colLeft">
          <el-select v-model="value" class="m-2" placeholder="选择题型">
            <el-option v-for="(item, index) in options" :key="index" :label="item" :value="index" />
          </el-select>
          <el-select
            v-model="value"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="搜索题库"
            remote-show-suffix
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            v-model="input1"
            
            placeholder="题目内容"
          />
        </el-col>
        <el-col :span="4"  class="colRight">
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
      <el-table-column property="name" label="题库类型" width="120" align="center"/>
      <el-table-column property="name" label="单选题数量"  />
      <el-table-column label="创建时间" prop="date" align="center" width="240"></el-table-column>
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
          <template #small>共200页</template>
      </el-pagination>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        value: 0,
        options: ['单选题', '多选题', '判断题'],
        tableData: [
    {
      date: '2016-05-03',
      name: 'Tom',
  
    },
    {
      date: '2016-05-02',
      name: 'Tom',
  
    },
    {
      date: '2016-05-04',
      name: 'Tom',
  
    },
    {
      date: '2016-05-01',
      name: 'Tom',
  
    },
    {
      date: '2016-05-08',
      name: 'Tom',
  
    },
    {
      date: '2016-05-06',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-07',
      name: 'Tom',
  
    },
  ]
      }
    }
  }
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
  .colRight{
  display: flex;
  justify-content: end;
  }
  .el-icon{
      margin-right: 5px;
  }
  .el-row{
      margin-bottom: 10px;
  }
  // :deep(.el-table .el-table__cell ){
  //     text-align: center ;
  // }
  :deep(.el-table th.el-table__cell){
      background:rgb(217, 214, 214);
  }
  .pageChangeBox{
      margin-top: 60px;
  }
  </style>
  