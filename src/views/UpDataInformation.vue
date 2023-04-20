<template>
    <el-row>
        <el-col class="div1" :span="7">
            <h3 style="margin: 15px;">个人资料</h3>
            <el-divider border-style="solid" />
            <div class="img">
                <el-avatar :size="90" style="border: 5px solid #e9e9eb"
                    src="https://tse4-mm.cn.bing.net/th/id/OIP-C.g9UbVfyVZX-SfD09JcYr5QHaEK?pid=ImgDet&rs=1" />
                <h4 style="margin-top: 20px; text-align: center;">欢迎：{{ username }}</h4>
            </div>

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
            username:'',
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

<style scoped>
.img {
    margin: auto;
    width: 90px;
    float: inline-end;
    margin-top: 20px;
    margin: auto;
}

.div1 {
    width: 100%;
    height: 300px;
    border: rgb(218, 218, 218) 1px solid;
    border-radius: 5px;
    box-shadow: 0 7px 9px rgba(0, 0, 0, .12);
    margin: 20px;
}

.div2 {
    width: 100%;
    height: 400px;
    border: rgb(218, 218, 218) 1px solid;
    border-radius: 5px;
    box-shadow: 0 7px 9px rgba(0, 0, 0, .12);
    margin: 20px;
    padding: 30px 50px 0px 50px;
}
</style>