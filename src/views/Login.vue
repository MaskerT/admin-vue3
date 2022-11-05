<template>
  <div class="login-body">
    <!-- 登录框div -->
    <div class="login-container">
      <div class="head">
        <img class="logo" src="//s.weituibao.com/1582958061265/mlogo.png" alt="后台管理系统">
        <div class="name">
          <div class="title">电商后台管理系统</div>
          <div class="tips">基于Vue3.0开发</div>
        </div>
      </div>
      <el-form label-position="top" :rules="state.rules" :model="state.ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="state.ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="state.ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a href="#">服务条款</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm">立即登录</el-button>
          <el-checkbox v-model="state.checked" @change="!state.checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import axios from "@/utils/axios.js";
import md5 from 'js-md5'
import { reactive, ref } from "vue";
import { localSet } from "@/utils/index.js";

//todo 这里的elementUI表单验证逻辑需要梳理一下
//利用el-form 的ref属性来获取组件实例
const loginForm = ref()
const state = reactive({
  ruleForm: {
    username: '',
    password: '',
  },
  checked: true,
  //表单验证判断,验证器的配置
  rules: {
    username: [
      { required: 'true', massage: '账号不能为空', trigger: 'blur' }
    ],
    password: [
      { required: 'true', massage: '密码不能为空', trigger: 'blur' }
    ]
  }
})
//表单提交方法
const submitForm = () => {
  loginForm.value.validate((valid) => {
    //  valid为true则表单通过了上述rules的规则
    if (valid) {
      // /adminUser/login 登录接口路径
      axios.post('/adminUser/login', {
        userName: state.ruleForm.username || '',
        passwordMd5: md5(state.ruleForm.password), // 密码需要 md5 加密
      }).then(res => {
        // 返回的时候会有一个 token，这个令牌就是我们后续去请求别的接口时要带上的，否则会报错，非管理员。
        // 这里我们将其存储到 localStorage 里面。
        localSet('token', res)
        // 此处登录完成之后，需要刷新页面
        // 此处不能使用路由方法跳转页面，页面不刷新的情况下获取token的方法不会执行
        window.location.href = '/'
      })
    } else {
      console.log('error submit!!')
      return false;
    }
  })
}
// 重制方法
const resetForm = () => {
  // loginForm能拿到 el-form 的重制方法
  loginForm.value.resetFields();
}
</script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}

.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 21px 41px 0 rgba(0, 0, 0, 0.2);
}

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}

.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.head .title {
  font-size: 28px;
  color: #1BAEAE;
  font-weight: bold;
}

.head .tips {
  font-size: 12px;
  color: #999;
}

.login-form {
  width: 70%;
  margin: 0 auto;
}

.login-form>>>.el-form--label-top .el-form-item__label {
  padding: 0;
}

.login-form>>>.el-form-item {
  margin-bottom: 0;
}
</style>