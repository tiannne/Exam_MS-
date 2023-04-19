<template>
    <div class="zong">
        <el-row>
            <el-col :span="12">
                <img src="../assets/loginform.png">
            </el-col>
            <el-col :span="12">
                <div class="my-from">
                    <h3 style="text-align: center;margin-bottom: 20px;">在线考试系统</h3>
                    <el-tabs model-value="first" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane label="密码登录" name="first">
                            <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
                                <el-form-item prop="username">
                                    <el-input v-model="ruleForm.username" type="text" autocomplete="off"
                                        prefix-icon="UserFilled" placeholder="请输入用户名" />
                                </el-form-item>
                                <el-form-item prop="pass">
                                    <el-input v-model="ruleForm.pass" type="password" @keyup.enter="submit('ruleForm')"
                                        autocomplete="off" prefix-icon="Lock" placeholder="请输入密码" />
                                </el-form-item>
                                <el-button style="width: 100%;" type="primary" @click="submit('ruleForm')">登录</el-button>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="手机登录" name="second">手机登录</el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {login} from '../api/user.js'
export default {
    data() {
        return {
            ruleForm: {
                username: '',
                pass: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {    
                    login(this.ruleForm.username,this.ruleForm.pass)
                    .then((res)=>{
                        if(res.data.code == 0){
                            this.$store.commit('userToken/setToken',res.data.data.token)
                            this.$router.push('/home')
                            this.$message.success("恭喜你登录成功")
                        }
                    }) 
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }

}
</script>

<style lang="scss" scoped>
.el-row {
    width: 800px;
    padding: 50px;
    margin: auto;
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    margin-top: 150px;
}

.my-from {
    width: 80%;
    margin: auto;
}

.zong {
    /* margin-top: 150px; */
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: url("../assets/loginbgc.png");
    background-size: 100%;
    overflow: hidden;
}

/* tab样式 */
:deep(.el-tabs__nav) {
    padding: 0 55px;
    // text-align: center;
    // background: green;
    width: 280px;
}
:deep(.el-tabs__item) {
    padding: 0 30px;
}
</style>