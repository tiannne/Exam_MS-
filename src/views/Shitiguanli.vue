<template>
  <div v-show="showChange">
    <el-row justify="space-between">
      <el-col :span="12" class="colLeft">
        <el-select v-model="valueType" class="m-2" placeholder="选择题型" @change="changeType">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item"
            :value="index+1"
          />
        </el-select>
        <el-select
          v-model="valueBank"
          filterable
          remote
          multiple
          reserve-keyword
          placeholder="选择或搜索题库"
          remote-show-suffix
          @change="changeQuestionBank"
        >
          <el-option
            v-for="item in optionsTikuSearch"
            :key="item.tikuId"
            :label="item.title"
            :value="item.tikuID"
          />
        </el-select>
        <el-input v-model="ValueTitle" placeholder="题目内容" @input="chanengContent" />
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
        <el-button type="primary" @click="addQuestion">
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-select value=""  class="m-2" :placeholder='plhderValue' v-show='placeholderShow'>
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
          
          <el-select
          v-model="valueBank2"
          filterable
          remote
          multiple
          reserve-keyword
          placeholder="选择或搜索题库"
          remote-show-suffix
        >
          <el-option
            v-for="item in optionsTikuSearch"
            :key="item.tikuId"
            :label="item.title"
            :value="item.tikuID"
          />
        </el-select>

        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addQuestionBank()">
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
      @selection-change="selectfunction"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        prop="quType"
        label="题库类型"
        width="120"
        align="center"
      />
      <el-table-column prop="content" label="题目内容"  >
        <template #default="scope">
            <div @click="ContentClick(scope.row.id)" style="cursor: pointer;">{{ scope.row.content }}</div>
        </template>
    </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        align="center"
        width="240"
      ></el-table-column>
    </el-table>

    <div class="pageChangeBox">
      <el-pagination
        v-model:current-page="selectCount"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
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
import {initsubject,initQuestionBank,tiAddOrMovueToBank,removeQuestion} from '../api/shitiguanli'
export default {
  data() {
    return {
        showChange:true,
        valueType:'',  //输入框1--type
        valueBank:[],//输入框2--题库id
        ValueTitle:'',//输入框3 题目
        valueBank2:'',//小页面输入框--题库id
        plhderValue:'',  //多少项被选中
        placeholderShow:false, //选中题 则显示
      dialogFormVisible: false,
      dialogTitle: "",
      selectCount:1,//当前页数
      totalPage:0,//数据总条数
      pageSize:10,//一页显示几条数据
      dialogForm: [],
      tiIDList:[],//当前页面选中的题目 id列表
      options: ["单选题", "多选题", "判断题"],//type 类型
      optionsTikuSearch:[],//题库类型
      optionstwo: ["加入题库", "从..题库删除", "删除"],
      tableData: [
          {
            quType:'111',
            content:'222',
            createTime:'333'
          }
      ],
    };
  },
  computed:{
    placeholderShow(){
      return this.tiIDList.length>0? true:false
    }
  },
  methods: {
    addQuestion(){
        this.$router.push('/shiti/guanli/add')
    },
    handleChange(item2) {
      if (item2 === "加入题库") {
        this.dialogTitle = "加入题库";
        this.dialogForm=this.optionsTikuSearch
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
            removeQuestion({ids:this.tiIDList}).then(res=>{
              if(res.data.code===0){
                ElMessage({
              type: "success",
              message: "删除成功",
            });
            location.reload();              
          }
            })
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "取消删除",
            });
          });
      }
    },

    //公共方法
     getQuerstion(num=1){
        //num为起始页数
        this.selectCount=num
        let initdata={current: this.selectCount, size: this.pageSize, params: {content: this.ValueTitle, quType: this.valueType,repoIds: this.valueBank}}
    initsubject(initdata).then(res=>{
        const initData=res.data.data.records
        this.tableData=[]
        this.selectCount=res.data.data.current
        this.totalPage=res.data.data.total
        initData.forEach(item=>{
            if(item.quType === 1){
                item.quType='单选题'
            }else if(item.quType === 2){
                item.quType='多选题'
            }else{
                item.quType='判断题'
            }
            this.tableData.push(item)
        })
    }) 
    },
    //改变题类型 渲染数据
    changeType(){
    this.getQuerstion()
    },
    //选择题库 渲染数据
    changeQuestionBank(){
    this.getQuerstion()
    },
    //修改内容 渲染数据
    chanengContent(){
    this.getQuerstion()
    },
    //点击每页数据多少条
    handleSizeChange(){
    this.getQuerstion()
    },
    //前往第几页 点击第几页
    handleCurrentChange(){
    this.getQuerstion(this.selectCount)
    },
    //点击题跳更新改页
    ContentClick(id){
        this.$router.push(`/shiti/guanli/update/${id}`)
    },
    //修改提示 获得选中题的id数组
    selectfunction(val){
        this.plhderValue=`当前选中${val.length}项`
        this.tiIDList=[]
        val.forEach(item=>{
          this.tiIDList.push(item.id)
        })
    },
    //题目加入或者移除题库
    addQuestionBank(){
      let choice
      console.log( this.dialogTitle);
      if(this.dialogTitle === '加入题库' ){
        choice=false//添加
      }else{
        choice=true//删除
      }
      const data={"repoIds": this.valueBank2,"quIds": this.tiIDList,"remove": choice,}
      if(this.valueBank2.length<=0){
        ElMessage({
              type: 'warning',
              message: '未选择题库',
            });
      }else{
        tiAddOrMovueToBank(data).then(res=>{
        if(res.data.code===0){
          console.log(this.valueBank2);
          ElMessage({
              type: `${choice?'success':'warning'}`,
              message: `${choice?'添加':'移除'}成功`,
            });
            location.reload();      
            }
      })
      this.dialogFormVisible = false
      }
      
    }
  },
  created(){
    //初始化题数据
    this.getQuerstion()

    //初始化题库数据
    let initdata2={current: this.selectCount, size: 1000, params: {}}
    initQuestionBank(initdata2).then(res=>{
      console.log(res.data.data);
        const initData=res.data.data.records
        initData.forEach(item=>{
            this.optionsTikuSearch.push({title:item.title,tikuID:item.id})
        })
    })
  }
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
  margin-top: 40px;
}
.m-2{
    width: 130px;
}
</style>
