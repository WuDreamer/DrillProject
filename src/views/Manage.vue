<template>
  <el-container style="min-height: 100vh">
    <!-- 侧边框 -->
    <el-aside
      :width="sideWidth + 'px'"
      style="
        background-color: rgb(238, 241, 246);
        box-shadow: 2px 0 6px rgb(0, 21, 41);
      "
    >
      <!-- 引入侧边栏内容页面 -->
      <AsidePage :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
    </el-aside>

    <el-container>
      <!-- 页面头部 -->
      <el-header style="border-bottom: 1px solid #ccc">
        <HeaderPage :collapseBtnClass="collapseBtnClass" :collapse="collapse" />
      </el-header>

      <!-- 显示主体页面 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsidePage from "@/components/Aside.vue";
import HeaderPage from "@/components/Header.vue";
export default {
  name: "HomePage",
  components: {
    AsidePage,
    HeaderPage,
  },
  data() {
    return {
      collapseBtnClass: "el-icon-s-fold",
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
    };
  },
  methods: {
    // 侧边栏点击收缩方法
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        // 收缩
        this.sideWidth = 64;
        this.collapseBtnClass = "el-icon-s-unfold";
        this.logoTextShow = false;
      } else {
        //展开
        this.sideWidth = 200;
        this.collapseBtnClass = "el-icon-s-fold";
        this.logoTextShow = true;
      }
    },
  },
};
</script>
