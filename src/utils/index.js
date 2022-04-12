export function componentFinder(elements, id) {
  let current;
  let index;
  /** 通过ID查找组件
   * @method findComponentById
   * @param {*} id
   * @param {*} item
   * @param {*} current
   * @returns {object} resData
   */
  function findComponentById(id, elements) {
    if (elements.id === id) {
      return elements;
    }
    const list = elements.childrenData;
    if (Array.isArray(list)) {
      for (let i = 0; i < list.length; i++) {
        const resData = findComponentById(id, list[i]);
        if (!current && resData) {
          current = elements;
          index = i;
        }
        if (resData) return resData;
      }
    }
  }
  const element = findComponentById(id, elements);
  const res = [current, element, index];

  current = undefined;
  index = -1;
  return res;
}
