<template>
  <div>
    <!-- Breadcrumb 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索框与添加区域 -->
      <el-row :gutter="8">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="queryInfo.query"
            :clearable="true"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <!-- 添加用户对话框 -->
        <el-col :span="4">
          <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
          <!-- dialog 弹框区域 -->
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="addUserForm" :rules="rules">
              <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input type="password" v-model="addUserForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号" :label-width="formLabelWidth" prop="telephone">
                <el-input v-model="addUserForm.telephone" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="userList" style="width: 100%" border :stripe="true">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="telephone" label="电话"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="selected" label="状态">
          <template v-slot="slotProps">
            <el-switch v-model="slotProps.row.status"></el-switch>
            <!-- @change="getUserStatus(slotProps.row)" -->
          </template>
        </el-table-column>
        <el-table-column prop="操作" label="操作">
          <template>
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-share" size="mini"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.Pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 手机号验证规则
    var checkTelephone = (rule, val, cbfn) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[012345678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(val)) {
        return cbfn()
      }
      cbfn(new Error('请输入正确手机号'))
    }
    // 邮箱验证正则
    var checkEamil = (rule, val, cbfn) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+([.][a-zA-Z0-9_-])+/
      if (regEmail.test(val)) {
        return cbfn()
      }
      cbfn(new Error('请输入正确的邮箱'))
    }

    return {
      // 获取用户列表的参数对象
      queryInfo: {
        // 后台接口定义的参数
        query: '',
        Pagenum: 1, // 页面
        pagesize: 2// 每页显示的条数
      },
      // 启用假数据
      userList: [
        {
          id: 1,
          name: 'admin',
          email: 'admin@qq.com',
          telephone: '123456',
          role: '超级管理员',
          status: true
        }, {
          id: 2,
          name: 'lxy',
          email: 'lxy@qq.com',
          telephone: '123456',
          role: '超级管理员',
          status: false
        }, {
          id: 3,
          name: 'lr',
          email: 'lr@qq.com',
          telephone: '123456',
          role: '超级管理员',
          status: false
        }],
      dialogFormVisible: false,
      // 添加用户表单验证
      addUserForm: {
        username: '',
        password: '',
        email: '',
        telephone: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },

      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { validator: checkEamil, message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkTelephone, trigger: ['blur', 'change'] }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    // this.getUserList()
  },
  methods: {
    // 后台 API 还没有完善
    // async getUserList () {
    //   const { data: res } = await this.$http.get('users', {
    //     params: this.queryInfo
    //   })
    //   if (res.status !== 200) return this.$message.error('未知错误')
    //   this.userList = res.data
    // }
    look () {
      console.log(this.$refs)
    },
    // 监听每页显示条数的 处理函数
    handleSizeChange (newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      // this.getUserList()
    },
    // 监听页码值改变的 处理函数
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.Pagenum = newPage
      // this.getUserList()
    }
    // 监听 状态值的改变，并发送新的请求
    // async getUserStatus (val) {
    //   console.log(val)
    //   const { data: res } = await this.$http.put(`user/${val.id}/state/${val.statue}`)
    //   if (res.message.status !== 200) {
    //     // 如果数据修改失败，我们应该把当前的数据，还原
    //     val.status = !val.status
    //     return this.$message.error('未知错误')
    //   }
    //   this.$message.success('更新用户状态成功')
    // }
  }
}
</script>

<style lang="less" scoped>
</style>
