<template>
  <div class="layout-option">
    <el-alert title="无可配置项" type="info" :closable="false" center>
    </el-alert>

    <div class="footer-option">
      <el-button plain size="mini" @click="handleClose">关闭</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    element: {
      required: true,
    },
  },

  methods: {
    /**
     * 关闭
     */
    handleClose() {
      this.$store.commit("setCurrentId", undefined);
      this.$store.commit("setCurrentComponent", null);
    },
  },
};
</script>
<style lang="scss" scoped>
.layout-option {
  padding: 10px;
  .footer-option {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
}
</style>
