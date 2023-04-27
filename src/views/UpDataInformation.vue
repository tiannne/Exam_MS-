<template>
    <el-row>
        <el-col class="div1" :span="7">
            <h4 style="margin: 15px;">个人资料</h4>
            <el-divider border-style="solid" />
            <div class="img">
                <el-avatar :size="90" style="border: 5px solid #e9e9eb"
                    src="https://tse4-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?pid=ImgDet&rs=1" />
                <h4 style="margin-top: 20px; text-align: center;">欢迎：{{ username }}</h4>
            </div>
            <!-- -------------------------答题详情--------------------------->
            <div style="margin-top: 60px;">
                <h4 class="title">数量统计</h4>
                <el-card class="box-card" shadow="hover">
                    <ul>
                        <li>
                            <h3>题库数</h3>
                            <h1>{{ tikuNum }}</h1>
                        </li>
                        <li>
                            <h3>部门数</h3>
                            <h1>{{ departNum }}</h1>
                        </li>
                        <li>
                            <h3>用户数</h3>
                            <h1>{{ userNum }}</h1>
                        </li>
                    </ul>
                </el-card>
            </div>
            <!-- -----------------------答题详情结束------------------------->
        </el-col>
        <el-col class="div2" :span="15">
            <el-tabs model-value="first" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="修改资料" name="first">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="ruleForm.username" type="text"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input v-model="ruleForm.pass" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkpass">
                            <el-input v-model="ruleForm.checkpass" type="password"></el-input>
                        </el-form-item>
                        <el-button type="primary" size="large" @click="submitForm('ruleForm')">修改</el-button>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!/^[a-zA-Z0-9_-]{8,16}$/.test(value)) {
                callback(new Error('密码只能由8~16位数字、字母组成'))
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            userNum:0,
            tikuNum:0,
            departNum:0,
            username: '',
            ruleForm: {
                username: '',
                pass: '',
                checkpass: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'change' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkpass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            },
        };
    },
    created() {
        this.username = window.localStorage.getItem('username')
        // this.departNum = window.localStorage.getItem('departNum')
        this.departNum = this.$store.state.userToken.departNum
        this.userNum = window.localStorage.getItem('userNum')
        this.tikuNum = window.localStorage.getItem('tikuNum')
    },
    methods: {
        submitForm(formEl) {
            if (!formEl) return
            this.$refs[formEl].validate((valid, fields) => {
                if (valid) {
                    console.log('submit!')
                } else {
                    console.log('error submit!', fields)
                }
            })
        }
    }
}

</script>

<style lang="scss" scoped>
.img {
    margin: auto;
    width: 90px;
    float: inline-end;
    margin-top: 20px;
    margin: auto;
}

.div1 {
    width: 100%;
    height: 270px;
    border: rgb(218, 218, 218) 1px solid;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin: 20px;
}

.div2 {
    width: 100%;
    height: 400px;
    border: rgb(218, 218, 218) 1px solid;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin: 20px;
    padding: 30px 50px 0px 50px;
}

//答题详情
.title {
 padding: 22px 0 0 20px;
}

.box-card {
    background: #0a84ff;
    margin-top: 15px;
    width: 100%;
    height: 79px;

    ul {
        list-style: none;
        display: flex;
        justify-content: space-around;
        margin-top: -10px;

        li {
            height: 100%;
            width: 30%;
            text-align: center;

            // background-color: aquamarine;
            h3 {
                color: #afd5fa;
                line-height: 30px;
                font-size: 16px;
            }

            h1 {
                color: #fff;
                line-height: 30px;
                font-size: 22px;
            }
        }
    }
}</style>