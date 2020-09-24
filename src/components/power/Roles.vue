<template>
  <div>
    <!-- Breadcrumb 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row type="flex" justify>
        <el-col :span="4">
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="rolesList" style="width: 100%" border stripe>
        <!-- 展开列表区域 -->
        <el-table-column type="expand">
          <template v-slot="{row}">
            <!-- v-for 渲染出一级权限 -->
            <el-row
              v-for="(item1,index1) in row.children"
              :key="item1.id"
              :class="['bdBottom',index1 === 0?'bdTop':'','vcenter']"
            >
              <!-- 第一列显示一级权限 -->
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <!-- 小图标 -->
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 第二列显示二、三级权限 -->
              <el-col :span="19">
                <!-- v-for 渲染出二级权限 -->
                <el-row
                  class="vcenter"
                  v-for="(item2,index2) in item1.children"
                  :key="item2.id"
                  :class="[index2===0?'':'bdTop','vcenter']"
                >
                  <el-col :span="6">
                    <el-tag type="success">{{item2.authName}}</el-tag>
                    <!-- 小图标 -->
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <!-- v-for 渲染出三级权限 -->
                    <el-tag
                      closable
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                      @close="removeRightsById(row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <!-- 这个作用域插槽为了获取当前这行的数据 -->
          <template v-slot="{row}">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showRetRightDialogVisible(row)"
            >分配权限</el-button>
            <!-- {{row.children}} -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed"
    >
      <el-tree
        ref="rightsTree"
        :data="rightsList"
        :props="treeProps"
        node-key="id"
        show-checkbox
        default-expand-all
        :default-checked-keys="defKeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 数据结构说明
      // 第一层为角色信息
      // 第二层为权限说明，权限一共有3层
      // 最后一层权限，不包含 children 属性
      rolesList: [
        {
          id: 0,
          roleName: '主管',
          roleDesc: '技术负责人',
          children: [
            {
              id: 10,
              authName: '商品管理',
              path: 'null',
              children: [
                {
                  id: 161,
                  authName: '商品列表',
                  path: 'null',
                  children: [
                    {
                      id: 102,
                      authName: '添加商品',
                      path: 'null'
                    },
                    {
                      id: 103,
                      authName: '修改商品',
                      path: 'null'
                    }
                  ]
                },
                {
                  id: 151,
                  authName: '分类参数',
                  path: 'null',
                  children: [
                    {
                      id: 105,
                      authName: '获取参数列表',
                      path: 'null'
                    },
                    {
                      id: 106,
                      authName: '创建商品参数',
                      path: 'null'
                    }
                  ]
                }
              ]
            },
            {
              id: 11,
              authName: '权限管理',
              path: 'null',
              children: [
                {
                  id: 171,
                  authName: '角色列表',
                  path: 'null',
                  children: [
                    {
                      id: 202,
                      authName: '添加角色',
                      path: 'null'
                    }
                  ]
                },
                {
                  id: 101,
                  authName: '权限列表',
                  path: 'null',
                  children: [
                    {
                      id: 505,
                      authName: '查看授权',
                      path: 'null'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 1,
          roleName: '测试角色',
          roleDesc: '技术负责人',
          children: [
            {
              id: 10,
              authName: '商品管理',
              path: 'null',
              children: [{
                id: 161,
                authName: '商品列表',
                path: 'null',
                children: [
                  {
                    id: 102,
                    authName: '添加商品',
                    path: 'null'
                  }
                ]
              }]
            }
          ]
        },
        {
          id: 2,
          roleName: '主管',
          roleDesc: '技术负责人',
          children: [
            {
              id: 11,
              authName: '权限管理',
              path: 'null',
              children: [
                {
                  id: 171,
                  authName: '角色列表',
                  path: 'null',
                  children: [
                    {
                      id: 202,
                      authName: '添加角色',
                      path: 'null'
                    },
                    {
                      id: 303,
                      authName: '删除角色',
                      path: 'null'
                    },
                    {
                      id: 404,
                      authName: '角色授权',
                      path: 'null'
                    }

                  ]
                },
                {
                  id: 101,
                  authName: '权限列表',
                  path: 'null',
                  children: [
                    {
                      id: 505,
                      authName: '查看授权',
                      path: 'null'
                    }
                  ]
                }

              ]
            }
          ]
        },
        {
          id: 3,
          roleName: '主管',
          roleDesc: '技术负责人',
          children: [
            {
              id: 11,
              authName: '商品管理',
              path: 'null',
              children: [{
                id: 111,
                authName: '商品列表',
                path: 'null',
                children: [
                  {
                    id: 112,
                    authName: '添加商品',
                    path: 'null'
                  }
                ]
              }]
            }
          ]
        },
        {
          id: 4,
          roleName: '主管',
          roleDesc: '技术负责人',
          children: [
            {
              id: 11,
              authName: '商品管理',
              path: 'null',
              children: [{
                id: 111,
                authName: '商品列表',
                path: 'null',
                children: [
                  {
                    id: 112,
                    authName: '添加商品',
                    path: 'null'
                  }
                ]
              }]
            }
          ]
        }
      ],
      // 所有角色列表数据
      setRightDialogVisible: false,
      // 所有权限的数据
      rightsList: [
        {
          id: 0,
          authName: '一级权限',
          children: [
            {
              id: 10,
              authName: '商品管理',
              path: 'null',
              children: [
                {
                  id: 161,
                  authName: '商品列表',
                  path: 'null',
                  children: [
                    {
                      id: 102,
                      authName: '添加商品',
                      path: 'null'
                    },
                    {
                      id: 103,
                      authName: '修改商品',
                      path: 'null'
                    },
                    {
                      id: 104,
                      authName: '添加商品',
                      path: 'null'
                    }
                  ]
                },
                {
                  id: 151,
                  authName: '分类参数',
                  path: 'null',
                  children: [
                    {
                      id: 105,
                      authName: '获取参数列表',
                      path: 'null'
                    },
                    {
                      id: 106,
                      authName: '创建商品参数',
                      path: 'null'
                    },
                    {
                      id: 107,
                      authName: '删除商品参数',
                      path: 'null'
                    }
                  ]
                }
              ]
            },
            {
              id: 11,
              authName: '权限管理',
              path: 'null',
              children: [
                {
                  id: 171,
                  authName: '角色列表',
                  path: 'null',
                  children: [
                    {
                      id: 202,
                      authName: '添加角色',
                      path: 'null'
                    },
                    {
                      id: 303,
                      authName: '删除角色',
                      path: 'null'
                    },
                    {
                      id: 404,
                      authName: '角色授权',
                      path: 'null'
                    }
                  ]
                },
                {
                  id: 101,
                  authName: '权限列表',
                  path: 'null',
                  children: [
                    {
                      id: 505,
                      authName: '查看授权',
                      path: 'null'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 1,
          authName: '一级权限',
          children: [
            {
              id: 11,
              authName: '商品管理',
              path: 'null',
              children: [{
                id: 111,
                authName: '商品列表',
                path: 'null',
                children: [
                  {
                    id: 112,
                    authName: '添加商品',
                    path: 'null'
                  }
                ]
              }]
            }
          ]
        },
        {
          id: 2,
          authName: '一级权限',
          children: [
            {
              id: 12,
              authName: '订单管理',
              path: 'null',
              children: [{
                id: 121,
                authName: '订单列表',
                path: 'null',
                children: [
                  {
                    id: 122,
                    authName: '添加订单',
                    path: 'null'
                  }
                ]
              }]
            }
          ]
        },
        {
          id: 3,
          authName: '一级权限',
          children: [
            {
              id: 13,
              authName: '数据统计',
              path: 'null',
              children: [{
                id: 131,
                authName: '表格数据',
                path: 'null',
                children: [
                  {
                    id: 132,
                    authName: '扇形数据',
                    path: 'null'
                  }
                ]
              }]
            }
          ]
        },
        {
          id: 4,
          authName: '一级权限',
          children: [
            {
              id: 14,
              authName: '库存管理',
              path: 'null',
              children: [{
                id: 141,
                authName: '库存列表',
                path: 'null',
                children: [
                  {
                    id: 142,
                    authName: '管理库存',
                    path: 'null'
                  }
                ]
              }]
            }
          ]
        }

      ],
      // 树形框数据绑定字段的对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中节点的 id 值
      defKeys: []
    }
  },
  methods: {
    // 获取所有校色的列表
    // async getRolesList () {
    // const { data: res } = await this.$http.get('roles')
    // if (res.status === 200) {
    // this.rolesList = res.data
    // }
    // this.$message.error('未知错误')
    // }
    async removeRightsById (role, rightId) {
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消了删除')
      }
      // // 删除成功，则发送删除的请求
      // const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`
      // )
      // if (res.status !== 200) {
      //   return this.$message.error('删除失败')
      // }
      // this.$message.success('删除成功')
      // // 当前行的数据重新赋值为删除后的数据
      // role.children = res.data
    },
    // 显示分配权限对话框，并把所有权限的数据渲染上去
    /* async */ showRetRightDialogVisible (row) {
      /* const { data: res } = await this.$http.get('rights/tree')
      if (res.status !== 200) return this.$message.error('未知错误')
      this.rightsList = res.data */
      // 点击分配权限按钮立即调用
      this.$nextTick(() => {
        // console.log('DOM渲染之前：' + this.$refs.rightsTree.getCheckedKeys())
      })
      this.getLeafKeys(row, this.defKeys)
      this.$nextTick(() => {
        // this.$refs.rightsTree.setCheckedKeys(this.defKeys)
        // console.log('DOM渲染之后：' + this.$refs.rightsTree.getCheckedKeys())
        this.setRightDialogVisible = true
      })
    },

    // 点击分配权限按钮的时候调用这个函数
    // 通过递归的形式，获取角色下三级权限的id，并保存到 defKeys数组中
    getLeafKeys (node, arr) {
      // console.log(node.children)
      // 判断当前节点是否包含 children属性，如果不包含则是三级权限
      if (!node.children) {
        return arr.push(node.id)
      }
      // 没有找到,则继续在内部寻找
      node.children.forEach(item => this.getLeafKeys(item, arr))
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed () {
      this.defKeys = []
    }
  },
  created () {
    // this.getRolesList()

  },
  watch: {
    defKeys: function (newVal, OldVal) {
      console.log('新' + newVal)
      console.log('旧' + OldVal)
      if (newVal === OldVal) {
        this.$refs.rightsTree.setCheckedKeys(newVal)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 10px;
}
.bdTop {
  border-top: 1px solid #eeeeee;
}
.bdBottom {
  border-bottom: 1px solid #eeeeee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
