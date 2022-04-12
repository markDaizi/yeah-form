import Vue from "vue";

const components = [
  "base-input",
  "base-button",
  "base-radio",
  "base-select",
  "base-form",
  "base-form-item",
  "base-col",
  "base-layout",
  "base-block",
  "base-progress",
  "base-row",
  "base-tag",
  "base-table",
  "base-time-picker",
  "base-date-picker",
  "base-pagination",
  "base-alert",
  "base-checkbox",
  "base-slider",
  "base-switch",
  "base-text",
];

components.forEach((key) => {
  Vue.component(key, () => import(`@/base-components/${key}`));
});
