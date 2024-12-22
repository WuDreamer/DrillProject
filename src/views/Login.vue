<template>
  <div class="wrapper">
    <div
      style="
        margin: 200px auto;
        background-color: #fff;
        width: 350px;
        height: 300px;
        padding: 20px;
        border-radius: 10px;
      "
    >
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <b>登录</b>
      </div>
      <el-input
        size="medium"
        style="margin: 10px 0"
        prefix-icon="el-icon-user"
        v-model="user.username"
      ></el-input>
      <el-input
        size="medium"
        style="margin: 10px 0"
        prefix-icon="el-icon-lock"
        show-password
        v-model="user.password"
      ></el-input>
      <div style="margin: 10px 0; text-align: right">
        <el-button type="primary" size="small" autocomplete="off" @click="login"
          >登录</el-button
        >
        <el-button type="warning" size="small" autocomplete="off"
          >注册</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      this.request.post("/user/login", this.user).then((res) => {
        if (res) {
          this.$message.success("登录成功");
          // 处理登录成功的逻辑
          this.$router.push("/");
        } else {
          this.$message.error("用户名或密码错误");
        }
      });
    },
  },
};
</script>

<style>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #fc466b, #3f5efb);
  overflow: hidden;
}
</style>
