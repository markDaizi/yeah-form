import Vue from "vue";
import Vuex from "vuex";
import { componentFinder } from "@/utils";
import { v4 as uuidv4 } from "uuid";
import { History } from "stateshot";

Vue.use(Vuex);
const history = new History();

export default new Vuex.Store({
  state: {
    currentId: "",
    current: null,
    elements: {
      id: uuidv4(),
      element: "layout", // 元素名称 or 类型
      type: "container", // container or element
      childrenData: [],
    },
  },
  mutations: {
    initElements(state) {
      state.elements = {
        id: uuidv4(),
        element: "layout", // 元素名称 or 类型
        type: "container", // container or element
        childrenData: [],
      };
      history.reset();
    },
    setElement(state, value) {
      state.elements = value;
    },
    setCurrentComponent(state, value) {
      state.current = value;
    },
    setCurrentId(state, value) {
      state.currentId = value;
    },
    updateComponent(state, value) {
      if (state.current) {
        state.current.props = value;
      }
    },
    removeComponent(state) {
      let [parent, current, index] = componentFinder(
        state.elements,
        state.currentId
      );
      const id = current.id;

      if (parent && Array.isArray(parent.childrenData)) {
        index = parent.childrenData.findIndex((item) => item.id === id);
        parent.childrenData.splice(index, 1);
      }
    },
    resetElements() {
      this.state.elements = {
        id: uuidv4(),
        element: "layout",
        type: "container",
        childrenData: [],
      };
      history.reset();
    },
    updateHistory(state) {
      history.pushSync(state.elements);
      console.log(history);
    },
    revoke(state) {
      console.log(history, "=========");
      state.elements = history.undo().get();
    },
    vokeNext(state) {
      console.log(history, history.redo().get());
      state.elements = history.redo().get();
    },
  },
  actions: {},
  modules: {},
});
