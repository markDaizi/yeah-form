<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="文本">
        <el-input v-model="form.text" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="颜色">
        <el-color-picker v-model="form.color"></el-color-picker>
      </el-form-item>

      <el-form-item label="大小">
        <el-input
          v-model="form.fontSize"
          placeholder="请输入,如 16px"
        ></el-input>
      </el-form-item>

      <el-form-item label="行高">
        <el-input
          v-model="form.lineHeight"
          placeholder="请输入,如 16px"
        ></el-input>
      </el-form-item>

      <el-form-item label="居中">
        <el-switch v-model="form.center"></el-switch>
      </el-form-item>

      <el-form-item label="块">
        <el-switch v-model="form.block"></el-switch>
      </el-form-item>

      <el-form-item label="粗体">
        <el-switch v-model="form.bold"></el-switch>
      </el-form-item>

      <el-form-item>
        <div class="formAction">
          <el-button @click="handleClose">关闭</el-button>
        </div>
      </el-form-item>

      <el-form-item>
        <div class="formAction">
          <el-button type="danger" @click="handleRemove">删除</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    element: {
      required: true,
    },
  },
  computed: {
    props() {
      return this.element ? this.element.props : null;
    },
  },
  data() {
    return {
      rules: {},
      form: {
        text: "",
        fontSize: "",
        color: "",
        center: false,
        block: false,
        bold: false,
        lineHeight: "1",
      },
      defaultForm: null,
      timer: 0,
    };
  },

  created() {
    this.defaultForm = Object.assign({}, this.form);
    this.handleUpdateData();
  },
  methods: {
    handleUpdateData() {
      const props = this.props;

      Object.keys(this.form).forEach((key) => {
        const val = props ? props[key] : this.defaultForm[key];
        this.$set(this.form, key, val);
      });
    },
    handleUpdate() {
      this.$store.commit("updateComponent", { ...this.form });
    },

    /**
     * 关闭
     */
    handleClose() {
      this.$store.commit("setCurrentId", undefined);
      this.$store.commit("setCurrentComponent", null);
    },

    handleRemove() {
      this.$store.commit("removeComponent");
      this.$store.commit("setCurrentId", undefined);
      this.$store.commit("setCurrentComponent", null);
    },
  },
  watch: {
    props(newVal, oldVal) {
      if (newVal === oldVal) return;
      this.handleUpdateData();
    },
    form: {
      handler(newVal, oldVal) {
        // 将参数添加进去
        this.handleUpdate();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.row-option {
  padding: 10px;
  .formAction {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
