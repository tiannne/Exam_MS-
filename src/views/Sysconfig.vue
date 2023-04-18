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
          :before-remove="beforeRemove"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
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
// import { UploadProps, UploadUserFile } from "element-plus";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { initLogoInfo, RoleListSave } from "../api/Sysconfig";

export default {
  data() {
    return {
      formLabelAlign: {
        siteName: "华越在线培训考试系统",
        backLogo: [],
        copyRight: "版权@12314esx",
        id: "1",
      },
      //       fileList: [
      // {name: '写死的名字', url: 'https://lite.yfhl.net/upload/file/2023/04/15/1647144546288271362.jpg'}
      //       ],
    };
  },
  methods: {
    // beforeRemove(uploadFile, uploadFiles) {
    beforeRemove(uploadFile, uploadFiles) {
      return ElMessageBox.confirm(`你是否要删除文件?`).then(
        () => true,
        () => false
      );
    },
    //点击确定删除
    handleRemove() {
      // UploadProps["onRemove"] = (file, uploadFiles) => {
      //   console.log(file, uploadFiles);
      // }
      this.formLabelAlign.backLogo = "";
    },
    //更新
    handleSave() {
      this.formLabelAlign.backLogo =
        this.formLabelAlign.backLogo === ""
          ? ""
          : this.formLabelAlign.backLogo[0].url;
      console.log(this.formLabelAlign.backLogo);
      RoleListSave(this.formLabelAlign).then((res) => {
        if (res.data.code === 0) {
          ElNotification({
            title: "成功",
            message: "配置保存成功",
            type: "success",
          });
          // const timer = setInterval(() => {
          //   this.$router.go(0);
          //   clearInterval(timer);
          // }, 500);
        }
      });
    },
  },
  beforeCreate() {
    console.log(1);
    initLogoInfo({ id: 1 }).then((res) => {
      console.log(res.data.data);
      res.data.data.backLogo = [
        { name: "写死的名字", url: res.data.data.backLogo },
      ];
      console.log(res.data.data.backLogo);
      this.formLabelAlign = res.data.data;
      console.log(this.formLabelAlign);
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
