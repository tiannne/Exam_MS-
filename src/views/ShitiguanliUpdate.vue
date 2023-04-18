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
            :rules="rules"
            disabled
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
          >
            <el-option
              v-for="item in optionsFromBank"
              :key="item.id"
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
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
          >
            <el-button type="primary">点击上传</el-button>
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
            <el-button type="primary">点击上传</el-button>
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
          <el-button type="primary" @click="clickSave()">更新</el-button>
          <el-button type="info" @click="clickReturn">返回</el-button>
        </el-row>
      </el-col>
    </div>
  </div>
</template>

<script>
import { initQuestionBank, addQuestion,questionDetail,questionBankDetail} from "../api/shitiguanli";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      optionsTypeCheck: ["单选题", "多选题", "判断题"],
      optionsDifficultyLevel: ["普通", "较难"],
      optionsFromBank: [],

      fileList: [
        {
          name: "	https://lite.yfhl.net/upload/file/2023/04/14/1646674709460025346.jpg",
          url: "https://lite.yfhl.net/upload/file/2023/04/14/1646674709460025346.jpg",
        },
      ],
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
          return;
        }
      });
      //-----------------------------------------判断表格内容

      //-------------------------------------------判断选择个数
      if (this.ruleForm.questionType == "") {
        return;
      }
      let num = 0; //计算选中个数
      this.tableData.forEach((item) => {
        if (item.checkType) {
          num++;
        }
      });
      if (num === 0) {
        alert("请选择正确答案");
        return false;
      }
      if (this.ruleForm.questionType === 1) {
        //单选题
        if (num > 1) {
          alert("单选题只能有一个答案");
          return false;
        }
      }
      if (this.ruleForm.questionType === 2) {
        if (num === 1) {
          alert("多选题答案不能唯一");
          return false;
        }
      }
      if (this.ruleForm.questionType === 3) {
        if (num > 1) {
          alert("判断题只能有一个答案");
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
        alert("答案内容不能为空");
        return false;
      }
      //---------------------------------------判断题目内容
      const answerList = this.tableData.map((item) => {
        return {
          isRight: item.checkType,
          content: item.answerContent,
          analysis: item.answerAnalysis,
        };
      });
      let date=new Date()
      let time =date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
      const data = {
        repoIds: this.ruleForm.fromBank,
        tagList: [], //不知道是什么
        image:
          "https://lite.yfhl.net/upload/file/2023/04/14/1646674709460025346.jpg", //写死先
        quType: this.ruleForm.questionType,
        level: this.ruleForm.difficultyLevel,
        content: this.ruleForm.questionContent,
        analysis: this.ruleForm.questionAnalysis,
        answerList: answerList,
        createTime: this.ruleForm.createTime,
        updateTime:time
      };
      console.log(data);
      addQuestion(data).then((res) => {
        if (res.data.code === 0) {
          ElMessage({
            type: "success",
            message: "更新成功",
          });
          this.$router.push('/shiti/guanli')
        }
      });
    },
  },
  created() {
    //初始化题库
    let initdata = { current: 1, size: 1000, params: {} };
    initQuestionBank(initdata).then((res) => {
      const initData = res.data.data.records;
      initData.forEach((item) => {
        this.optionsFromBank.push({ title: item.title, tikuID: item.id });
      });
    });
    console.log(this.optionsFromBank);
    //初始化题目数据
    const QuestionId = this.$route.params.id;
    questionDetail({ id: QuestionId }).then((res) => {
      let detailData=res.data.data
      this.ruleForm={
        questionType:detailData.quType, //quType
        difficultyLevel: detailData.level, //level
        fromBank: detailData.repoIds, //repoIds
        questionContent: detailData.content, //content
        imgUrl: "",
        questionAnalysis: detailData.analysis, //analysis 整题解析
        createTime:detailData.createTime,
        updateTime:''
      }
    //   console.log(detailData.repoIds);
    //   questionBankDetail({id:detailData.repoIds[0]}).then(res=>{
    //     this.ruleForm.fromBank=res.data.data.title
    //   })
      //初始表格数据
      detailData.answerList.forEach(item=>{
        this.tableData.push({checkType: item.isRight, answerContent:item.content, answerAnalysis: item.analysis})
      })
     
    });
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  padding: 20px;
  border: 1px solid #ccc;
  background: white;
  box-shadow: 0px -1px 10px 0px #ccc, /*上边阴影  红色*/ -1px 0px 10px 0px #ccc,
    /*左边阴影  绿色*/ 1px 0px 10px 0px #ccc,
    /*右边阴影  蓝色*/ 0px 1px 10px 0px #ccc; /*下边阴影  黄ccc*/
  margin-bottom: 30px;
}
.el-table {
  border: 1px solid #ccc;
  background: white;
  box-shadow: 0px -1px 10px 0px #ccc, /*上边阴影  红色*/ -1px 0px 10px 0px #ccc,
    /*左边阴影  绿色*/ 1px 0px 10px 0px #ccc,
    /*右边阴影  蓝色*/ 0px 1px 10px 0px #ccc; /*下边阴影  黄ccc*/
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


