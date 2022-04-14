<template>
  <div class="home">
    <!-- <Toolbar /> -->
    <el-header height="50px">
      <div class="layout-header">
        <p>yeah-form</p>
        <div class="tools-bar">
          <el-button
            title="返回上一步"
            type="primary"
            size="mini"
            icon="el-icon-back"
            plain
            circle
            @click="revoke"
          ></el-button>
          <el-button
            title="返回下一步"
            type="primary"
            size="mini"
            icon="el-icon-right"
            plain
            circle
            @click="vokeNext"
          ></el-button>
          <el-button
            title="展示代码"
            type="primary"
            size="mini"
            icon="el-icon-document"
            plain
            circle
            @click="handleShowCodeData"
          ></el-button>

          <el-button
            title="预览"
            type="primary"
            size="mini"
            icon="el-icon-view"
            plain
            circle
            @click="preview"
          ></el-button>
          <el-button
            title="重置"
            type="danger"
            size="mini"
            icon="el-icon-refresh"
            plain
            circle
            @click="clear"
          ></el-button>
        </div>
      </div>
    </el-header>
    <main>
      <!-- 左侧组件列表 -->
      <section class="left">
        <aside-left />
      </section>
      <!-- 中间画布 -->
      <section class="center">
        <Editor v-model="elements" :show="show" v-if="!showCode" />
        <code-preview v-else :code="code" />
      </section>
      <!-- 右侧属性列表 -->
      <section class="right">
        <el-tabs v-model="activeName">
          <el-tab-pane label="属性" name="attr">
            <div v-if="current">
              <component
                :is="'bc-' + current.element + '-option'"
                :element="current"
              ></component>
            </div>
          </el-tab-pane>
        </el-tabs>
      </section>
    </main>
  </div>
</template>

<script>
import AsideLeft from "../components/aside.vue";
import Editor from "../components/editor/index.vue";
import AttrList from "../components/editor/attribute.vue";
import CodePreview from "@/components/preview/code.vue";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import vueTemplate from "@/utils/tmp";

export default {
  components: { AsideLeft, Editor, AttrList, CodePreview },
  data() {
    return {
      curComponent: "input",
      activeName: "attr",
      code: "",
      showCode: false,
      show: false,
      isEditing: false,
      jsStr: "",
    };
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
    current: {
      set(val) {
        this.$store.commit("setCurrentComponent", val);
      },
      get() {
        return this.$store.state.current;
      },
    },
  },
  watch: {
    elements: {
      handler(val) {
        console.log(this.isEditing, "this.isEditing");
        if (!this.isEditing) {
          this.$store.commit("updateHistory");
        } else {
          this.isEditing = false;
        }
        this.jsStr = this.generateJsCode(val);
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.commit("initElements");
  },
  methods: {
    handleShowCodeData() {
      this.showCode = !this.showCode;
      // if (this.showCode) {
      //   this.showCode = !this.showCode;
      //   return;
      // }
      function generate(item) {
        const props = item["props"] || {};
        let tagName;
        if (item.element === "layout") {
          tagName = "div";
        } else {
          tagName = `el-${item.element}`;
        }

        let children = (item.childrenData || [])
          .map((item) => {
            return generate(item);
          })
          .join("\n");

        if (children) {
          children = "\n" + children + "\n";
        }
        const attrs = Object.keys(props)
          .filter((key) => props[key])
          .reduce((pv, key) => {
            const value = JSON.stringify(props[key]);
            if(key==='value'){
              pv += ` v-model=${value}`;
            }else{
              pv += ` :${key}='${value}'`;
            }
            return pv;
          }, "");
        let element = `<${tagName} ${attrs}>${children}</${tagName}>`;
        if (!children && props.text) {
          element = `<${tagName} ${attrs}>${props.text}</${tagName}>`;
        } else if (tagName === "el-table") {
          let tableStr = "";
          props.columns.forEach((item) => {
            tableStr += `<el-table-column
            prop="${item.id}"
            key="${item.id}"
            label="${item.label}"
            width="${item.width}"
          >
          </el-table-column>`;
          });
          element = `<${tagName} ${attrs}>
          ${tableStr}
          <el-table-column
            label="操作"
          >
           <template slot-scope="scope">
          ${children}
          </template>
          </el-table-column>
          </${tagName}>`;
        }

        return element;
      }
      const code = prettier.format(generate(this.elements), {
        parser: "html",
        plugins: [parserHtml],
      });

      this.code = vueTemplate(code, this.jsStr);
    },
    generateJsCode(item) {
      const props = item["props"] || {};
      let children = (item.childrenData || []).map((item) => {
        return this.generateJsCode(item);
      });
      let attrs = "";
      Object.keys(props)
        .filter((key) => props[key] && key === "value")
        .forEach((item) => {
          const value = JSON.stringify(props[item]);
          attrs = `${value}:null\n`;
        });
      let element = `${attrs}${children}`;
      return element;
    },
    preview() {
      this.show = !this.show;
      this.$store.commit("setCurrentComponent", null);
      this.$store.commit("setCurrentId", undefined);
    },
    revoke() {
      this.isEditing = true;
      this.$store.commit("revoke");
    },
    vokeNext() {
      this.isEditing = true;
      this.$store.commit("vokeNext");
    },
    clear() {
      this.$store.commit("setCurrentComponent", null);
      this.$store.commit("setCurrentId", undefined);
      this.$store.commit("resetElements");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  background: #fff;

  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 280px;
      left: 0;
      top: 0;
      overflow: auto;
      // padding-top: 10px;
    }

    .right {
      position: absolute;
      height: 100%;
      overflow: auto;
      width: 262px;
      right: 0;
      top: 0;
    }

    .center {
      margin-left: 280px;
      margin-right: 262px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;

      .content {
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }
  .layout-header {
    display: flex;
    align-items: center;
    color: #333;
    height: 100%;

    img {
      /* filter: invert(1); */
      width: 38px;
    }
    p {
      margin-left: 12px;
      font-weight: bold;
      font-size: 16px;
      color: #212121;
    }
    .tools-bar {
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
  }
}
</style>
