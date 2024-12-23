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

    <!-- 头部右侧个人信息 -->
    <el-dropdown style="width: 100px; cursor: pointer">
      <div style="display: inline-block">
        <img
          :src="user.avatarUrl"
          alt=""
          class="avatar_img"
          referrerpolicy="no-referrer"
        />
        <span>{{ user.nickname }}</span
        ><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>
          <span style="text-decoration: none" @click="logout">退出</span>
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
  },

  data() {
    return {
      // 将获取的user对象通过JSON.parse方式转化为json对象，如果没有则转为空
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {},
    };
  },
  methods: {
    // 折叠方法
    collapse() {
      this.$emit("asideCollapse");
    },
    // 退出方法
    logout() {
      this.$router.push("/login");
      localStorage.removeItem("user"); // 清除浏览器保存的用户信息
      this.$message.success("退出成功");
    },
  },
};
</script>

<style>
.avatar_img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  top: 10px;
  right: 5px;
}
</style>
