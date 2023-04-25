<template>
  <div>
    <div class="div">
      <el-form :model="form" :rules="rules">
        <el-form-item label="题库名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="题库备注">
          <el-input v-model="form.desc" type="textarea" />
          <el-textarea></el-textarea>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive} from "vue";
import { useRouter } from "vue-router";
import { add } from "../../../api/tikuguanli";
import { ElMessage } from "element-plus";

const router = useRouter();

const form = reactive({
  name: "",
  desc: "",
});
const rules = reactive({
  name: [{ required: true, message: "题库名称不能为空！", trigger: "blur" }],
});
const onSubmit = () => {
  add(form.name, form.desc).then((res) => {
    ElMessage({
      message: "题库保存成功",
      type: "success",
    });
    router.push("/tiku/guanli");
  });
};
const back = () => {
  router.push("/tiku/guanli");
};
</script>

<style scoped>
.div {
  padding: 20px;
  border: 1px solid #ccc;
  background: white;
  height: 266px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04),
    /*左边阴影  绿色*/ 1px 0px 10px 0px #ccc,
    /*右边阴影  蓝色*/ 0px 1px 10px 0px #ccc; /*下边阴影  黄ccc*/
}
.btn {
  margin-top: 20px;
}
:deep(.el-textarea__inner) {
  resize: none;
  height: 170px;
}
</style>
