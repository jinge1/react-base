import {
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
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

import { setMode } from "../utils/mode";
import { setHint } from "../utils/hint";

// # 规则

// ## 字段 使用引号或${}

// - 'abc'
// - ${abc}

// ## 函数

// '${函数名}'

// ## 嵌套

// ${create('${select(\'${update(\'field\')}\')}')}

// ## arrayMap 函数，\*{\_id}为变量

// ${arrayMap('${select("ds_2rxl52rxl5_115.goods_object","ds_2rxl52rxl5_115.gys_name = \'供应商 3\'","ds_2rxl52rxl5_115.order_ts","desc","100")}', 'A','\*{\_id}','B','这是一个死值')}

const EditBox = styled.div`
  text-align: left;
  .cm-field {
    color: #fff;
    background: #178cdf;
    border-radius: 2px;
    padding: 0 5px;
    font-size: 12px;
    line-height: 20px;
    margin: 1px;
  }
`;

const zeroWidthSpace = "​";
// const zeroWidthSpace = "​\u200b";  // 插入2个

const getBlockText = (str) => `${zeroWidthSpace}${str}${zeroWidthSpace}`;
// const getBlockText = (str) => `${str}`;

/**
 * 公式编辑输入组件
 * @param {object} props
 * @returns
 * 函数列表（可手动输入编辑）
 * 字段列表（不可手动输入，只能选择插入与删除）
 */
function CodeEdit(props, ref) {
  const { defaultValue = "", fields, hints, conf = {} } = props;
  const [fieldIds, setFieldIds] = useState([]);
  const boxRef = useRef(null);
  const editorRef = useRef(null);

  // 导出信息指向父组件ref
  useImperativeHandle(ref, () => ({
    editor: editorRef.current,
    change: () => {
      console.log("change");
    },
    insert: (text, isChange = false) => {
      const { current } = editorRef;
      console.log(text, "text---");
      // const { current: edit } = editorRef;
      // const doc = edit.getDoc();
      // cursor.ch 光标所在位置
      // const cursor = doc.getCursor();
      current.replaceSelection(isChange ? getBlockText(text) : text);
    },
  }));

  const getCursorInfo = useCallback(() => {
    const { current } = editorRef;
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

  // 初始数据处理
  const setInitValue = useCallback(
    (str, fieldsArr) => {
      const { current } = editorRef;
      // 初始化字符串，添加引号方便统一处理
      if (str.trim() === "" || fieldsArr.length === 0) {
        current.setValue("");
        setFieldIds([]);
        return false;
      }
      // 最外层加引号
      const s = /^['"]/.test(str) ? str : `'${str}'`;

      // 字段存在的3中方式，单引号，双引号，或${}
      const matchIds =
        s.match(
          /('[^'(){},]+')|("[^"(){},]+")|('\$\s*\{[^'(){},]+\})|("\$\s*\{[^"(){},]+\})/g
        ) || [];
      // 删选匹配项为
      const matchFields = matchIds.filter((m) =>
        fieldsArr.some(({ id }) => m.replace(/['"${}]/g, "") === id)
      );
      console.log(matchFields, fieldsArr, "matchFields---");
      // console.log(s, "s");

      // current.setValue(v);
      // const { doc, line } = getCursorInfo();
      // doc.setCursor({ line, ch: v.length });
    },
    [getCursorInfo]
  );

  useEffect(() => {
    const { current } = boxRef;
    function initEditor() {
      const editor = CodeMirror(current, {
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
      // 高度自适应，默认为3000
      editor.setSize("auto", "auto");
      editorRef.current = editor;
      setMode(fields.map(({ text }) => text));
      setInitValue(defaultValue, fields);
    }
    initEditor();
    return () => {
      // 销毁（否则会出现多个dom节点）
      if (current && current.children.length > 0) {
        // 解除事件绑定
        // editorRef.current.off()
        editorRef.current = null;
        current.innerHTML = "";
      }
    };
  }, [defaultValue, fields, hints, setInitValue]);

  // useEffect(() => {
  //   const { current } = boxRef;
  //   // console.log(fields, "fields---", hintsTables);
  //   function init() {
  //     // fields 字段出现-字符会有问题
  //     // setMode([
  //     //   ...[...fields, ...hintsTables].map((item) => ({
  //     //     ...item,
  //     //     text: getBlockText(item.text),
  //     //   })),
  //     //   ...hints.map((text) => ({
  //     //     text: text.replace("()", "").trim(),
  //     //     type: "keyword",
  //     //     style: "keyword",
  //     //   })),
  //     //   // { text: "() ", type: "field", style: "field" },
  //     //   // { text: "(", type: "field", style: "field" },
  //     // ]);
  //     // setHint([...hints]);

  //     const edit = CodeMirror(current, {
  //       // 语言及语法模式
  //       // mode: "text/javascript",
  //       // theme: "cobalt", // 主题
  //       indentWithTabs: true,
  //       smartIndent: true,
  //       //   readOnly: true,
  //       //   lineNumbers: true, // 显示行号
  //       matchBrackets: true, // 自动括号匹配功能
  //       autofocus: true,
  //       // foldGutter: true,
  //       // gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  //       // autoCloseBrackets: true,  // 自动闭合括号
  //       // 触发按键
  //       extraKeys: { Tab: "autocomplete" },
  //       hintOptions: {
  //         // 解决选择提示选项后无法删除问题
  //         completeSingle: false, // 当匹配只有一项的时候是否自动补全
  //         //   // hint: handleHint,
  //         // tables: {
  //         //   users: ["name", "score", "birthDate"],
  //         //   countries: ["name", "population", "size"],
  //         //   score: ["zooao"],
  //         // },
  //         // tables: { "hive.table": ["filed"], abc: ["abcdef"] },
  //       },
  //       // 文字过长时，是换行(wrap)还是滚动(scroll),默认是滚动
  //       lineWrapping: true,
  //       // 描述哪些特殊字符应该被替换为special placeholder
  //       specialChars:
  //         /[\u0000-\u001f\u007f\u00ad\u200d-\u200f\u2028\u2029\ufeff]/,
  //       // 当传入一个与specialChars匹配的字符时，返回一个用于替换的DOM节点
  //       // specialCharPlaceholder
  //       // // 高亮行功能
  //       // styleActiveLine: true,
  //       // // 调整scrollbar样式功能
  //       // scrollbarStyle: "overlay",
  //       // value,
  //     });

  //     let isField = false;

  //     // 当鼠标点击内容区、选中内容、修改内容时被触发
  //     edit.on("cursorActivity", () => {
  //       // 显示提示
  //       isField = false;
  //       edit.showHint();
  //       const { doc, line, start, end, type, ch } = getCursorInfo();
  //       const strLen = doc.getValue().length;

  //       // console.log(line, start, end, type, ch, "ch---");

  //       // if (type === "field" && doc.getSelection().length < 2) {
  //       //   // 光标定位到最后位置时，如果最后内容为字段，则新增一个空格，并定位光标到空格后
  //       //   // 避免最后内容为字段时无法插入新内容问题
  //       //   if (strLen === ch) {
  //       //     edit.replaceSelection(
  //       //       " ",
  //       //       { line, ch: strLen },
  //       //       { line, ch: strLen + 1 }
  //       //     );
  //       //     doc.setCursor({ line, ch: ch + 1 });
  //       //   } else {
  //       //     isField = true;
  //       //     // 光标定位在字段上的时候，则选中整个字段
  //       //     doc.setSelection({ line, ch: start }, { line, ch: end });
  //       //   }
  //       // }
  //     });
  //     // 输入或粘贴时触发，删除内容不触发
  //     edit.on("inputRead", () => {
  //       // console.log(getCursorInfo(), 'v----')
  //       // 如果选中项为字段项，则不允许插入内容
  //       if (isField) {
  //         edit.undo();
  //       }
  //     });
  //     // 高度自适应，默认为3000
  //     edit.setSize("auto", "auto");

  //     // 不能在 "beforeChange" 事件的处理函数中做任何影响编辑器内容的操作
  //     edit.on("onBeforeChange", (et, change) => {
  //       // console.log(et, change, "---");
  //     });

  //     edit.on("change", (et, change) => {
  //       // console.log(et, change.text);
  //       // console.log(edit.somethingSelected(), '890')
  //       // console.log(isField, "isField");
  //       // console.log(et, change, "isField");
  //       // const doc = edit.getDoc();
  //       // const cur = doc.getCursor();
  //       // // cur.ch 光标所在位置
  //       // console.log(doc.getCursor(), "666");
  //       // console.log(edit.getTokenAt(cur))
  //     });

  //     editorRef.current = edit;

  //     // const doc = edit.getDoc();
  //     // doc.on("delete", (et, change) => {
  //     //   console.log(et, change, "delete");
  //     // });
  //     setInitValue(value);

  //     // CodeMirror 提供了一个静态方法来支持自定义 hint 功能
  //     // codemirror.registerHelper("hint", "custom", (editor, options) => {
  //     //   return { list: ["custom-hint", "abc"] };
  //     // });
  //   }
  //   init();
  //   return () => {
  //     // 销毁（否则会出现多个dom节点）
  //     if (current && current.children.length > 0) {
  //       // 解除事件绑定
  //       // editorRef.current.off()
  //       editorRef.current = null;
  //       current.innerHTML = "";
  //     }
  //   };
  // }, [
  //   value,
  //   fields,
  //   hints,
  //   hintsTables,
  //   getCursorInfo,
  //   setInitValue,
  // ]);

  return (
    <EditBox>
      <p>defaultValue:</p>
      <p>{defaultValue}</p>
      <div ref={boxRef}></div>
    </EditBox>
  );
}

// forwardRef 引用传递 通过useImperativeHandle导出信息指向父组件ref
export default forwardRef(CodeEdit);
