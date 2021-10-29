// 不可见，不占位字符
const zeroWidthSpace = "​";

/**
 * 获取字段正则表单时
 * @param {string} flg 正则表达式修饰符 'img'
 * @returns
 */
export const getFieldReg = (flg = "") =>
  new RegExp(`${zeroWidthSpace}[^${zeroWidthSpace}]+${zeroWidthSpace}`, flg);

/**
 * 
 * @param {*} v 
 * @param {*} mapIds 
 * @returns 
 */
export function valueExchangeStr(v, mapIds = []) {
  // 获取字符串函数信息
  const getFunction = (s, tempStr, errors = []) => {
    const temp = tempStr ? tempStr : s;
    // 匹配非嵌套函数
    const m = temp.match(/\w+\([^()]+\)/);
    if (!m) {
      return {
        str: s,
        errors,
      };
    }
    // 当前匹配到的函数信息
    const matchStr = m[0];
    const { index } = m;
    // 实际函数信息，可通过以下逻辑判断函数是否正确（待处理）
    // 1. 函数是否在当前函数列表中
    // 2. 函数参数个数是否与当前函数匹配
    // 3. 函数参数类型是否与当前函数匹配
    const currMatch = s.substring(index, index + matchStr.length);
    const nextStr = `${s.substring(0, index)}\${${currMatch}}${s.substring(
      index + matchStr.length,
      s.length
    )}`;
    return getFunction(
      nextStr,
      temp.replace(matchStr, "*".repeat(matchStr.length + 3)),
      errors
    );
  };

  // 字段替换
  const matchField = v.match(getFieldReg("g")) || [];
  const str = matchField.reduce(
    (pre, curr, i) => pre.replace(curr, mapIds[i]),
    v
  );

  return getFunction(str);
}

export function copy(text) {
  let transfer = document.createElement("input");
  document.body.appendChild(transfer);
  transfer.value = text; // 这里表示想要复制的内容
  transfer.focus();
  transfer.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
  }
  transfer.blur();
  console.log("复制成功");
  document.body.removeChild(transfer);
}
