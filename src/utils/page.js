export const getDataByModel = (data, key) => {
  if (!data) return undefined;
  return key.split(".").reduce((pv, key) => {
    if (!pv) return undefined;
    return pv[key];
  }, data);
};
export const setDataByModel = (data, key, value) => {
  const keys = key.split(".");
  const _key = keys.pop();
  if (!_key) return;
  keys.reduce((pv, key) => {
    return pv[key];
  }, data)[_key] = value;
};
