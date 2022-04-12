<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="尺寸">
        <el-select v-model="form.size">
          <el-option label="默认" value=""> </el-option>
          <el-option label="中等" value="medium"> </el-option>
          <el-option label="小" value="small"> </el-option>
          <el-option label="迷你" value="mini"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="表单域标签的位置">
        <el-select v-model="form.labelPosition">
          <el-option label="默认" value=""> </el-option>
          <el-option label="右" value="right"> </el-option>
          <el-option label="左" value="left"> </el-option>
          <el-option label="上" value="top"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="行内表单模式">
        <el-switch v-model="form.inline"> </el-switch>
      </el-form-item>

      <el-form-item label="表单域标签的宽度">
        <el-input
          v-model="form.labelWidth"
          placeholder="请输入，如50px"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <div class="formAction">
          <el-button @click="handleClose">取消</el-button>
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
        size: "",
        inline: false,
        labelWidth: "",
        labelPosition: "",
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
     * 取消
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
