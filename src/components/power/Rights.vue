<template>
  <div>
    <!-- Breadcrumb 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 表格区域 -->
      <el-table :data="rightsList" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot="{ row }">
            <el-tag type="success" v-if="row.level ===0 " effect="dark">一级权限</el-tag>
            <el-tag type="info" v-else-if="row.level ===1" effect="dark">二级权限</el-tag>
            <el-tag type="warning" v-else-if="row.level ===2" effect="dark">三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsList: [
        {
          authName: '商品管理0',
          id: 0,
          level: 0,
          path: 'goods',
          pid: ''
        },
        {
          authName: '商品管理1',
          id: 1,
          level: 1,
          path: 'rights',
          pid: ''
        },
        {
          authName: '商品管理2',
          id: 2,
          level: 2,
          path: 'user',
          pid: ''
        },
        {
          authName: '商品管理3',
          id: 3,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理4',
          id: 4,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理5',
          id: 5,
          level: 2,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理6',
          id: 6,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理7',
          id: 7,
          level: 0,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理8',
          id: 8,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理9',
          id: 9,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理10',
          id: 10,
          level: 2,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理11',
          id: 11,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理12',
          id: 12,
          level: 0,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理13',
          id: 13,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理14',
          id: 14,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理15',
          id: 15,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理16',
          id: 16,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理17',
          id: 17,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理18',
          id: 18,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理19',
          id: 19,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理20',
          id: 20,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理21',
          id: 21,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理22',
          id: 22,
          level: 1,
          path: 'null',
          pid: ''
        },
        {
          authName: '商品管理23',
          id: 23,
          level: 1,
          path: 'null',
          pid: ''
        }
      ]
    }
  },
  methods: {
    // 获取权限列表的请求,先安排个假数据
    // async getRigthsList () {
    //   const { data: res } = await this.$http.get('rights/list')
    //   if (res.state === 200) {
    //     this.rightsList = res.data
    //   }
    //   this.$message.error('未知错误')
    // }
  },
  created () {
    // this.getRigthsList()
  }
}
</script>

<style lang="less" scoped>
</style>
