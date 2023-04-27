<template>
    <div>
    <el-input v-model="input" placeholder="请输入要查找的名字" style="width: 240px; height: 40px; margin: 30px 0px;" />

    <el-table ref="tableRef" row-key="date" :data="tableData1" style="width: 100%">
        <el-table-column prop="realName" label="人员列表" width="130"></el-table-column>
        <el-table-column prop="tryCount" label="考试次数" width="120"></el-table-column>
        <el-table-column prop="maxScore" label="最高分" :formatter="formatter" width="130"></el-table-column>
        <el-table-column label="是否通过" :formatter="formatter" width="130">
            <template #default="scope">
              <div v-if="scope.row.passed" style="color: green;">
                通过
              </div>
              <div v-else style="color: red;">
                未通过
              </div>
            </template> 
        </el-table-column>
        <el-table-column prop="updateTime" label="最后考试时间" :formatter="formatter"></el-table-column>
        <el-table-column prop="updateTime" label="操作" :formatter="formatter">
            <template #default="scope">
                <el-button @click="Detail(scope.row)">考试明细</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="outerVisible" title="考试明细" style="height: 300px;">
        <template #default>
            <div class="elZong">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">考试时间：{{ obj.createTime }}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">考试用时：{{ obj.userTime }}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">考试得分：{{ obj.objScore }}</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">是否合格：{{ obj.hasSaq ? '是' : '否' }}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple">考试状态：{{ obj.state == 2 ? '已完成' : '考试中' }}</div>
                    </el-col>
                </el-row>
            </div>

        </template>
    </el-dialog>
</div>
</template>

<script>
import { getExampaging, getExamXiangQing } from '../api/user.js'
export default {
    data() {
        return {
            input: '',
            outerVisible: !true,
            tableData: [
                {
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
            ],
            tableData1:[],
            obj: {
                createTime: '',
                userTime: '',
                objScore: '',
                hasSaq: '',
            }
        }
    },
    methods: {
        Detail(row) {
            getExamXiangQing({ current: 1, params: { examId: row.examId, userId: row.userId }, size: 5 }).then((res) => {
                console.log(res.data.data.records[0])
                //考试时间
                this.obj.createTime = res.data.data.records[0].createTime
                // 考试用时
                this.obj.userTime = res.data.data.records[0].userTime
                //考试得分
                this.obj.objScore = res.data.data.records[0].objScore
                //是否合格
                this.obj.hasSaq = res.data.data.records[0].hasSaq
                this.obj.state = res.data.data.records[0].state
            })
            this.outerVisible = true
        }
    },
    created() {
        getExampaging({ current: 1, size: 10, params: { examId: this.$route.params.id } }).then((res) => {
            console.log(res.data.data.records)
            this.tableData1 = this.tableData = res.data.data.records
        })
    },
    watch: {
        input(v) {
            // console.log(v)
           this.tableData1 = this.tableData.filter((item)=>{
                return item.realName.indexOf(v)!=-1
            })
        }
    },
}
</script>
<style scoped>
.el-row {
    margin-top: 10px;
}

.elZong {
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        /* border: 1px solid salmon; */
}
</style>