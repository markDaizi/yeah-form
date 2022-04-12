<template>
  <div class="aside-container">
    <div class="aside-handle">
      <el-scrollbar class="aside-scrollbar">
        <el-collapse>
          <el-collapse-item
            :title="item.label"
            :name="item.label"
            v-for="item in elements"
            :key="item.label"
          >
            <div class="low-component-item">
              <drag-container v-bind="item" />
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import DragContainer from "@/components/editor/drag-container.vue";
import _ from "lodash";
import componentList from "@/base-components/component-list";

export default {
  components: { DragContainer },
  provide() {
    return {
      draggableOptions: {
        clone: true,
        group: {
          name: "container",
          pull: "clone",
          put: false,
          disabled: true,
        },
      },
    };
  },
  computed: {
    currentId: {
      get() {
        return this.$store.state.currentId;
      },
    },
    current: {
      get() {
        return this.$store.state.current;
      },
    },
  },
  data() {
    return {
      type: "",
      elements: componentList,
    };
  },
};
</script>

<style lang="scss" scoped>
.drag-pull-area {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.el-tag {
  margin: 0 6px 6px 0;
}
</style>
