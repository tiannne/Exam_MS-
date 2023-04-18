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
              :value="index + 1"
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
              :value="index + 1"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="归属题库" prop="fromBank">
          <el-select
            v-model="ruleForm.fromBank"
            class="m-2"
            placeholder="归属题库"
            multiple
          >
            <el-option
              v-for="item in optionsFromBank"
              :key="item.tikuID"
              :label="item.title"
              :value="item.tikuID"
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
          <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          :headers='tokenHeader'
          action="https://lite.yfhl.net/common/api/file/upload"
          :limit="1"
          :on-exceed="handleExceed"
          :before-remove="beforeRemove"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"
          list-type="picture"
        >
          <el-button type="primary">上传图片</el-button>
        </el-upload>
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
        <el-table-column
          type="selection"
          width="80"
          align="center"
          label="是否答案"
        >
          <template #default="scope">
            <input type="checkbox" v-model="scope.row.checkType" /><span
              style="margin-left: 6px"
              >正确</span
            >
          </template>
        </el-table-column>
        <el-table-column label="选项图片" width="115" align="center">
          <template #default="scope">
           <el-form class="tableform">
            <el-upload
          v-model:file-list="scope.row.fileList"
          class="upload-demo"
          :headers='tokenHeader'
          action="https://lite.yfhl.net/common/api/file/upload"
          :limit="1"
          :on-exceed="handleExceed"
          :before-remove="beforeRemove"
          :on-remove="AnswerHandleRemove(scope.$index)"
          :on-success="AnswerUploadSuccess(scope.$index)"
          list-type="picture"
        >
        <el-button type="primary">上传图片</el-button>
      </el-upload>
           </el-form>
          </template>
        </el-table-column>
        <el-table-column label="答案内容" width="500" align="center">
          <template #default="scope">
            <el-input
              :rows="2"
              type="textarea"
              placeholder="请输入答案内容"
              v-model="scope.row.answerContent"
            />
          </template>
        </el-table-column>
        <el-table-column label="答案解析" width="500" align="center">
          <template #default="scope">
            <el-input
              :rows="2"
              type="textarea"
              placeholder="答案解析"
              v-model="scope.row.answerAnalysis"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <el-button
            ><el-icon color="red" size="20"><DeleteFilled /></el-icon
          ></el-button>
        </el-table-column>
      </el-table>
      <el-col>
        <el-row class="btnflex">
          <el-button type="primary" @click="clickSave()">保存</el-button>
          <el-button type="info" @click="clickReturn">返回</el-button>
        </el-row>
      </el-col>
    </div>
  </div>
</template>

<script>
import { initQuestionBank,addQuestion } from "../api/shitiguanli";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import store from "../store";



export default {
  data() {
    return {
      optionsTypeCheck: ["单选题", "多选题", "判断题"],
      optionsDifficultyLevel: ["普通", "较难"],
      optionsFromBank: [],
      tokenHeader:{},
      fileList: [],
      ruleForm: {
        questionType: "", //quType
        difficultyLevel: "", //level
        fromBank: "", //repoIds
        questionContent: "", //content
        imgUrl: "",
        questionAnalysis: "", //analysis 整题解析
      },
      tableData: [],
      rules: {
        questionType: {
          required: true,
          message: "题目类型不能为空！",
          trigger: "blur",
        },
        difficultyLevel: {
          required: true,
          message: "等级难度不能为空！",
          trigger: "blur",
        },
        fromBank: {
          required: true,
          message: "归属题库不能为空！",
          trigger: "blur",
        },
        questionContent: {
          required: true,
          message: "题目内容不能为空！",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    beforeRemove(uploadFile, uploadFiles) {
      return ElMessageBox.confirm(`你是否要删除文件?`).then(
        () => true,
        () => false
      );
    },

    //点击确定删除
    handleRemove(uploadFile,uploadFiles) {
      this.fileList = [];
    },
    //上传前的钩子函数
    handleExceed(){
        ElMessage.error('每次只能上传一张图片')
    },
    //上传成功时
    uploadSuccess(){
      this.fileList=[{name:'试题图片',url:this.fileList[0].response.data.url}]
    },

    //答案列表 点击确定删除
    AnswerHandleRemove(index){
      return (res)=>{
        console.log(index);
        this.tableData[index].fileList=[]
        this.tableData[index].image=''
        // console.log(this.tableData[index].fileList);
      }
    },
    //答案列表上传成功时的钩子函数
    AnswerUploadSuccess(index){
      return (res)=> {
        console.log(index);
        this.tableData[index].fileList=[{name:`试题${index+1}`,url:res.data.url}]
        // console.log(this.tableData[index].fileList);
        this.tableData[index].image=res.data.url
        // console.log(this.tableData[index].image);
      }
    },
    //-----------------------------------------------------------------------
    choiceType: function (type) {
      if (type === 3) {
        this.tableData = [
          { checkType: true, answerContent: "正确", answerAnalysis: "",image:"",fileList: [] },
          { checkType: false, answerContent: "错误", answerAnalysis: "",image:"",fileList: [] },
        ];
      } else {
        this.tableData = [
          { checkType: false, answerContent: "", answerAnalysis: "",image:"", fileList: [] },
          { checkType: false, answerContent: "", answerAnalysis: "",image:"", fileList: [] },
          { checkType: false, answerContent: "", answerAnalysis: "",image:"", fileList: [] },
          { checkType: false, answerContent: "", answerAnalysis: "",image:"", fileList: [] },
        ];
      }
    },
    clickReturn: function () {
      this.$router.back(-1);
    },

    clickSave() {
//-----------------------------------------判断表格内容
      let formEl = this.$refs.ruleFormRef;
      if (!formEl) return;
       formEl.validate((valid, fields) => {
         if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!", fields);
          return
        }
      });
//-----------------------------------------判断表格内容

//-------------------------------------------判断选择个数
if(this.ruleForm.questionType==''){
  return
}
      let num = 0; //计算选中个数
      this.tableData.forEach((item) => {
        if (item.checkType) {
          num++;
        }
      });
      if (num === 0) {
        ElMessage.warning("请选择正确答案");
        return false;
      }
      if (this.ruleForm.questionType === 1) {
        //单选题
        if (num > 1) {
          ElMessage.warning("单选题只能有一个答案");
          return false;
        }
      }
      if (this.ruleForm.questionType === 2) {
        if (num === 1) {
          ElMessage.warning("多选题答案不能唯一");
          return false;
        }
      }
      if (this.ruleForm.questionType === 3) {
        if (num > 1) {
          ElMessage.warning("判断题只能有一个答案");
          return false;
        } 
      }
//-------------------------------------------判断选择个数

// ------------------------------------------判断题目内容
      let result = this.tableData.every(
        (item) => item.answerContent.trim() != ""
      ); //判断每项都不为空
      console.log(!result);
      if (!result) {
        ElMessage.warning("答案内容不能为空");
        return false;
      }
//---------------------------------------判断题目内容
      const answerList = this.tableData.map((item) => {
        return {
          isRight: item.checkType,
          content: item.answerContent,
          analysis: item.answerAnalysis,
          image:item.image
        };
      });
      console.log(this.fileList);
   
      const data = {
        repoIds: this.ruleForm.fromBank,
        tagList: [], //不知道是什么
        image: this.fileList.length>0? this.fileList[0].url:'',
        quType: this.ruleForm.questionType,
        level: this.ruleForm.difficultyLevel,
        content: this.ruleForm.questionContent,
        analysis: this.ruleForm.questionAnalysis,
        answerList: answerList,
      };
      console.log(data);
      addQuestion(data).then(res=>{
        if(res.data.code===0){
          ElMessage({
              type: "success",
              message: "添加成功",
            });
            this.$router.push('/shiti/guanli')
        }
      })
    
    },
  },
  created() {
    this.tokenHeader={token:store.state.userToken.token}
    //初始化题库
    let initdata = { current: 1, size: 1000, params: {} };
    initQuestionBank(initdata).then((res) => {
      const initData = res.data.data.records;
      initData.forEach((item) => {
        this.optionsFromBank.push({ title: item.title, tikuID: item.id });
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  padding: 20px;
  border: 1px solid #eee;
  background: white;
  box-shadow: 0px -1px 10px 0px #eee, /*上边阴影  红色*/ -1px 0px 10px 0px #eee,
    /*左边阴影  绿色*/ 1px 0px 10px 0px #eee,
    /*右边阴影  蓝色*/ 0px 1px 10px 0px #eee; /*下边阴影  黄ccc*/
  margin-bottom: 30px;
}
.tableform{
  padding: 0;
  border: none;
  margin-bottom: 0;
  box-shadow: none;
}
.el-table {
  border: 1px solid #eee;
  background: white;
  box-shadow: 0px -1px 10px 0px #eee, /*上边阴影  红色*/ -1px 0px 10px 0px #eee,
    /*左边阴影  绿色*/ 1px 0px 10px 0px #eee,
    /*右边阴影  蓝色*/ 0px 1px 10px 0px #eee; /*下边阴影  黄ccc*/
  margin-bottom: 30px;
}
:deep(.el-form-item__label) {
  justify-content: start;
  margin-left: 10px;
  font-weight: 700;
}
.btnflex{
    display: flex;
    justify-content: center;
}
</style>
