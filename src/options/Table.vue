<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="接口数据">
        <el-input
          type="textarea"
          :rows="10"
          v-model="apiJSONData"
          placeholder="接口对象"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <div class="formAction">
          <el-button type="primary" @click="onSubmit">完成</el-button>
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
        columns: [],
      },
      apiJSONData: null,
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
      this.apiJSONData = JSON.stringify(
        this.form.columns.reduce((pv, cv) => {
          pv[cv.id] = cv.label;
          return pv;
        }, {}),
        null,
        2
      );
    },
    handleUpdate() {
      this.$store.commit("updateComponent", { ...this.form });
    },
    onSubmit() {
      try {
        const newObj = JSON.parse(this.apiJSONData);

        const columns = Object.keys(newObj).map((key) => {
          return {
            id: key,
            label: newObj[key],
          };
        });
        this.form.columns = columns;
        this.$notify.success("保存成功");
      } catch (error) {
        this.$message.error(error.message);
      }
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
