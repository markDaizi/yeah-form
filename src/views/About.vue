<template>
  <div>
  <el-form :size='"mini"'>
    <el-form-item :label='"活动名称"'>
      <el-input :value='"name"'></el-input>
    </el-form-item>
    <el-form-item :label='"活动区域"'>
      <el-input :value='"age"'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button :text='"按钮"'>按钮</el-button>
    </el-form-item>
  </el-form>
</div>

</template>

<script>
export default {
  data() {
    return {
      "name":null
,"age":null
,
    };
  },
  methods: {
  
  }
};
</script>