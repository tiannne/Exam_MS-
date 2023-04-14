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
    <el-select v-model="value" class="m-2" placeholder="已选0项">
      <el-option value="删除" @click="del" />
    </el-select>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55" align="center"/>
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
import { ref, computed } from "vue";
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
const currentPage4 = ref();
const pageSize4 = ref(10);
const total = ref();

const tableData = ref([
  {
    title: "",
    radioCount: "",
    multiCount: "",
    judgeCount: "",
    createTime: "",
  },
]);

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
tikuguanli(1, 10, { title: "" }, 1681385062869).then((res) => {
  console.log(res.data.data.records);
  total.value = res.data.data.total;
  // for (let i = 0; i < res.data.data.records.length; i++) {
  //   tableData.value[i] = res.data.data.records[i];
  // }
 tableData.value = res.data.data.records;
});
const sousuo = () => {
  tikuguanli(currentPage4.value, pageSize4.value, { title: input.value }).then((res) => {
    tableData.value = res.data.data.records;
  });
};

const yeshu = () => {
  tikuguanli(currentPage4.value, pageSize4.value, { title: "" }).then(
    (res) => {
      tableData.value = res.data.data.records;
    }
  );
};

const handleSizeChange = () => {
   tikuguanli(currentPage4.value, pageSize4.value, { title: "" }).then(
    (res) => {
      tableData.value = res.data.data.records;
    }
  );
}

const handleCurrentChange = () => {
   tikuguanli(currentPage4.value, pageSize4.value, { title: "" }).then(
    (res) => {
      tableData.value = res.data.data.records;
    }
  );
}

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
