<template>
  <el-card style="width: 500px">
    <el-form label-width="80px" size="small">
      <el-form-item label="用户名">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "PersonPage",
  data() {
    return {
      form: {},
      // 将获取的user对象通过JSON.parse方式转化为json对象，如果没有则转为空
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {},
    };
  },
  created() {
    // 法1：根据用户ID返回用户信息
    this.request.get("/user/" + this.user.id).then((res) => {
      if (res) {
        this.form = res.data;
      }
    });
    // 法2：根据用户名返回用户信息
    // this.request.get("/user/username/" + this.user.username).then((res) => {
    //   if (res) {
    //     this.form = res.data;
    //   }
    // });
  },
  methods: {
    save() {
      this.request.post("/user", this.form).then((res) => {
        if (res) {
          this.$message.success("保存成功");
        } else {
          this.$message.error("保存失败");
        }
      });
    },
  },
};
</script>
