<template>
  <div style="line-height: 60px; display: flex">
    <div style="flex: 1; font-size: 20px">
      <span
        :class="collapseBtnClass"
        style="cursor: pointer; font-size: 18px"
        @click="collapse"
      ></span>
      <!-- 页签 -->

      <el-breadcrumb
        separator="/"
        style="display: inline-block; margin-left: 10px"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.$route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown style="width: 50px; cursor: pointer">
      <span>张三</span
      ><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>
          <router-link to="/login" style="text-decoration: none"
            >退出登录</router-link
          >
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "HeaderPage",
  props: {
    collapseBtnClass: String,
    collapse: Boolean,
  },

  data() {
    return {};
  },
  methods: {},
};
</script>
