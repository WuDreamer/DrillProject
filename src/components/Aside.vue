<template>
  <el-menu
    :default-openeds="['0', 1]"
    style="min-height: 100%; overflow-x: hidden"
    background-color="rgb(48,65,86)"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse-transition="false"
    :collapse="isCollapse"
    router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img
        src="../assets/logo.png"
        alt=""
        style="width: 20px; position: relative; top: 6px; margin-right: 5px"
      />
      <b v-show="logoTextShow" style="color: white">后台管理系统</b>
    </div>
    <el-menu-item index="/">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span slot="title">主页</span>
      </template>
    </el-menu-item>
    <!-- 基本信息 -->
    <el-submenu index="0">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item index="/admin">
        <i class="el-icon-user"></i>用户管理</el-menu-item
      >
    </el-submenu>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-tickets"></i>
        <span slot="title">内容管理</span>
      </template>
      <el-menu-item index="/article">
        <i class="el-icon-reading"></i>文章管理</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "AsidePage",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean,
  },
};
</script>
