<template>
  <div>
    <!-- 主体头部 -->
    <div class="md-10">
      <el-input
        style="width: 250px"
        suffix-icon="el-icon-search"
        placeholder="请输入名称"
        v-model="username"
      ></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
    </div>
    <!-- 开头按钮操作 -->
    <div class="md-10">
      <el-button type="primary" @click="handleAdd"
        >新增 <i class="el-icon-circle-plus-outline"></i
      ></el-button>
      <el-button type="danger"
        >批量删除 <i class="el-icon-remove-outline"></i
      ></el-button>
      <el-upload
        action="http://localhost:8090/user/import"
        style="display: inline-block"
        :show-file-list="false"
        accept="xlsx"
        :on-success="handleExcelImportSuccess"
        :on-error="handleExcelImportError"
      >
        <el-button type="primary" class="ml-5"
          >导入 <i class="el-icon-bottom"></i
        ></el-button>
      </el-upload>

      <el-button type="primary" @click="exp" class="ml-5"
        >导出 <i class="el-icon-top"></i
      ></el-button>
    </div>
    <!-- 主体内容 -->
    <el-table :data="tableData" border stripe header-cell-class-name="headerBg"
      ><el-table-column type="selection" width="50px"> </el-table-column>
      <el-table-column prop="id" label="ID" width="50px"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="80px">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="80px">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)"
            >编辑 <i class="el-icon-edit"></i
          ></el-button>
          <el-popconfirm
            class="ml-5"
            confirm-button-text="确定"
            cancel-button-text="我再想想"
            icon="el-icon-info"
            icon-color="red"
            title="您确定删除吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <el-button type="danger" slot="reference"
              >删除 <i class="el-icon-remove-outline"></i
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <div style="padding: 10px 0">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total,sizes,prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AdminPage",
  props: {
    collapseBtnClass: String,
    collapse: Boolean,
  },
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      size: 5,
      username: "", // 按用户名搜索
      dialogFormVisible: false,
      multipleSelection: [],
      form: {},
    };
  },
  created() {
    // 调用请求方法
    this.load();
  },
  methods: {
    load() {
      // 封装成方法，便于调用
      this.request
        .get("/user/page", {
          params: {
            page: this.page,
            size: this.size,
          },
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data; // 请求后端的用户数据，后端使用data
          this.total = res.userTotal; // 请求后端的用户总数，后端使用userTotal
        });
    },
    // 重置方法
    reset() {
      this.username = "";
      this.load();
    },
    // 点击新增打开弹窗方法
    handleAdd() {
      this.dialogFormVisible = true;
      this.form = {}; // 打开弹窗默认内容置空
    },
    // 点击确定新增用户信息
    save() {
      this.request.post("/user", this.form).then((res) => {
        // 判断是否成功
        if (res) {
          // 检查状态
          this.$message.success("保存成功");
          this.dialogFormVisible = false; // 关闭弹窗
          this.load(); // 刷新用户列表
        } else {
          this.$message.error("保存失败");
        }
      });
    },

    // 编辑用户
    handleEdit(row) {
      this.form = row; // 传入原有的数据
      this.dialogFormVisible = true;
    },
    // 删除用户
    handleDelete(id) {
      this.request.delete("/user/" + id).then((res) => {
        // 判断是否成功
        if (res) {
          // 检查状态
          this.$message.success("删除成功");
          this.load(); // 刷新用户列表
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // 批量删除
    handleSelectionChange(val) {
      console.log(val);
    },
    handleSizeChange(size) {
      this.size = size;
      this.load(); // 切换页码需重新请求后端
    },
    handleCurrentChange(page) {
      this.page = page;
      this.load(); // 切换页数需重新请求后端
    },
    // 导出数据
    exp() {
      window.open("http://localhost:8090/user/export");
    },
    // 导入数据成功提示并刷新
    handleExcelImportSuccess() {
      this.$message.success("导入成功");
      this.load();
    },
    handleExcelImportError() {
      this.$message.error("导入失败");
    },
  },
};
</script>
<style>
.headerBg {
  background: #eee !important;
}
</style>
