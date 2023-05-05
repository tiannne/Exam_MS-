<template>
    <h1 style="margin: 20px 0px;">组卷信息</h1>
    <div class="hreadStyle">
        <el-row style="margin: 20px 0px;">
            <el-col :span="12">
                <el-button @click="getdata()">添加</el-button>
            </el-col>
            <el-col :span="12">
                <h4 style="color: red; float: right;">试卷总分:{{ numberValidateForm.totalScore }}分</h4>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="题库" width="180">
                <template #default="scope">
                    <el-cascader v-model="scope.row.data" :options="scope.row.arr"
                        @change="handleChange($event, scope.$index, scope.row)" />
                </template>
            </el-table-column>
            <el-table-column prop="name" label="单选数量" width="147">
                <template #default="scope">
                    <el-input-number v-model="repoList[scope.$index].radioCount" min="0"
                        :max="scope.row.objData?.radioCount" size="small" style="width: 70px; height: 32px;" />/{{
                            scope.row.objData?.radioCount }}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="单选分数" width="147">
                <template #default="scope">
                    <el-input-number v-model="repoList[scope.$index].radioScore" min="0" size="small"
                        style="width: 70px; height: 32px;" />
                </template>
            </el-table-column>
            <el-table-column prop="address" label="多选数量" width="147">
                <template #default="scope">
                    <el-input-number v-model="repoList[scope.$index].multiCount" min="0"
                        :max="scope.row.objData?.multiCount" size="small" style="width: 70px; height: 32px;" />/{{
                            scope.row.objData?.multiCount }}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="多选分数" width="147">
                <template #default="scope">
                    <el-input-number v-model="repoList[scope.$index].multiScore" min="0" size="small"
                        style="width: 70px; height: 32px;" />
                </template>
            </el-table-column>
            <el-table-column prop="address" label="判断数量" width="147">
                <template #default="scope">
                    <el-input-number v-model="repoList[scope.$index].judgeCount" min="0" size="small"
                        :max="scope.row.objData && scope.row.objData.judgeCount" style="width: 70px; height: 32px;" />/{{
                            scope.row.objData && scope.row.objData.judgeCount }}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="判断分数" width="147">
                <template #default="scope">
                    <el-input-number v-model="repoList[scope.$index].judgeScore" min="0" size="small"
                        style="width: 70px; height: 32px;" />
                </template>
            </el-table-column>
            <el-table-column prop="address" label="删除" width="147">
                <template #default="scope">
                    <el-button type="danger" icon="Delete" circle @click="delobj(scope.$index)" />
                </template>
            </el-table-column>
        </el-table>
    </div>

    <h3 style="margin: 30px 0px;">考试配置</h3>
    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="140px" class="demo-dynamic"
        label-position="left">
        <div class="hreadStyle">
            <el-form-item prop="title" label="考试名称" :rules="[
                { required: true, message: '考试名称你能为空', trigger: 'blur' }
            ]">
                <el-input v-model="numberValidateForm.title"></el-input>
            </el-form-item>
            <el-form-item prop="content" label="考试描述" :rules="[
                { required: true, message: '考试描述不能为空', trigger: 'blur' }
            ]">
                <el-input type="textarea" v-model="numberValidateForm.content"></el-input>
            </el-form-item>
            <el-form-item prop="totalScore" label="总分数" :rules="[
                { required: true, message: '总分数不能为空', trigger: 'blur' }
            ]">
                <el-input-number v-model="numberValidateForm.totalScore" @change="handleChange" label="描述文字"
                    :disabled="true"></el-input-number>
            </el-form-item>
            <el-form-item prop="qualifyScore" label="及格线" :rules="[
                { required: true, message: '及格线不能为空', trigger: 'blur' }
            ]">
                <el-input-number v-model="numberValidateForm.qualifyScore" min="0" :max="numberValidateForm.totalScore"
                    label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item prop="totalTime" label="考试时长(分钟)" :rules="[
                { required: true, message: '考试时长不能为空', trigger: 'blur' }
            ]">
                <el-input-number v-model="numberValidateForm.totalTime" min="1" label="描述文字"></el-input-number>
            </el-form-item>
            是否限时 <el-checkbox style="margin-left: 80px;" size="100" v-model="checked"></el-checkbox>
            <div style="width: 400px;" v-show="checked">
                <el-form-item label="考试时间">
                    <el-date-picker v-model="setDate" @change="setDateTime" type="daterange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </div>
        </div>

        <h3 style="margin: 30px 0px;">权限配置</h3>
        <div class="hreadStyle">
            <el-radio-group v-model="radio1" style="margin-bottom: 30px;">
                <el-radio :label="!true" border>全部开放</el-radio>
                <el-radio :label="!false" border>指定部门</el-radio>
            </el-radio-group>
            <div v-if="radio1">
                <el-tree :data="getDepartList" @check="getTreeData" :props="defaultProps" show-checkbox />
            </div>
            <div v-else>
                <el-alert title="warning alert" type="warning" />
            </div>
        </div>


        <el-dialog v-model="dialogVisible" title="提示" width="30%" :before-close="handleClose">
            <span>确定要提交吗</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="tiJiao()">确定</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        取消
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-button type="primary" style="margin: 30px 0px;" @click="submintFrom('numberValidateForm')">保存</el-button>
    </el-form>
    <br>
    <!-- {{ tableData }} -->
</template>
<script>
import { getExamRepoApi, getdepartTree, setExamSave ,getIdExam} from "../api/user.js"
export default {
    data() {
        return {
            dialogVisible: false,
            tableData: [],
            zongData: {},
            checked: false,
            radio1: !true,
            setDate: [],
            numberValidateForm: {
                //考试详情
                content: '',
                // 考试名称
                title: '',
                // 总分数
                totalScore: '',
                //结束时间
                endTime: '',
                // 开始时间
                startTime: '',
                // 老师详情列表
                repoList: [],
                // 指定部门列表
                departIds: [],
                // 及格分数
                qualifyScore: ''
            },
            defaultProps: {
                children: 'children',
                label: 'deptName',
            },
            repoList: [],
            getDepartList: [],
            footList: []

        }
    },
    methods: {
        tiJiao() {
            setExamSave(this.numberValidateForm).then((res) => {
                // console.log(res)
                if (res.data.code == 0) {
                    this.dialogVisible = false
                    this.$router.push("/kaoshi/guanli")
                    this.$notify({
                        title: '成功',
                        message: '添加成功',
                        type: 'success'
                    });

                    console.log(this.$route)
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '添加失败'
                    });
                }
            })
        },
        getTreeData(e, v) {
            // console.log(e)
            console.log(v.checkedNodes)
            let arr = []
            for (let i = 0; i < v.checkedNodes.length; i++) {
                // console.log(v.checkedNodes[i].id)
                arr.push(v.checkedNodes[i].id)
            }
            this.footList = arr
        },
        getdata() {
            this.tableData.push({ arr: [] })
            getExamRepoApi({ current: 1, params: { excludes: [""] }, size: 1000 }).then((res) => {
                for (let j = 0; j < this.tableData.length; j++) {
                    if (this.tableData[j].arr.length == 0) {
                        for (let i = 0; i < res.data.data.records.length; i++) {
                            this.tableData[j].arr.push({
                                value: res.data.data.records[i].id,
                                label: res.data.data.records[i].title,
                            })
                        }
                    }
                }
            })
            //                           题库id   单选数量       单选总数       单选分数          多选数量        多选总数        多选分数        判断数量     判断总数        判断分数       判断总题量    多选总题量   单选总体量 
            this.repoList.push({ id: 0, repoId: 0, radioCount: 0, totalRadio: 0, radioScore: 0, multiCount: 0, totalMulti: 0, multiScore: 0, judgeCount: 0, totalJudge: 0, judgeScore: 0, totalJudge: 0, totalMulti: 0, totalRadio: 0 })
        },
        handleChange(e, index, rowData) {
            let obj = this.zongData.filter((item) => {
                return item.id == e
            })[0]
            this.tableData[index].objData = obj
            this.repoList[index].id = e[0]
            this.repoList[index].repoId = e[0]
            console.log(rowData.objData)
            this.repoList[index].totalRadio = obj.radioCount
            this.repoList[index].multiCount = obj.multiCount
            this.repoList[index].judgeCount = obj.judgeCount
        },
        spdfmt(date) {
            var date = new Date(date);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        },
        setDateTime() {
            this.numberValidateForm.startTime = this.spdfmt(this.setDate[0])
            this.numberValidateForm.endTime = this.spdfmt(this.setDate[1])
        },
        submintFrom(formEl) {
            this.numberValidateForm.departIds = this.footList
            this.numberValidateForm.repoList = this.repoList
            this.$refs[formEl].validate((valid) => {
                if (valid) {
                    this.dialogVisible = true
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        delobj(index) {
            this.tableData.splice(index, 1)
            this.repoList.splice(index, 1)
        },
        isShow() {
            this.checked = !this.checked
        }
    },
    created() {
        getExamRepoApi({ current: 1, params: { excludes: [""] }, size: 1000 }).then((res) => {
            this.zongData = res.data.data.records
        })
        getdepartTree().then((res) => {
            this.getDepartList = res.data.data
        })
        getIdExam({id:this.$route.params.id}).then((res)=>{
          this.numberValidateForm = res.data.data
        for(let i=0;i<res.data.data.repoList.length;i++){
            this.repoList.push(res.data.data.repoList[i])
        }
        this.getdata()
        })
    },
  beforeMount(){
                          
  },
    watch: {
        numberValidateForm: {
            deep: true,
            handler() {
                let sum = 0;
                for (let item in this.repoList) {
                    sum += this.repoList[item].radioCount * this.repoList[item].radioScore + this.repoList[item].multiCount * this.repoList[item].multiScore + this.repoList[item].judgeCount * this.repoList[item].judgeScore
                }
                this.numberValidateForm.totalScore = sum
            },

        },
    }
}
</script>
<style scoped>
.el-from {
    width: 300px;
    height: 200px;
    border: 1px solid salmon;
}

.hreadStyle {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border: 1px solid rgb(228, 228, 228);
    border-radius: 10px;
    padding: 40px;
}

button {
    padding: 15px 25px;
}

.hredneirong {
    margin: 10px 0px;
    padding: 5px 0px;
}
</style>