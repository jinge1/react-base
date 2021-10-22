/**
 * 模拟接口数据
 */

/**
 * 块级内容(高亮展示，不提示)
 * 可动态添加，可删除，不能手动编辑、修改
 */
export const fieldsList = [
  { id: "input_tq42hef8car", text: "文本输入" },
  { id: "input_lv1c2qugd6h", text: "数字输入" },
  { id: "datePicker_bfqieygwi59", text: "日期输入" },
];

/**
 * 块级内容(高亮展示，不提示)
 * 可动态添加，可删除，不能手动编辑、修改
 */
export const servicesList = [
  { id: "ds_8xfiu8xfiu_115", text: "服务测试" },
  { id: "ds_8xfiu8xfiu_115.1455", text: "服务测试.服务测试ID" },
  { id: "ds_8xfiu8xfiu_115.1456", text: "服务测试.服务测试name" },
  { id: "ds_8xfiu8xfiu_115.1457", text: "服务测试.服务测试_clientId" },
  { id: "ds_e6xfxe6xfx_115", text: "季然-测试" },
  { id: "ds_e6xfxe6xfx_115.Trade_name", text: "季然-测试.测试属性1" },
];

/**
 * 函数内容（编辑框中输入内容会展示提示列表）
 * 可编辑、修改，增删等
 */
export const functionList = [
  { id: 1, text: "loginUser()" },
  { id: 2, text: "loginDevice()" },
  { id: 3, text: "select()" },
];

// 模拟初始值
export const defaultValue = `\${select('ds_8xfiu8xfiu_115','ds_8xfiu8xfiu_115.1455','\${input_tq42hef8car}',"ds_e6xfxe6xfx_115.Trade_name",'\${input_lv1c2qugd6h}','\${datePicker_bfqieygwi59}')}`;

// export const defaultValue = `\${create('\${select("abc", '\${cba}', "\${cccba}")}')}`;

// export const defaultValue = `\${create('\${select("abc", '\${cba}', "\${cccba}")}')}`;
