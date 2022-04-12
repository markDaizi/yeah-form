<template>
  <draggable
    :list="childrenData"
    :group="group"
    :class="dragClassName"
    :move="checkMove"
    :clone="handleClone"
    :disabled="disabled"
    :sort="sort"
    :data-tag="element"
    :data-name="name"
    :data-path="currentPath"
    @change="emitter"
  >
    <component
      v-for="item in childrenData"
      :key="item.id"
      v-bind="item.props"
      :actions="item.actions"
      :is="'base-' + item.element"
      :data-tag="item.element"
      :props="item.props"
      :models="item.models"
      :class="{ active: current === item.id }"
      @click.native.stop.prevent="handleClickItem(item)"
    >
      <drag-container
        v-bind="item"
        :path="currentPath"
        :show="show"
        @input="emitter"
      />
      <i
        class="el-icon-delete"
        @click.stop="handleDelete"
        v-if="current === item.id && !draggableOptions.clone && !show"
      ></i>
    </component>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import mixins from "@/mixins";

export default {
  mixins: [mixins],
  props: {
    show: { type: Boolean },
    path: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
    },
    id: {
      type: String, //元素名称 or 类型
    },
    name: {
      type: String,
    },
    element: {
      type: String,
    },
    type: {
      type: String,
      default: "container",
    },
    props: {
      type: Object,
    },
    childrenData: {
      type: Array,
    },
  },
  components: {
    draggable,
  },

  inject: { draggableOptions: { default: {} } },
  data() {
    return {};
  },
  created() {},
  computed: {
    current() {
      return this.$store.state.currentId;
    },
    currentDisabled() {
      const draggableOptions = this.draggableOptions || {};
      let res = draggableOptions && draggableOptions.clone;
      return res;
    },
    sort() {
      const draggableOptions = this.draggableOptions || {};
      let res = !draggableOptions || !draggableOptions.clone;
      // 用于固定
      if (res && this.current) {
        res = this.current === this.id;
      }

      return res;
    },
    currentPath() {
      return [this.path, this.element].filter((item) => item).join("_");
    },
    dragClassName() {
      const list = ["drag-wrapper", "drag-" + this.type];
      if (!this.draggableOptions.clone && this.current === this.id) {
        list.push("low-active");
      }
      if (this.show) {
        list.push("show");
      }
      return list.join(" ");
    },
    elements: {
      set(val) {
        this.$store.commit("setElement", val);
      },
      get() {
        return this.$store.state.elements;
      },
    },
    group() {
      let group = this.type;
      if (this.draggableOptions.group) {
        group = Object.assign({}, this.draggableOptions.group);
      }
      return group;
    },
  },

  methods: {
    emitter(value) {
      this.$emit("input", value);
    },

    handleCloneTree(oldElement) {
      const element = cloneDeep(oldElement);
      delete element.clone;
      delete element.disabled;
      element.props = Object.assign({}, element.props);

      element.id = uuidv4();

      if (element.type === "container") {
        element.childrenData = (element.childrenData || []).map((item) => {
          return this.handleCloneTree(item);
        });
      }
      return element;
    },
    handleClone(item = {}) {
      if (!this.draggableOptions.group) {
        return item;
      }

      return this.handleCloneTree(item);
    },

    handleClickItem(element) {
      if (!this.draggableOptions.clone) {
        this.$store.commit("setCurrentComponent", element);
        this.$store.commit("setCurrentId", element.id);
      }
    },
    handleDelete() {
      this.handleFindItem(this.elements, this.current);
      this.$store.commit("setCurrentComponent", null);
      this.$store.commit("setCurrentId", undefined);
    },
    handleFindItem(elements, id) {
      if (!elements.childrenData || !elements.childrenData.length) {
        return;
      }
      const list = elements.childrenData;
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list.splice(i, 1);
          return;
        }
        this.handleFindItem(list[i], id);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.low-active {
  border-style: solid !important;
  border-width: 2px !important;
  border-color: #009688 !important;
}
.active {
  position: relative;
  .el-icon-delete {
    background: #98d2ff;
    color: #fff;
    position: absolute;
    font-size: 14px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    right: 7px;
    bottom: 7px;
  }
}
.drag-wrapper {
  position: relative;
  &::before {
    position: absolute;
    content: attr(data-name);
    font-size: 12px;
    left: 0;
    top: 0;
    transform: translate(20%, 0%);
    color: #98d2ff;
  }
}
.drag-container {
  min-height: 30px;
  padding: 5px;
  border: 1px dashed;
  border-color: #cde9ff;
  margin: 5px;
  overflow: hidden;
  transition: border 50ms;

  &.show {
    padding: 0;
    margin: 0;
    border: 0;
    overflow: visible;
    min-height: 0;
    &::before {
      display: none;
    }
  }
}
</style>
