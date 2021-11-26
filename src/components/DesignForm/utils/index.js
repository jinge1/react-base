/**
 * 转换查询框组件及时间筛选组件配置为schema标准格式
 * @param {array|object} arr 原始配置列表
 */
export function transformSearchToSchema(arr) {
  const parseList = Array.isArray(arr) ? arr : [arr];
  //  待处理
  return parseList;
}

/**
 * 转换查询框组件及时间筛选组件schema配置为接口数据格式
 * @param {array|object} arr schema配置列表
 */
export function transformSchemaToSearch(arr) {
  const parseList = Array.isArray(arr) ? arr : [arr];
  //  待处理
  return parseList;
}

/**
 * 转换图表组件配置为schema标准格式
 * @param {array|object} arr 原始配置列表
 */
export function transformChartToSchema(arr) {
  const parseList = Array.isArray(arr) ? arr : [arr];
  //  待处理
  return parseList;
}

/**
 * 转换图表组件schema配置为接口所需格式
 * @param {array|object} arr schema配置列表
 */
export function transformSchemaToChart(arr) {
  const parseList = Array.isArray(arr) ? arr : [arr];
  //  待处理
  return parseList;
}

/**
 * 转换表单组件配置为schema标准格式
 * @param {array|object} arr 原始配置列表
 */
export function transformFormToSchema(arr) {
  const parseList = Array.isArray(arr) ? arr : [arr];
  //  待处理
  return parseList;
}

/**
 * 转换表单组件schema配置为接口所需格式
 * @param {array|object} arr schema配置列表
 */
export function transformSchemaToForm(arr) {
  const parseList = Array.isArray(arr) ? arr : [arr];
  //  待处理
  return parseList;
}
