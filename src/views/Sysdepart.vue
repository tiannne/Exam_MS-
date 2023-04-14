<template>
 <div>
  <el-row>
   <el-col :span="7">
    <el-input class="findCom" v-model="input" placeholder="搜索公司名称" />
   </el-col>
   <el-col :span="6">
    <el-button class="addBtn" type="primary" @click="dialogFormVisible = true">
     <el-icon>
      <Plus />
     </el-icon>
     添加
    </el-button>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
   :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
   <el-table-column prop="date" label="名称" sortable width="180">
   </el-table-column>
   <el-table-column prop="name" label="编码" sortable width="180">
   </el-table-column>
   <el-table-column prop="address" label="操作项">
   </el-table-column>
  </el-table>
 </div>
</template>

<script>
export default {
 data() {
  return {
   tableData: [{
    id: 1,
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
   }, {
    id: 2,
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
   }, {
    id: 3,
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
    children: [{
     id: 31,
     date: '2016-05-01',
     name: '王小虎',
     address: '上海市普陀区金沙江路 1519 弄'
    }, {
     id: 32,
     date: '2016-05-01',
     name: '王小虎',
     address: '上海市普陀区金沙江路 1519 弄'
    }]
   }, {
    id: 4,
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
   }],
   tableData1: [{
    id: 1,
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
   }, {
    id: 2,
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
   }, {
    id: 3,
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
    hasChildren: true
   }, {
    id: 4,
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
   }]
  }
 },
 methods: {
  load(tree, treeNode, resolve) {
   setTimeout(() => {
    resolve([
     {
      id: 31,
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
     }, {
      id: 32,
      date: '2016-05-01',
      name: '王小虎',
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
</style>