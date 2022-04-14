<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="栅格间隔">
        <el-input-number
          v-model="form.gutter"
          :min="0"
          placeholder="栅格间隔"
          controls-position="right"
        ></el-input-number>
        px
      </el-form-item>
      <el-form-item label="布局模式">
        <el-select v-model="form.type" placeholder="布局模式">
          <el-option label="DEFAULT" :value="undefined"> </el-option>
          <el-option label="FLEX" value="flex"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="水平排列" v-if="form.type === 'flex'">
        <el-select v-model="form.justify" placeholder="水平排列布局模式">
          <el-option label="start" value="start"> </el-option>
          <el-option label="end" value="end"> </el-option>
          <el-option label="center" value="center"> </el-option>
          <el-option label="space-around" value="space-around"> </el-option>
          <el-option label="space-between" value="space-between"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="垂直排列" v-if="form.type === 'flex'">
        <el-select v-model="form.align" placeholder="垂直排列布局模式">
          <el-option label="top" value="top"> </el-option>
          <el-option label="middle" value="middle"> </el-option>
          <el-option label="bottom" value="bottom"> </el-option>
        </el-select>
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
        gutter: this.props ? this.props.gutter : 0,
        type: this.props ? this.props.type : undefined,
        justify: this.props ? this.props.justify : undefined,
        align: this.props ? this.props.align : undefined,
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

      this.form.gutter = this.props ? this.props.gutter : 0;
      this.form.type = this.props ? this.props.type : undefined;
      this.form.justify = this.props ? this.props.justify : undefined;
      this.form.align = this.props ? this.props.align : undefined;
    },
    "form.type"() {
      // 将参数添加进去
      if (newVal !== oldVal) {
        if (newVal === "flex") {
          this.form.justify = "start";
          this.form.align = "top";
        } else {
          this.form.justify = undefined;
          this.form.align = undefined;
        }
      }
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
