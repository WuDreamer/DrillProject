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
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input
            size="medium"
            style="margin: 10px 0"
            prefix-icon="el-icon-user"
            v-model="user.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            size="medium"
            style="margin: 10px 0"
            prefix-icon="el-icon-lock"
            show-password
            v-model="user.password"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0; text-align: right">
          <el-button
            type="primary"
            size="small"
            autocomplete="off"
            @click="login"
            >登录</el-button
          >
          <el-button
            type="warning"
            size="small"
            autocomplete="off"
            @click="$router.push('/register')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      user: {},
      rules: {
        // username和password对应el-input中的prop值
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度在2到8个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在2到20个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      // 检查用户名和密码是否为空
      // if (!this.user.username || !this.user.password) {
      //   this.$message.error("请输入用户名和密码");
      //   return;
      // }
      // // 检验输入是否正确
      // this.request
      //   .post("/user/login", this.user)
      //   .then(() => {
      //     this.$message.success("登录成功");
      //     this.$router.push("/"); // 处理登录成功的逻辑
      //   })
      //   .catch((error) => {
      //     // 如果返回401未授权，则提示用户输入错误
      //     if (error.response.status === 401) {
      //       this.$message.error(
      //         error.response.data.message || "用户名或密码错误"
      //       );
      //     } else {
      //       this.$message.error("登录请求出错，请稍后再试");
      //     }
      //   });
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.request.post("/user/login", this.user).then((res) => {
            if (res.code === "200") {
              const token = res.data.token;
              localStorage.setItem("token", token);
              localStorage.setItem("user", JSON.stringify(res.data)); // 将后端传来的用户信息存储到浏览器
              this.$router.push("/");
              this.$message.success("登录成功");
            } else {
              this.$message.error("用户名或密码错误");
            }
          });
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
