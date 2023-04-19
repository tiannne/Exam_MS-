<template>
  <div>
    <el-form label-position="left" label-width="100px" :model="formLabelAlign">
      <el-form-item label="系统名称">
        <el-input v-model="formLabelAlign.siteName" />
      </el-form-item>
      <el-form-item label="系统Logo">
        <el-upload
          v-model:file-list="formLabelAlign.backLogo"
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
      <el-form-item label="版权信息">
        <el-input v-model="formLabelAlign.copyRight" />
      </el-form-item>
      <div class="save">
        <el-button type="primary" @click="handleSave">更新</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { initLogoInfo, RoleListSave } from "../api/Sysconfig";
import store from "../store";

export default {
  data() {
    return {
      formLabelAlign: {
        siteName: "华越在线培训考试系统",
        backLogo: [],
        copyRight: "版权@12314esx",
        id: "1",
      },
      tokenHeader:{}
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
      this.formLabelAlign.backLogo = "";
    },
    //上传前的钩子函数
    handleExceed(){
        ElMessage.error('logo只能上传一张图片')

    },
    //上传成功时
    uploadSuccess(){
      console.log(this.formLabelAlign.backLogo);
      this.formLabelAlign.backLogo=[{name:this.formLabelAlign.backLogo[0].response.data.url,url:this.formLabelAlign.backLogo[0].response.data.url}]
      console.log(this.formLabelAlign.backLogo,111);
    },
    //更新
    handleSave() {
      this.formLabelAlign.backLogo =
        this.formLabelAlign.backLogo === ""
          ? ""
          : this.formLabelAlign.backLogo[0].url;
      console.log(this.formLabelAlign.backLogo);
      RoleListSave(this.formLabelAlign).then((res) => {
        console.log(res.data);
        if (res.data.code === 0) {
          ElNotification({
            title: "成功",
            message: "配置保存成功",
            type: "success",
          });
        }
      });
    },
  },
  beforeCreate() {
    initLogoInfo({ id: 1 }).then((res) => {
      console.log(res.data.data);
      res.data.data.backLogo = [
        { name: "写死的名字", url: res.data.data.backLogo },
      ];
      console.log(res.data.data.backLogo);
      this.formLabelAlign = res.data.data;
      // console.log(this.formLabelAlign);
      this.tokenHeader={token:store.state.userToken.token}
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
}
:deep(.el-form-item__label) {
  justify-content: start;
  margin-left: 10px;
  font-weight: 700;
}
.save {
  display: flex;
  justify-content: center;
}
</style>
