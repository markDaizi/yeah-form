// TODO: 这里应该放在一个单独的配置中
// 可容纳 or 不可容纳
const putRules = {
  row: {
    allow: ["col"], // 二选一 ？
    notallow: [], // 二选一 ？
  },
};
// 可归属 or 不可归属
const pullRules = {
  "form-item": {
    // 父元素
    allow: [],
    notallow: [],
    // 爷父 元素
    parent: ["form"],
  },
  col: {
    allow: ["row"],
    notallow: [],
  },
};

function hasElementDragState(to, from, toPath, fromPath) {
  const putHas = [true, false, true];
  const pullHas = [true, false, true];

  const putNode = putRules[to];
  const pullNode = pullRules[from];

  if (putNode) {
    putHas[0] = putNode.allow.length ? putNode.allow.includes(from) : true;
    putHas[1] = putNode.notallow.length
      ? putNode.notallow.includes(from)
      : false;
  }

  if (pullNode) {
    pullHas[0] = pullNode.allow.length ? pullNode.allow.includes(to) : true;
    pullHas[1] = pullNode.notallow.length
      ? pullNode.notallow.includes(to)
      : false;

    if (Array.isArray(pullNode.parent) && pullNode.parent.length > 0) {
      const toPathArr = toPath.split("_");
      const list = pullNode.parent.filter((item) => {
        return toPathArr.includes(item);
      });

      pullHas[2] = list.length === pullNode.parent.length;
    }
  }

  return (
    putHas[0] &&
    pullHas[0] &&
    !putHas[1] &&
    !pullHas[1] &&
    pullHas[2] &&
    putHas[2]
  );
}

export default {
  methods: {
    checkMove(e) {
      const { dragged, to } = e;

      const fromContextElement = e.draggedContext.element; // 当前拖拽的元素
      const toContextElement = e.relatedContext.element; // 被替换 or 换位置的元素
      console.log(e, "==========fromContextElement");
      if (toContextElement) {
        const { type: toType, clone: toClone } = toContextElement;
        const { type: fromType } = fromContextElement;
        // 类型不同
        console.log(toType, fromType);
        if (toType !== fromType) return false;
        if (toClone) return false;
      }
      // 验证元素是否可以拖动到当前元素
      const toTag = to.dataset.tag || "";
      const fromTag = dragged.dataset.tag || "";
      const toPath = to.dataset.path || "";
      const fromPath = dragged.dataset.path || "";

      const has = hasElementDragState(toTag, fromTag, toPath, fromPath);
      return has;
    },
  },
};
