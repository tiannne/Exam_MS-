<template>
  <div>
    <el-row>
      <el-col>
        <el-input v-model="input" placeholder="搜索题库名称" @input="sousuo" />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button type="primary" @click="add">
          <el-icon><Plus /></el-icon>添加
        </el-button>
      </el-col>
    </el-row>
    <el-select v-model="value" class="m-2" :placeholder="'已选' + num + '项'" v-if="boolean">
      <el-option value="删除" @click="del" />
    </el-select>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="title" label="题库名称" />
      <el-table-column prop="radioCount" label="单选题数量" align="center" />
      <el-table-column prop="multiCount" label="多选题数量" align="center" />
      <el-table-column prop="judgeCount" label="判断题数量" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
    </el-table>
    <div>
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @click="yeshu"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
//
import { useRouter } from "vue-router";
//
import { useStore } from "vuex";
import { tikuguanli } from "../api/tikuguanli";
import { dele } from "../api/tikuguanli";

const store = useStore();
//
const router = useRouter();
const input = ref();
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const total = ref();
const num = ref(0);
const boolean=ref(false)
//
const ids = [];
//
const tableData = ref([
  {
    title: "",
    radioCount: "",
    multiCount: "",
    judgeCount: "",
    createTime: "",
  },
]);
const xuanran = () => {
  tikuguanli(currentPage4.value, pageSize4.value, { title: input.value }).then((res) => {
    total.value = res.data.data.total;
    tableData.value = res.data.data.records;
  });
}
const del = () => {
  ElMessageBox.confirm("确认要删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      dele(ids);
      //渲染数据
    xuanran()
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除已取消",
      });
    });
};
const add = () => {
  router.push("/tiku/guanli/tikuadd");
};
//渲染数据
  xuanran()
const sousuo = () => {
   xuanran()
};

const yeshu = () => {
  xuanran()
};

const handleSizeChange = () => {
  xuanran()
};

const handleCurrentChange = () => {
  xuanran()
};

const handleSelectionChange = (val) => {
  // console.log(val.length);
  // console.log(val[0].id);
  if (val.length>0) {
    boolean.value=true
  } else {
    boolean.value=false
  }
  num.value = val.length;
  for (let i = 0; i < val.length; i++) {
    console.log(val[i].id);
    ids.push(val[i].id);
  }

};
</script>

<style scoped>
.el-row {
  margin-bottom: 10px;
}
.el-input {
  width: auto;
}

.btn {
  margin: 20px 0;
}
.el-pagination {
  margin-top: 40px;
}

.el-icon {
  margin-right: 5px;
}
:deep(.el-table th.el-table__cell) {
  background: rgb(217, 214, 214);
}
.m-2 {
  width: 130px;
  margin-bottom: 10px;
}
</style>
