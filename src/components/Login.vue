<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>

      <!-- 表单区域 -->
      <!-- 第12、13步，数据绑定和表单验证规则 -->
      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="email">
          <el-input prefix-icon="iconfont icon-account-fill" v-model="loginForm.email"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-password" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="login_btn">
          <el-button type="primary" @click="validateLoginForm">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单的数据绑定对象
      loginForm: {
        email: 'lkqqqq1234@126.com',
        password: 'google8908'
      },
      // 表单的验证规则对象
      loginFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            min: 10,
            max: 20,
            message: '长度在 10 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 10,
            message: '长度在 6 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮重置表单
    resetLoginForm () {
      // 获取表单的实例对象取名为loginFormRef
      // 调用表单的resetFields方法，定义一个重置内容方法
      this.$refs.loginFormRef.resetFields()
    },
    validateLoginForm () {
      this.$refs.loginFormRef.validate(async (valid, obj) => {
        if (!valid) return
        // 判断校验是否通过
        // 通过则发送请求
        // 结构赋值出数据里的 data 属性，其他的不要
        // console.log(this.loginForm)
        const { data: res } = await this.$http.post(
          '/api/login',
          this.loginForm
        )
        switch (res.status) {
          case 200:
            this.$message.success('登录成功')
            sessionStorage.setItem('token', res.data._id)
            // 跳转到home 首页
            this.$router.push('/home')
            break
          case 1:
            this.$message.error('邮箱或者密码错误')
            break
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  .login_form {
    padding: 0 15px;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    .login_btn {
      display: flex;
      justify-content: flex-end;
    }
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      width: 80px;
      height: 80px;
      border: 1px solid #eeeeee;
      border-radius: 50%;
      box-shadow: 0 0 10px #dddddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-top: 20px;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
}
</style>
