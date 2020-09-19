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
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="look">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="userList" style="width: 100%" border :stripe="true">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="telephone" label="电话"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="selected" label="状态" ref="status">
          <template v-slot="slotProps">
            {{slotProps.row}}
          </template>
        </el-table-column>
        <el-table-column prop="操作" label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
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
          status: true
        }, {
          id: 3,
          name: 'lr',
          email: 'lr@qq.com',
          telephone: '123456',
          role: '超级管理员',
          status: true
        }]
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
    }
  }
}
</script>

<style lang="less" scoped>
</style>
