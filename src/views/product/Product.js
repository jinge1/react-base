import { useState } from "react";
import { MathComponent } from "mathjax-react";
import { Input, Button } from "antd";
const { TextArea } = Input;

// const text = `
// \begin{array}{c|c|c}
// \text { 序号 } & \text { 检验项目 } & \text { 量具名称及编号 } \\
// \hline \text { (1) } & \text { 外观/粗糙度 } & \text { 目测/样板 } \\
// \hline \text { (2) } & \varnothing 24.5_{-0.2}^{+0.3} & \text { 塞规 } / 311927 \\
// \hline \text { (3) } & \text { M24*1-6G } & \text { 螺纹塞规 } / 330408 \\
// \hline \text { (4) } & \varnothing 16.5 \pm 0.3 & \text { 游标卡尺 } \\
// \hline \text { (5) } & \text { 小径 } & \text { 塞规/311929 } \\
// \hline \text { (6) } & 15^{\circ} \pm 1^{\circ} & \text { 三坐标 } \\
// \hline \text { (7) } & 4.5 \text { Min } & \text { 台阶规 } / 380003 \\
// \hline \text { (8) } & 1.5 & \text { 剖检 } \\
// \hline \text { (9) } & 5.5 & \text { 剖检 } \\
// \hline \text { (10) } & 4_{0}^{+0.2} & \text { 剖检 } \\
// \hline
// \end{array}
// `;
// https://www.npmjs.com/package/mathjax-react

function Product() {
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const onChange = ({ target: { value } }) => {
    setText(value);
  };
  const showText = () => {
    setContent(text);
  };

  return (
    <>
      <TextArea
        value={text}
        onChange={onChange}
        placeholder="Controlled autosize"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <MathComponent tex={content} />
      {/* <MathComponent tex={"\varnothing 24.5_{-0.2}^{+0.3}"} />; */}
      <Button type="primary" onClick={showText}>
        Primary Button
      </Button>
    </>
  );
}
export default Product;
