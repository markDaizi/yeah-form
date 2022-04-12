<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      size="mini"
      label-position="top"
    >
      <el-row :gutter="2" v-for="(item, index) in form.options" :key="index">
        <el-col :span="9" :offset="0">
          <el-form-item label="标签">
            <el-input v-model="item.label"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="值">
            <el-input v-model="item.value"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="0">
          <el-form-item label=" 操作 ">
            <el-button
              type="text"
              size="medium"
              @click="form.options.splice(index, 1)"
              icon="el-icon-remove-outline"
            ></el-button>
            <el-button
              type="text"
              size="medium"
              icon="el-icon-circle-plus-outline"
              v-if="index + 1 == form.options.length"
              @click="
                form.options.push({
                  label: '备选项' + String(form.options.length * index),
                  value: String(form.options.length * index),
                })
              "
            ></el-button>
          </el-form-item>
        </el-col>
      </el-row>

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

  data() {
    return {
      rules: {},
      form: {
        options: [],
      },
      defaultForm: null,
      timer: 0,
    };
  },

  created() {
    this.defaultForm = Object.assign({}, this.form);
    this.handleUpdateData();
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
  computed: {
    props() {
      return this.element ? this.element.props : null;
    },
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
