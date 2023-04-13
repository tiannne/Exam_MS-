<template>
  <div>
    <div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        border
      >
        <el-form-item label="题目类型" prop="questionType">
          <el-select
            v-model="ruleForm.questionType"
            class="m-2"
            placeholder="题目类型"
            @change="choiceType(ruleForm.questionType)"
            :rules="rules"
          >
            <el-option
              v-for="(item, index) in optionsTypeCheck"  
              :key="index"
              :label="item"
              :value="item"
             
            />
          </el-select>
        </el-form-item>
        <el-form-item label="等级难度" prop="difficultyLevel">
          <el-select
            v-model="ruleForm.difficultyLevel"
            class="m-2"
            placeholder="等级难度"
          >
            <el-option
              v-for="(item, index) in optionsDifficultyLevel"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="归属题库" prop="fromBank">
          <el-select
            v-model="ruleForm.fromBank"
            class="m-2"
            placeholder="归属题库"
          >
            <el-option
              v-for="(item, index) in optionsFromBank"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="题目内容" prop="questionContent">
          <el-input
            v-model="ruleForm.questionContent"
            :rows="4"
            type="textarea"
            placeholder="请输入题目内容"
          />
        </el-form-item>
        <el-form-item label="试题图片" prop="imgUrl">
          <el-button type="primary">点击上传</el-button>
        </el-form-item>
        <el-form-item label="整题解析" prop="questionAnalysis">
          <el-input
            v-model="ruleForm.questionAnalysis"
            :rows="4"
            type="textarea"
          />
        </el-form-item>
      </el-form>
<!-- ------------------------------------------------------------------------------------------------------------------- -->
      <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="60" align="center" label="是否答案"  >
        <template #default="scope">
            <input type="checkbox" v-model="scope.row.checkType"><span style="margin-left:6px">正确</span>
        </template>
      </el-table-column>
      <el-table-column
        label="选项图片"
        width="115"
        align="center"
      >
      <template #default="scope">
        <el-button type="primary">点击上传</el-button>
        </template>
    </el-table-column>
      <el-table-column
        label="答案内容"
        width="500"
        align="center"
      >
      <template #default="scope">
            <el-input
            :rows="2"
            type="textarea"
            placeholder="请输入答案内容"
            v-model="scope.row.answerContent"
          />
        </template>
     
    </el-table-column>
      <el-table-column
        label="答案解析"
        width="500"
        align="center"
      >
      <template #default="scope">
        <el-input
            :rows="2"
            type="textarea"
            placeholder="答案解析"
            v-model="scope.row.answerAnalysis"
          />
        </template>
    </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
      <el-button><el-icon color="red" size="20"><DeleteFilled /></el-icon></el-button>
    </el-table-column>
     
    </el-table>
    <el-col>
        <el-row>
            <el-button type="primary">保存</el-button>
            <el-button type="info" @click="clickReturn">返回</el-button>
        </el-row>
    </el-col>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsTypeCheck: ["单选题", "多选题", "判断题"],
      optionsDifficultyLevel: ["普通", "较难"],
      optionsFromBank: ["题库1", "题库2", "题库3"],
      ruleForm: {
        questionType: "",
        difficultyLevel: "",
        fromBank: "",
        questionContent: "",
        imgUrl: "",
        questionAnalysis: "",
      },
      tableData:[],
       rules : {
        questionType:{ required: true, message: '题目类型不能为空！', trigger: 'blur'},
        difficultyLevel:{ required: true, message: '等级难度不能为空！', trigger: 'blur'},
        fromBank:{ required: true, message: '归属题库不能为空！', trigger: 'blur'},
        questionContent:{ required: true, message: '题目内容不能为空！', trigger: 'blur'},
        }
    };
  },
  methods:{
    choiceType:function(type){
        if(type==='判断题'){
            console.log('判断1');
            this.tableData=[{checkType:true,answerContent:'正确',answerAnalysis:''},{checkType:false,answerContent:'错误',answerAnalysis:''}]
        }else{
            console.log('判断2');
            this.tableData=[{checkType:false,answerContent:'',answerAnalysis:''},{checkType:false,answerContent:'',answerAnalysis:''},
            {checkType:false,answerContent:'',answerAnalysis:''},{checkType:false,answerContent:'',answerAnalysis:''}]
        }
    },
    clickReturn:function(){
        this.$router.back(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form{
    padding: 20px;
    border: 1px solid #ccc;
    background: white;
    box-shadow: 0px -1px 10px 0px #ccc,   /*上边阴影  红色*/
                -1px 0px 10px 0px #ccc,   /*左边阴影  绿色*/
                1px 0px 10px 0px #ccc,    /*右边阴影  蓝色*/
                0px 1px 10px 0px #ccc;    /*下边阴影  黄ccc*/
    margin-bottom: 30px;
}
.el-table{
    border: 1px solid #ccc;
    background: white;
    box-shadow: 0px -1px 10px 0px #ccc,   /*上边阴影  红色*/
                -1px 0px 10px 0px #ccc,   /*左边阴影  绿色*/
                1px 0px 10px 0px #ccc,    /*右边阴影  蓝色*/
                0px 1px 10px 0px #ccc;    /*下边阴影  黄ccc*/
    margin-bottom: 30px;
}
:deep(.el-form-item__label){
    justify-content: start;
    margin-left: 10px;
    font-weight: 700;
}
</style>
