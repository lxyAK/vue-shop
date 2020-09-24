<template>
  <el-container class="home_container">
    <!-- 头部区域 start -->
    <el-header class="home_header">
      <div class="home_header_left">
        <img src="../assets/homelogo.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" round @click="logOut">退出</el-button>
    </el-header>
    <!-- 头部区域 end -->

    <el-container>
      <!-- 侧边栏区域 start-->
      <el-aside :width="isCollapse?'64px':'200px'" class="home_aside">
        <!-- 侧边栏菜单 start-->
        <!-- 侧边栏折叠开关 -->
        <div class="toggle-btn" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 start-->
          <el-submenu :index="String(item.id)" v-for="item in menuList" :key="item.id">
            <!-- 菜单模板区域 -->
            <template slot="title">
              <!-- 菜单图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span style="font-size : 20px">{{item.authName}}</span>
            </template>
            <!-- 二级菜单 start-->
            <el-menu-item
              :index="'/'+subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
              @click="saveNavStatus('/'+subitem.path)"
            >
              <!-- 菜单模板区域 -->
              <template slot="title">
                <!-- 菜单图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span style="font-size : 20px">{{subitem.authName}}</span>
              </template>
            </el-menu-item>
            <!-- 二级菜单 end-->
          </el-submenu>
          <!-- 一级菜单 end-->
        </el-menu>
        <!-- 侧边栏菜单 end-->
      </el-aside>
      <!-- 侧边栏区域 end-->

      <!-- 主题区域 start-->
      <el-main class="home_main">
        <router-view></router-view>
      </el-main>
      <!-- 主题区域 end-->
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 由于后台 api 还没有完善，先填写假数据
      menuList: [
        {
          authName: '用户管理',
          children: [
            {
              authName: '用户列表',
              id: 141,
              path: 'users'
            }
          ],
          id: 125,
          order: 1

        },
        {
          authName: '商品管理',
          children: [
            {
              authName: '商品列表',
              id: 143,
              path: 'goodslist'
            },
            {
              authName: '分类参数',
              id: 144,
              path: 'fenleicanshu'
            },
            {
              authName: '商品分类',
              id: 145,
              path: 'goodsclass'
            }
          ],
          id: 129,
          order: 1

        },
        {
          authName: '权限管理',
          children: [
            {
              authName: '角色列表',
              id: 146,
              path: 'roles'
            },
            {
              authName: '权限列表',
              id: 147,
              path: 'rights'
            }
          ],
          id: 126,
          order: 1
        },
        {
          authName: '订单管理',
          children: [
            {
              authName: '商品列表',
              id: 148
            },
            {
              authName: '商品列表',
              id: 149
            }

          ],
          id: 127,
          order: 1,
          path: 'list'
        },
        {
          authName: '数据统计',
          children: [
            {
              authName: '商品列表',
              id: 150
            },
            {
              authName: '商品列表',
              id: 151
            }
          ],
          id: 128,
          order: 1,
          path: 'data'
        }

      ],
      // 用于存放字体图标的对象
      iconsObj: {
        125: 'iconfont icon-Customermanagement-fill',
        129: 'iconfont icon-product',
        126: 'iconfont icon-integral-fill',
        127: 'iconfont icon-suggest',
        128: 'iconfont icon-data'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    // this.getMenuList()
    this.getActivePath()
  },
  methods: {
    logOut () {
      // 清楚登录时的 token
      sessionStorage.clear()
      // 页面跳转到 登录页面
      this.$router.push('/login')
    },
    // async getMenuList () {
    //   const { data: res } = await this.$http.get('/menu')
    //   if (!res.status === 200) return this.$message.error('未知错误')
    //   this.menuList = res.data
    // }
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    saveNavStatus (activePath) {
      sessionStorage.setItem('activePath', activePath)
    },
    getActivePath () {
      this.activePath = sessionStorage.getItem('activePath')
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.home_header {
  background-color: #333747;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .home_header_left {
    height: 100%;
    color: #ffffff;
    display: flex;
    align-items: center;
    img {
      height: 100%;
    }
    span {
      font-size: 20px;
      margin-left: 15px;
    }
  }
}
.home_aside {
  background-color: #545c64;
  .toggle-btn {
    width: 100%;
    background-color: #4a5064;
    text-align: center;
    font-size: 15px;
    line-height: 30px;
    letter-spacing: 0.2em;
    cursor: pointer;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .el-menu {
    border: 0;
  }
}
.home_main {
  background-color: #e9eef3;
}
.iconfont {
  font-size: 30px;
  padding-right: 10px;
}
</style>
