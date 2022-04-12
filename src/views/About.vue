<template>
  <div>
    <el-form
      :size="'mini'"
      :inline="true"
      :labelWidth="'120px'"
      :labelPosition="'left'"
    >
      <el-form-item :label="'活动名称'">
        <el-input></el-input>
      </el-form-item>
      <el-form-item :label="'活动区域'">
        <el-input></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :text="'按钮'">按钮</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :columns="[
        { id: 'id', label: '编号' },
        { id: 'name', label: '名称' },
      ]"
    >
      <el-table-column :prop="id" :key="id" :label="编号" :width="undefined">
      </el-table-column
      ><el-table-column
        :prop="name"
        :key="name"
        :label="名称"
        :width="undefined"
      >
      </el-table-column>
      <el-table-column label="操作">
        <el-button :type="'text'" :size="'mini'" :text="'查看'">查看</el-button>
        <el-button :size="'mini'" :type="'text'" :text="'按钮名称'"
          >按钮名称</el-button
        >
      </el-table-column>
    </el-table>
  </div>
</template>
