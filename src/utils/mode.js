import CodeMirror from "codemirror";

/**
 * 设置高亮关键字
 * @param {Array} keywordList 关键字列表
 * @example ['abcd', {text: 'abcd', type: "atom", style: "atom" }]
 */
export function setMode(keywordList = []) {
  CodeMirror.defineMode("iapp", function (config, parserConfig) {
    return {
      startState: function () {
        return { context: 0 };
      },
      token: function (stream, state) {
        let ch = stream.next();
        if (stream.eatSpace()) {
          return null;
        }
        // 标记括号
        if (/[[\]{}(),;:.]/.test(ch)) {
          return "bracket";
        }
        if (stream.match(/\d+/)) {
          return "number";
        }
        stream.next();
        return null;
      },
      //   indent: function (state, textAfter) {},
    };
  });
  CodeMirror.defineMIME("text/x-iapp", "iapp");
}
