import React, {
    useEffect,
    useCallback,
    useImperativeHandle,
    useState,
    forwardRef,
    useRef,
  } from "react";
  import { Row, Col, Button } from "antd";
  import styled from "@emotion/styled";
  
  // 官网 https://codemirror.net/index.html
  // 中文文档地址：https://tun6.com/code_mirror/api/
  import CodeMirror from "codemirror";
  import "codemirror/lib/codemirror.js";
  import "codemirror/lib/codemirror.css";
  
  // 主题
  import "codemirror/theme/blackboard.css";
  import "codemirror/theme/cobalt.css";
  
  // 括号匹配
  import "codemirror/addon/edit/matchbrackets.js";
  
  // 高亮行功能
  // import "codemirror/addon/selection/active-line";
  // import "codemirror/addon/selection/selection-pointer";
  
  // 调整scrollbar样式功能
  // import "codemirror/addon/scroll/simplescrollbars.css";
  // import "codemirror/addon/scroll/simplescrollbars";
  
  // 引入代码自动提示插件
  import "codemirror/addon/hint/show-hint.css";
  import "codemirror/addon/hint/show-hint";
  
  import { setMode } from "./utils/mode";
  import { setHint } from "./utils/hint";
  import { copy } from "./utils/utils";
  
  const EditBox = styled.div`
    text-align: left;
    line-height: 20px;
    .cm-field {
      color: #fff;
      background: #178cdf;
      border-radius: 2px;
      padding: 0 5px;
      font-size: 12px;
      line-height: 20px;
      margin: 1px;
    }
    .CodeMirror-lines {
      /* background: transparent; */
    }
  `;
  
  const zeroWidthSpace = "​";
  // const zeroWidthSpace = "​\u200b";  // 插入2个
  
  // 包装字段
  const getZeroText = (str) => `${zeroWidthSpace}${str}${zeroWidthSpace}`;
  
  /**
   * 获取字段正则表单时
   * @param {string} flg 正则表达式修饰符 'img'
   * @returns
   */
  const getFieldReg = (flg = "") =>
    new RegExp(`${zeroWidthSpace}[^${zeroWidthSpace}]+${zeroWidthSpace}`, flg);
  
  /**
   * 公式编辑输入组件
   * @param {object} props
   * @returns
   * 函数列表（可手动输入编辑）
   * 字段列表（不可手动输入，只能选择插入与删除）
   */
  function CodeEdit(props, ref) {
    const { defaultValue = "", keywords = [], hints = [], conf = {} } = props;
    const [codeIds, setCodeIds] = useState([]);
    const boxRef = useRef(null);
    const editRef = useRef(null);
    const insertItem = useRef(null);
    console.log(codeIds, "codeIds---");
  
    const exportStr = useCallback(() => {
      const { current } = editRef;
      const v = current.getValue();
      // 字段替换
      const matchField = v.match(getFieldReg("g")) || [];
      const str = matchField.reduce(
        (pre, curr, i) => pre.replace(curr, codeIds[i]),
        v
      );
  
      // 获取字符串函数信息
      const getFunction = (s, tempStr, errors = []) => {
        const temp = tempStr ? tempStr : s;
        // 匹配非嵌套函数
        const m = temp.match(/\w+\([^(){}]+\)/);
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
      return getFunction(str);
    }, [codeIds]);
  
    // 导出信息指向父组件ref
    useImperativeHandle(ref, () => ({
      editor: editRef.current,
      change: () => {
        console.log("change");
      },
      /**
       * 插入字段或函数
       * @param {object} item @example {id: '', text: ''}
       * @param {number} type 1 字段 2 函数
       */
      insert: (item, type = 1) => {
        const { current } = editRef;
        const { text } = item;
        insertItem.current = item;
        current.replaceSelection(type === 1 ? getZeroText(text) : text);
      },
      exportStr,
    }));
  
    // 获取光标相关
    const getCursorInfo = useCallback(() => {
      const { current } = editRef;
      const doc = current.getDoc();
      // cursor.ch 光标所在位置
      const cursor = doc.getCursor();
      const token = current.getTokenAt(cursor);
      return {
        ...cursor,
        ...token,
        doc,
      };
    }, []);
  
    /**
     * 获取字符串中字段信息
     * @returns [{start: 开始位置, end: 结束位置，text: 字段字符串}]
     */
    const getStrFiledInfo = useCallback((str) => {
      const getFieldPosition = (s, result = [], i = 0) => {
        const m = s.match(getFieldReg());
        if (!m) {
          return result;
        }
        const str = m[0];
        const { index } = m;
        const len = str.length;
        return getFieldPosition(
          s.replace(str, "*".repeat(len)),
          [...result, { start: index, end: index + len, text: str, index: i }],
          i + 1
        );
      };
      return getFieldPosition(str);
    }, []);
  
    // 原始变量值转换为编辑器显示内容
    const exchangeValue = useCallback(
      (v) => {
        // 通过三种变量形式（单引号，双引号，${变量名}）找出所有可能的变量id
        const m = v.match(/('[^'"(){},]+')|("[^'"(){},]+")|(\$\{[^'"(){},]+\})/g);
  
        if (keywords.length === 0 || !Array.isArray(m)) {
          return { str: v, matchIds: [] };
        }
        // 非字符串转换为字符串（id可能为数字）
        const getStr = (s) => (typeof s === "string" ? s : `${s}`);
  
        // 筛选在keywords中的变量id
        const matchIds = m.filter((id) => {
          const trimId = id.replace(/['"${}]/g, "");
          return keywords.some((a) => getStr(a.id) === trimId);
        });
  
        // 替换id为对应的展示文本
        const keywordsStr = matchIds.reduce((pre, id) => {
          const trimId = id.replace(/['"${}]/g, "");
          const { text = "" } =
            keywords.find((a) => getStr(a.id) === trimId) || {};
          return pre.replace(id, getZeroText(text));
        }, v);
  
        // 去除函数的${}标识
        const trimFunction = (s) => {
          // 找出其中一个不包其他含函数的函数
          const m = s.match(/\$\{[^${}]+}/);
          if (!m) {
            return s;
          }
          const matchStr = m[0];
          const { index } = m;
          // 去除找出函数的${}标识
          return trimFunction(
            s
              .split("")
              .filter(
                (f, i) =>
                  ![index, index + 1, index + matchStr.length - 1].includes(i)
              )
              .join("")
          );
        };
        const str = trimFunction(keywordsStr);
        return { str, matchIds };
      },
      [keywords]
    );
  
    const setCodeEvents = useCallback(() => {
      const { current: edit } = editRef;
      // 是否需要对输入进行校验
      let isCheck = true;
  
      // 修改前信息
      let beforeChangeInfo = null;
  
      const correctStr = (str, start, end) => {
        const leftChar = str.charAt(start > 0 ? start - 1 : 0);
        const rightChar = str.charAt(start);
        if (
          (leftChar === zeroWidthSpace && rightChar === zeroWidthSpace) ||
          (leftChar === zeroWidthSpace && /[^{}()[\],. ]/.test(rightChar)) ||
          (rightChar === zeroWidthSpace && /[^{}()[\],. ]/.test(leftChar))
        ) {
          return `${str.substring(0, start)} ${str.substring(start, str.length)}`;
        }
        return str;
      };
  
      // 当鼠标点击内容区、改变选区、修改内容时被触发
      edit.on("cursorActivity", () => {
        isCheck = true;
        // 重置修改信息内容
        beforeChangeInfo = null;
        const { doc, line, start, end, type, ch } = getCursorInfo();
        const value = edit.getValue();
        const len = value.length;
        if (len === ch || [" ", "("].includes(value.charAt(ch + 1))) {
          // 显示提示侧
          edit.showHint();
        }
  
        const selectStr = doc.getSelection();
        // 光标定位在字段上的时候，则选中整个字段
        if (type === "field" && selectStr.length < 1 && ch > start && ch < end) {
          doc.setSelection({ line, ch: start }, { line, ch: end });
        }
      });
      edit.on("clear", () => {});
      // 输入或粘贴时触发，删除内容不触发
  
      edit.on("inputRead", () => {});
  
      edit.on("copy", (cm, event) => {
        const doc = cm.getDoc();
        const selectStr = doc.getSelection();
        //   复制内容包含字段，需要转换复制内容
        if (selectStr.includes(zeroWidthSpace)) {
          const { anchor = {}, head = {} } = doc.listSelections()[0];
          const { ch: aCh } = anchor;
          const { ch: hCh } = head;
          const start = Math.min(aCh, hCh);
          const end = Math.max(aCh, hCh);
          console.log("copy---", start, end);
        }
      });
  
      // 不能在 "beforeChange" 事件的处理函数中做任何影响编辑器内容的操作
      edit.on("beforeChange", (et, change) => {
        console.log("beforeChange");
        const { from, to } = change;
        const { line, ch: startCh } = from;
        const { ch: endCh } = to;
        beforeChangeInfo = {
          str: edit.getValue(),
          line,
          startCh,
          endCh,
        };
      });
  
      edit.on("change", (et, change) => {
        if (!isCheck || !beforeChangeInfo) {
          return false;
        }
        const { current } = insertItem;
        const { removed, text, origin } = change;
  
        const { str, line, startCh, endCh } = beforeChangeInfo;
        const removeText =
          Array.isArray(removed) && removed.length > 0 ? removed[0] : "";
        const insertText = Array.isArray(text) && text.length > 0 ? text[0] : "";
        const { id = "" } = current || {};
        insertItem.current = null;
        // setValue会再次触发 beforeChange，change， cursorActivity，不重置isCheck会导致死循环
        isCheck = false;
  
        // 修改前映射字段信息
        const preArr = getStrFiledInfo(str);
  
        // 删除内容包含字段（包含新增字段逻辑）
        if (removeText.includes(zeroWidthSpace)) {
          // 筛选出删除范围内包含的字段
          const delFields =
            endCh - startCh <= 1
              ? preArr.filter(({ start, end }) => end === endCh)
              : preArr.filter(
                  ({ start, end }) =>
                    (start >= startCh && end <= endCh) ||
                    (start <= startCh && end > startCh) ||
                    (start <= endCh && end > endCh)
                );
          const min = Math.min(startCh, ...delFields.map(({ start }) => start));
          const max = Math.max(endCh, ...delFields.map(({ end }) => end));
          const nextStr = `${str.slice(0, min)}${insertText}${str.slice(
            max,
            str.length
          )}`;
          const nextValue = correctStr(nextStr, min, max);
          edit.setValue(nextValue);
          edit.setCursor(line, min);
          // 删除项中最小index
          const minIndex = Math.min(...delFields.map(({ index }) => index));
          const getNextIds = (arr) => {
            let result = [...arr];
            if (id && insertText.includes(zeroWidthSpace)) {
              result.splice(minIndex, delFields.length, id);
            } else {
              result.splice(minIndex, delFields.length);
            }
            return result;
          };
          // 更新映射表
          setCodeIds((preIds) => getNextIds(preIds));
          return false;
        }
  
        let nextStr = edit.getValue();
        const nextValue = correctStr(nextStr, startCh);
        edit.setValue(nextValue);
        edit.setCursor(
          line,
          origin === "+delete" ? startCh : endCh + insertText.length
        );
  
        // 插入字段（无删除字段）
        if (id && insertText.includes(zeroWidthSpace)) {
          if (preArr.length === 0) {
            setCodeIds(id);
          }
          const { start: min } = preArr[0];
          const { start: max } = preArr[preArr.length - 1];
          if (startCh <= min) {
            setCodeIds((preIds) => [id, ...preIds]);
            return false;
          }
          if (startCh >= max) {
            setCodeIds((preIds) => [...preIds, id]);
            return false;
          }
          const item = preArr.find(
            ({ start }, i) =>
              i > 0 && start > startCh && preArr[i - 1].start < startCh
          );
          if (item) {
            setCodeIds((preIds) => {
              const result = [...preIds];
              result.splice(item.index, 0, id);
              return result;
            });
          }
        }
      });
    }, [getCursorInfo, getStrFiledInfo, setCodeIds]);
  
    const getFiledStyle = useCallback(
      /**
       * 自定义匹配规则
       * @param {string} ch 当前匹配字符串
       * @param {object} stream 字符对象（具体看官方文档）
       * @returns 匹配成功则返回样式字符串
       */
      (ch, stream) => {
        const fieldReg = new RegExp(`[^${zeroWidthSpace}]+${zeroWidthSpace}`);
        if (ch === zeroWidthSpace && stream.match(fieldReg)) {
          return "field";
        }
        return false;
      },
      []
    );
  
    useEffect(() => {
      const { current } = boxRef;
      function initEditor() {
        const edit = CodeMirror(current, {
          // mode: "text/javascript",
          // theme: "cobalt", // 主题
          indentWithTabs: true,
          smartIndent: true,
          //   readOnly: true,
          //   lineNumbers: true, // 显示行号
          matchBrackets: true, // 自动括号匹配功能
          autofocus: true,
          // autoCloseBrackets: true,  // 自动闭合括号
          // 触发按键
          extraKeys: { Tab: "autocomplete" },
          dragDrop: false, // 是否启用拖拽，默认为 true
          hintOptions: {
            // 解决选择提示选项后无法删除问题
            completeSingle: false, // 当匹配只有一项的时候是否自动补全
          },
          // 文字过长时，是换行(wrap)还是滚动(scroll),默认是滚动
          lineWrapping: true,
          // 描述哪些特殊字符应该被替换为special placeholder
          specialChars:
            /[\u0000-\u001f\u007f\u00ad\u200d-\u200f\u2028\u2029\ufeff]/,
          // 当传入一个与specialChars匹配的字符时，返回一个用于替换的DOM节点
          // specialCharPlaceholder
          // scrollbarStyle: "overlay",
        });
        editRef.current = edit;
        // 高度自适应，默认为3000
        edit.setSize("auto", "auto");
        const madeItem = (text, flg = 1) => ({
          text: flg === 1 ? getZeroText(text) : text,
          type: "keyword",
          style: flg === 1 ? "field" : "keyword",
        });
        const { str, matchIds } = exchangeValue(defaultValue);
        setMode(
          [
            ...keywords.map(({ text }) => madeItem(text)),
            ...hints.map(({ text }) => madeItem(text.replace(/\(\)$/, ""), 2)),
          ],
          getFiledStyle
        );
        setHint(hints.map(({ text }) => text));
  
        if (matchIds.length > 0) {
          setCodeIds(matchIds);
        }
        // 设置初始值及初始映射关系
        edit.setValue(str);
        const { doc, line } = getCursorInfo();
        doc.setCursor({ line, ch: str.length });
        setCodeEvents();
      }
      initEditor();
      return () => {
        // 销毁（否则会出现多个dom节点）
        if (current && current.children.length > 0) {
          // 解除事件绑定
          // editRef.current.off()
          editRef.current = null;
          current.innerHTML = "";
        }
      };
    }, [
      defaultValue,
      keywords,
      hints,
      exchangeValue,
      getCursorInfo,
      setCodeEvents,
      getFiledStyle,
    ]);
  
    const toExport = () => {
      const { str } = exportStr();
      console.log(str, "str---");
      copy("abcd");
    };
  
    return (
      <>
        <EditBox>
          <Row gutter={16}>
            <Col className="gutter-row" span={4}>
              <Button type="primary">undo</Button>
            </Col>
            <Col className="gutter-row" span={4}>
              <Button type="primary">redo</Button>
            </Col>
            <Col className="gutter-row" span={4}>
              <Button type="primary" onClick={toExport}>
                导出
              </Button>
            </Col>
          </Row>
          <div ref={boxRef}></div>
        </EditBox>
      </>
    );
  }
  
  // forwardRef 引用传递 通过useImperativeHandle导出信息指向父组件ref
  export default forwardRef(CodeEdit);
  