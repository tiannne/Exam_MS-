<template>
  <div>
    <el-form label-position="left" label-width="100px" :model="formLabelAlign">
      <el-form-item label="系统名称">
        <el-input v-model="formLabelAlign.SystemName" />
      </el-form-item>
      <el-form-item label="系统Logo">
        <el-upload
          v-model:file-list="fileList"
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
        <el-input v-model="formLabelAlign.CopyrightInfo" />
      </el-form-item>
      <div class="save"><el-button type="primary">保存</el-button></div>
    </el-form>
  </div>
</template>

<script>
// import { UploadProps, UploadUserFile } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  data() {
    return {
      formLabelAlign: {
        SystemName: "华越在线培训考试系统",
        Logo: "",
        CopyrightInfo: "版权@12314esx",
      },
      fileList: [
        {
          name: "	https://lite.yfhl.net/upload/file/2023/04/14/1646674709460025346.jpg",
          url: "https://lite.yfhl.net/upload/file/2023/04/14/1646674709460025346.jpg",
        },
      ],
    };
  },
  methods: {
    beforeRemove(uploadFile, uploadFiles) {
      return ElMessageBox.confirm(`你是否要删除文件?`).then(
        () => true,
        () => false
      );
    },
    handleRemove() {
      UploadProps["onRemove"] = (file, uploadFiles) => {
        console.log(file, uploadFiles);
      }
    },
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
