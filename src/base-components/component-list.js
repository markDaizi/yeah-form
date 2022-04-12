const componentList = [
  {
    type: "layout",
    element: "layout",
    label: "功能",
    disabled: true,
    childrenData: [
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "input",
            type: "element",
            name: "输入框组件",
            clone: true,
            props: {},
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "button",
            type: "element",
            name: "按钮组件",
            clone: true,
            props: {
              text: "按钮名称",
            }, // 参数
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "text",
            type: "element",
            name: "文字组件",
            clone: true,
            props: {
              text: "文字组件",
            }, // 参数
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "tag",
            type: "element",
            name: "标签",
            clone: true,
            props: {
              text: "标签一",
            }, // 参数
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "progress",
            type: "element",
            name: "进度条",
            clone: true,
            props: {
              percentage: 43,
            }, // 参数
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "pagination",
            type: "element",
            name: "分页",
            clone: true,
            props: {
              total: 100,
            }, // 参数
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "alert",
            type: "element",
            name: "警告",
            clone: true,
            props: {
              title: "提示的文案",
            }, // 参数
          },
        ],
      },
    ],
  },
  {
    type: "layout",
    element: "layout",
    label: "容器",
    disabled: true,
    childrenData: [
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            name: "行",
            element: "row", // 元素名称 or 类型
            type: "container", // container or element
            clone: true,
            disabled: true,
            childrenData: [
              {
                element: "col", // 元素名称 or 类型
                type: "container", // container or element
                clone: true,
                name: "列",

                props: {
                  span: 12,
                },
              },
              {
                element: "col", // 元素名称 or 类型
                type: "container", // container or element
                clone: true,
                name: "列",

                props: {
                  span: 12,
                },
              },
            ],
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "col", // 元素名称 or 类型
            type: "container", // container or element
            clone: true,
            name: "列",

            props: {
              span: 6,
            },
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "block", // 元素名称 or 类型
            type: "container", // container or element
            clone: true,
            name: "块元素",

            props: {},
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            name: "表单",
            element: "form", // 元素名称 or 类型
            type: "container", // container or element
            clone: true,
            disabled: true,
            props: {
              size: "mini",
            },
            childrenData: [
              {
                element: "form-item", // 元素名称 or 类型
                type: "container", // container or element
                disabled: true,
                props: {
                  label: "活动名称",
                },
                childrenData: [
                  {
                    disabled: true,
                    element: "input", // 元素名称 or 类型
                    type: "element", // container or element
                    props: {},
                  },
                ],
              },
              {
                element: "form-item", // 元素名称 or 类型
                type: "container", // container or element
                disabled: true,
                props: {
                  label: "活动区域",
                },
                childrenData: [
                  {
                    disabled: true,
                    element: "input", // 元素名称 or 类型
                    type: "element", // container or element
                    props: {},
                  },
                ],
              },
              {
                element: "form-item", // 元素名称 or 类型
                type: "container", // container or element
                disabled: true,
                props: {
                  label: "",
                },
                childrenData: [
                  {
                    disabled: true,
                    element: "button", // 元素名称 or 类型
                    type: "element", // container or element
                    props: {
                      text: "按钮",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "table", // 元素名称 or 类型
            type: "container", // container or element
            clone: true,
            disabled: true,
            props: {
              columns: [
                {
                  id: "id",
                  label: "编号",
                },
                {
                  id: "name",
                  label: "名称",
                },
              ],
            },
            childrenData: [
              {
                element: "button", // 元素名称 or 类型
                type: "element", // container or element
                disabled: true,
                props: {
                  type: "text",
                  size: "mini",
                  text: "查看",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "layout",
    element: "layout",
    label: "表单",
    disabled: true,
    childrenData: [
      {
        element: "block",
        type: "contailner",
        disabled: true,
        childrenData: [
          {
            element: "form", // 元素名称 or 类型
            type: "container", // container or element
            clone: true,
            // disabled: true,
            props: {
              size: "mini",
            },
            childrenData: [
              {
                element: "form-item", // 元素名称 or 类型
                type: "container", // container or element
                disabled: true,
                props: {
                  label: "表单名",
                },
                childrenData: [
                  {
                    disabled: true,
                    element: "input", // 元素名称 or 类型
                    type: "element", // container or element
                    props: {},
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "radio",
            type: "element",
            name: "单选框",
            clone: true,
            props: {
              options: [
                {
                  label: "备选项1",
                  value: "1",
                },
                {
                  label: "备选项2",
                  value: "2",
                },
              ],
            }, // 参数
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "checkbox",
            type: "element",
            name: "多选框",
            clone: true,
            props: {
              options: [
                {
                  label: "备选项1",
                  value: "12",
                },
                {
                  label: "备选项2",
                  value: "23",
                },
              ],
            }, // 参数
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "select",
            type: "element",
            name: "多选框",
            clone: true,
            props: {
              options: [
                {
                  label: "备选项1",
                  value: "12",
                },
                {
                  label: "备选项2",
                  value: "23",
                },
              ],
            }, // 参数
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "switch",
            type: "element",
            name: "开关",
            clone: true,
            props: {}, // 参数
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "slider",
            type: "element",
            name: "滑块",
            clone: true,
            props: {}, // 参数
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "time-picker",
            type: "element",
            name: "时间选择器",
            clone: true,
            props: {}, // 参数
          },
        ],
      },
      {
        element: "block",
        type: "contailner",
        childrenData: [
          {
            element: "date-picker",
            type: "element",
            name: "日期选择器",
            clone: true,
            props: {}, // 参数
          },
        ],
      },
    ],
  },
];

export default componentList;
