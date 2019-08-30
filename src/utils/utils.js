/**
 * 在多维数组中递归查询(比如省市区数据)
 * @param {*} value             用来查询的值
 * @param {*} data              在其中查询的源数据
 * @param {*} options           源数据字段值配置
 * @param {*} options.VALUE     源数据中与被查询值对应的key
 * @param {*} options.CHILDREN  源数据中子数组对应的key
 */
export function recursiveQueryInMatrix(value = '', data = [], options) {
  options = options || {};
  options.VALUE = options.VALUE || 'value';
  options.CHILDREN = options.CHILDREN || 'children';
  let res;
  const recursion = (value, data, options) => {
    data.forEach(val => {
      if (val[options.VALUE] == value) {
        res = val;
      } else {
        if (val.hasOwnProperty(options.CHILDREN) && val[options.CHILDREN].length) {
          recursion(value, val[options.CHILDREN], options);
        }
      }
    });
  }
  recursion(value, data, options);
  return res;
}