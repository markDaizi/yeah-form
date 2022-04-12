<template>
  <div class="exercise">
    <codemirror v-model="code" :options="cmOptions" />
  </div>
</template>
<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/rubyblue.css";

export default {
  props: {
    code: {
      type: String,
    },
  },
  data() {
    return {
      cmOptions: {
        tabSize: 2,
        mode: "text/javascript", // 模式
        theme: "rubyblue", // 主题
        lineNumbers: true, // 是否显示行数
        line: true,
        viewportMargin: Infinity, // 处理高度自适应时搭配使用
        highlightDifferences: true,
        autofocus: false,
        indentUnit: 2,
        smartIndent: true,
        readOnly: true, // 只读
        showCursorWhenSelecting: true,
        firstLineNumber: 1,
        // 更多配置查询 https://codemirror.net/doc/manual.html#config
      },
    };
  },
  components: {
    codemirror,
  },
};
</script>
<style>
/* 注意：这里的样式需要全局，如果写了scoped会导致样式不生效 */
.CodeMirror {
  border: 1px solid #eee;
  height: 100%; /* 编辑器盒子高度自适应 */
}
</style>
