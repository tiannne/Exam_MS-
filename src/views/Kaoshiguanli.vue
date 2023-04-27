<template>
  <div>
  <el-cascader :options="options" @change="UpDataOpenType" size="large">
    <template #default="{ node, data }">
      <span>{{ data.label }}</span>
      <!-- <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span> -->
    </template>
  </el-cascader>

  <el-date-picker style="margin: 10px;" size="large" v-model="mstartTime" type="date" placeholder="考试开始时间" :size="size"
    @change="funstart()" />
  <el-date-picker size="large" v-model="mendTime" type="date" placeholder="考试结束时间" :size="size" @change="funend()" />
  <el-input size="large" style="width: 250px;margin: 10px;" v-model="searchInput" placeholder="搜索考试名称" />

  <div style="margin: 15px 0px;">
    <el-button size="large" icon="Plus" @click="JumpAddAndUpdata()">添加</el-button>

  </div>


  <div v-if="checkSum">
    <el-cascader :options="mySelectoperate" :placeholder="compOperate" @change="handleChange" />
  </div>


  <el-table size="large" :data="uplaterTabData" @select-all="handleChangeAll" v-model="hreadStore" stripe=true border
    @select="checktabel" style="width: 100% ;margin-top:20px;" :cell-style="{ textAlign: 'center' }"
    :header-cell-style="{ 'text-align': 'center' }">
    <!-- <el-table-column prop="name" width="50"> -->
    <el-table-column type="selection" width="50" />
    <!-- </el-table-column> -->
    <el-table-column prop="title" label="考试名称" width="145">
    </el-table-column>
    <el-table-column label="考试类型" width="145">
      <template #default="scope">{{ scope.row.openType == 1 ? '完全公开' : '指定部门' }}</template>
    </el-table-column>
    <el-table-column label="考试时间" width="220">
      <template #default="scope">{{ ExamTime(scope.row.endTime, scope.row.startTime) }}</template>
    </el-table-column>
    <el-table-column prop="totalScore" label="考试总分" width="145">
    </el-table-column>
    <el-table-column prop="qualifyScore" label="及格线" width="145">
    </el-table-column>
    <el-table-column label="状态" width="140">
      <template #default="scope">{{ scope.row.state ==0 ? "正常" : "禁用" }}</template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" icon="EditPen" @click="handleUpdata(scope.$index, scope.row)">修改</el-button>
        <el-button size="small" icon="User" type="danger" @click="handleDetail(scope.$index, scope.row)">考试详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row style="margin-top: 30px;">
    <el-col style="margin-left: 50px;" :span="3">
      共{{ uplaterTabData.length }}条
    </el-col>
    <el-col :span="3">
      <el-cascader style="width: 130px;" :options="footSelect" @change="funFootselect"></el-cascader>
    </el-col>
    <el-col :span="6">
      <el-pagination background layout="prev, pager, next" :total="40" />
    </el-col>
    <el-col :span="6">
      <div>前往<el-input style="width: 100px;" v-model="input" />页面</div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { getExamListData, setExamStore ,setExamDel} from '../api/user.js'
export default {
  name: 'Kaoshiguanli',
  data() {
    return {
      mstartTime: '',
      mendTime: '',
      searchInput: '',
      checkSum: 0,
      hreadStore: '',
      footMachSelect: 10,
      // dataObj:{},
      footSelect: [
        {
          label: '10条/每页',
          value: 10
        },
        {
          label: '30条/每页',
          value: 30
        },
        {
          label: '40条/每页',
          value: 40
        },
        {
          label: '50条/每页',
          value: 50
        },
      ],
      xuanZeArr: [],
      mySelectoperate: [
        {
          value: 'del',
          label: '删除'
        },
        {
          value: 'qY',
          label: '启用'
        },
        {
          value: 'jY',
          label: '禁用'
        },
      ],
      tableData: [
        // {
        //   openType: 1,
        //   totalScore: 100,
        //   qualifyScore: 60,
        //   state: 0,
        //   content: "考试1",
        //   id: '12341'

        // },
        // {
        //   openType: 2,
        //   totalScore: 100,
        //   qualifyScore: 60,
        //   state: 1,
        //   endTime: '2023-04-14',
        //   startTime: '2023-04-12',
        //   content: "考试2",
        //   id: '12342'
        // },
        // {
        //   openType: 1,
        //   totalScore: 100,
        //   qualifyScore: 60,
        //   state: 0,
        //   content: "周考试3",
        //   id: '12343'

        // },
        // {
        //   openType: 2,
        //   totalScore: 100,
        //   qualifyScore: 60,
        //   state: 0,
        //   endTime: '2023-04-14',
        //   startTime: '2023-04-13',
        //   content: "月考试",
        //   id: '12344'
        // },
        // {
        //   openType: 2,
        //   totalScore: 100,
        //   qualifyScore: 60,
        //   state: 0,
        //   endTime: '2023-04-14',
        //   startTime: '2023-04-13',
        //   content: "月考试",
        //   id: '12344'
        // },
      ],
      uplaterTabData: [],
      options: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '完全公开'
        },
        {
          value: 2,
          label: '部门开放'
        }
      ],
    }
  },
  methods: {
    handleDetail(index,row){
      this.$router.push({name:'kaoshiguanliExamDetail',params:{id:row.id||undefined}})
    },
    JumpAddAndUpdata(){
      this.$router.push({name:'kaoshiguanliExamAddAndUpdata',params:{id:''||undefined}})
    },
    ExamTime(endTime, startTime) {
      if (!endTime && !startTime) {
        return "不限时"
      } else {
        return `${startTime}~${endTime}`
      }
    },
    UpDataOpenType(event) {
      this.uplaterTabData = this.tableData.filter((item) => {
        if (event[0]) {
          return event == item.openType
        } else {
          return true
        }
      })
    },
    funstart() {
      if (this.mstartTime) {
        this.uplaterTabData = this.uplaterTabData.filter((item) => {
          if (item.startTime) {
            return this.mstartTime.getTime() <= Date.parse(item.startTime)
          } else {
            return false
          }
        })
      } else {
        this.uplaterTabData = this.tableData
      }
    },
    funend() {
      if (this.mendTime) {
        this.uplaterTabData = this.uplaterTabData.filter((item) => {
          if (item.endTime) {
            return this.mendTime.getTime() >= Date.parse(item.endTime)
          } else {
            return false
          }
        })
      } else {
        this.uplaterTabData = this.tableData
      }
    },
    handleUpdata(index, row) {
      console.log(index, row)
      this.$router.push({name:'kaoshiguanliExamUpData',params:{id:row.id||undefined}})
    },
    handleDelete() {

    },
    funFootselect(selection) {
      this.footMachSelect = selection[0]
      this.getExamListDataVue({ current: 1, params: { title: '' }, size: this.footMachSelect })
    },
    checktabel(selection, row) {
      if (!selection.find(m => m.id == row.id)) {
        this.checkSum = selection.length
        // console.log(row.id)
        const index1 = this.xuanZeArr.findIndex((item) => {
          return item == row.id
        })
        this.xuanZeArr.splice(index1, 1)
      } else {
        this.checkSum = selection.length
        this.xuanZeArr.push(row.id)
      }
    },
    handleChangeAll(selection) {
      this.checkSum = selection.length
      console.log(this.hreadStore)
      console.log(selection)
      if (selection.length == 0) {
        this.xuanZeArr = []
      } else {
        this.xuanZeArr = []
        for (let i = 0; i < selection.length; i++) {
          this.xuanZeArr.push(selection[i].id)
          console.log(selection[i].id)
        }
      }

    },
    handleChange(functionName) {
      if (functionName[0] == 'qY') {
        setExamStore(this.xuanZeArr, 0).then((res) => { console.log(res) })
        this.getExamListDataVue({ current: 1, params: { title: '' }, size: this.footMachSelect })
        this.checkSum = 0
      } else if (functionName[0] == 'jY') {
        setExamStore(this.xuanZeArr, 1).then((res) => { console.log(res) })
        this.getExamListDataVue({ current: 1, params: { title: '' }, size: this.footMachSelect })
        this.checkSum = 0
      }else{
        setExamDel({ids:this.xuanZeArr})
        this.getExamListDataVue({ current: 1, params: { title: '' }, size: this.footMachSelect })
        this.checkSum = 0
      }
    },
    getExamListDataVue(data) {
      getExamListData(data).then((res) => {
        this.tableData = res.data.data.records
        this.uplaterTabData = this.tableData

      })
    }
  },
  watch: {
    searchInput(e) {
      if (e) {
        this.uplaterTabData = this.uplaterTabData.filter((item) => {
          return item.title.indexOf(e) != -1
        })
      } else {
        this.uplaterTabData = this.tableData
      }

    }
  },
  created() {
    this.getExamListDataVue({ current: 1, params: { title: '' }, size: this.footMachSelect })
  },
  computed: {
    compOperate() {
      return `已选${this.checkSum}项`
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.el-button {
  padding: 9px 13px;
}
</style>