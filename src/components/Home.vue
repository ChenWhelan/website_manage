<template>
  <el-container>
    <el-header>校园网站新闻管理</el-header>
    <el-container>
      <el-aside width="200px">
        <el-row class="rac">
          <el-col :span="50">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <router-link
                active-class="active"
                to="/Home/Index"
                style="color: white; text-decoration: none"
              >
                <el-menu-item index="1">
                  <i class="el-icon-s-home"></i>
                  <span slot="title"> 首页 </span>
                </el-menu-item>
              </router-link>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-s-custom"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <router-link
                    active-class="active"
                    to="/Home/categoryList"
                    style="color: white; text-decoration: none"
                  >
                    <el-menu-item index="2-1">
                      <i class="el-icon-user"></i>

                      用户列表
                    </el-menu-item>
                  </router-link>
                  <router-link
                    active-class="active"
                    to="/Home/UserAdd"
                    style="color: white; text-decoration: none"
                  >
                    <el-menu-item index="2-2">
                      <i class="el-icon-user-solid"></i>

                      新增用户
                    </el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-reading"></i>
                  <span>新闻管理</span>
                </template>
                <el-menu-item-group>
                  <router-link
                    active-class="active"
                    to="/Home/NewsItem"
                    style="color: white; text-decoration: none"
                  >
                    <el-menu-item index="3-1">
                      <i class="el-icon-tickets"></i>

                      新闻列表
                    </el-menu-item>
                  </router-link>
                  <router-link
                    active-class="active"
                    to="/Home/NewsAdd"
                    style="color: white; text-decoration: none"
                  >
                    <el-menu-item index="3-2">
                      <i class="el-icon-edit"></i>

                      新增新闻
                    </el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>
              <router-link
                active-class="active"
                to="/Home/MyInfo"
                style="color: white; text-decoration: none"
              >
                <el-menu-item index="4">
                  <i class="el-icon-postcard"></i>
                  <span slot="title"> 我的 </span>
                </el-menu-item>
              </router-link>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "AboutSubject",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less">
.el-header,
.el-footer {
  background-color: #31363b;
  color: #ffd04b;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: left;
  line-height: 720px;
  height: 720px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: left;
  line-height: 50px;
  height: 720px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-menu {
  width: 200px;
}
.el-menu-item-group {
  margin-left: 10px;
}
</style>
