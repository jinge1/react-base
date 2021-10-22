/**
 * 关键词提示
 */

 import CodeMirror from "codemirror";

 /**
  * 设置提示关键词
  * @param {array} keywordList 提示关键词列表
  * @example ['abc()', 'abcd()']
  */
 export function setHint(keywordList = []) {
   const { Pos } = CodeMirror;
   function scriptHint(editor, keywords, getToken, options) {
     // Find the token at the cursor
     var cur = editor.getCursor(),
       token = getToken(editor, cur);
     // 判断类型，如果已经是正确类型，则不显示提醒
     // 避免选中某个关键子中间时还出现提醒
     if (token.type !== "error") {
       return;
     }
 
     if (/\b(?:string|comment)\b/.test(token.type)) return;
     var innerMode = CodeMirror.innerMode(editor.getMode(), token.state);
     if (innerMode.mode.helperType === "json") return;
     token.state = innerMode.state;
 
     // If it's not a 'word-style' token, ignore the token.
     if (!/^[\w$_]*$/.test(token.string)) {
       token = {
         start: cur.ch,
         end: cur.ch,
         string: "",
         state: token.state,
         type: token.string == "." ? "property" : null,
       };
     } else if (token.end > cur.ch) {
       token.end = cur.ch;
       token.string = token.string.slice(0, cur.ch - token.start);
     }
 
     return {
       list: getCompletions(token, keywords, options),
       from: Pos(cur.line, token.start),
       to: Pos(cur.line, token.end),
     };
   }
 
  //  const tables = {
  //    users: ["name", "score", "birthDate"],
  //  };
  // console.log(keywordList, 'keywordList---keywordList')
 
   function javascriptHint(editor, options) {
     return scriptHint(
       editor,
       // javascriptKeywords,
       keywordList,
       // tables,
       (e, cur) => {
         return e.getTokenAt(cur);
       },
       options
     );
   }
 
   CodeMirror.registerHelper("hint", "javascript", javascriptHint);
 
   function getCompletions(token, keywords) {
     const { string: start } = token;
     // 输入内容为空时不提醒
     if (typeof start === "string" && start.trim() === "") {
       return [];
     }
     return keywords.filter((str) => str.lastIndexOf(start, 0) == 0);
   }
 }
 