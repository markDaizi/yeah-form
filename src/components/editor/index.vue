<template>
  <div class="drag-layout">
    <drag-container
      v-bind="value"
      style="min-height: 600px"
      :show="show"
      @input="changeElement"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
    },
    show: {
      type: Boolean,
    },
  },
  computed: {
    elements: {
      set(val) {
        this.$store.commit("setElement", val);
      },
      get() {
        return this.$store.state.elements;
      },
    },
  },
  methods: {
    changeElement(val) {
      console.log(val);
      this.$store.commit("setCurrentId", val.id);
    },
  },

  created() {},
};
</script>
<style lang="scss" scoped>
.drag-layout {
  // height: 100%;
}

.list-move {
  transition: transform 0.1s;
}
</style>
