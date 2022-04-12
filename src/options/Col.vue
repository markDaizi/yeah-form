<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="栅格占据的列数">
        <el-input-number
          v-model="form.span"
          :min="0"
          placeholder="栅格占据的列数"
          controls-position="right"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="栅格左侧的间隔格数">
        <el-input-number
          v-model="form.offset"
          :min="0"
          placeholder="栅格左侧的间隔格数"
          controls-position="right"
        ></el-input-number>
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
        span: this.props ? this.props.span || 0 : 0,
        offset: this.props ? this.props.offset || 0 : 0,
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
      this.form.span = this.props ? this.props.span || 0 : 0;
      this.form.offset = this.props ? this.props.offset || 0 : 0;
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
