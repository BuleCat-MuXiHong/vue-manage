<template>
    <el-form ref="form" label-width="70px" class="login-container" :inline="true" :model="form" :rules="rules">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input placeholder="请输入账号" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Cookie from 'js-cookie'
import {getMenu} from "@/api";

export default {
    data() {
        return {
            form: {
                username: 'admin',
                password: 'admin123'
            },
            rules: {
                username: [{required: true, trigger: 'blur', message: '请输入用户名'}],
                password: [{required: true, trigger: 'blur', message: '请输入密码'}]
            }

        }
    },
    methods: {
        //登录
        submit() {
            // //token
            // const token = Mock.Random.guid()
            // console.log(token)
            // //将token信息存入cookie
            // Cookie.set('token',token)


            //校验
            this.$refs.form.validate((valid)=>{
                if (valid){
                    getMenu(this.form).then((data)=>{
                        console.log(data.data.data.token)
                        if (data.data.code===20000){
                            Cookie.set('token',data.data.data.token)
                            //获取菜单
                            this.$store.commit('setMenu',data.data.data.menu)
                            this.$store.commit('addMenu',this.$router)



                            this.$message.success("登录成功")
                            this.$router.push('/home')
                        }else {
                            this.$message.error("密码错误")
                        }
                    })
                }
            })





        }
    }
}
</script>
<style scoped>
.login-container {
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    text-align: center;

    .el-input {
        width: 198px;
    }

    .login_title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }

}
</style>