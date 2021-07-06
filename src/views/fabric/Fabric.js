import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styled from "@emotion/styled";
import { Button, Radio, InputNumber } from "antd";
// import logo from '@/assets/logo.svg'
import girl from '@/assets/girl.jpeg'


const Box = styled.div`
  background: #eee;
`;
const Control = styled.div`
  margin: 6px 0;
  background: #ccc;
  padding: 4px 10px;
`;
const Content = styled.div`
  background: #ddd;
  height: 300px;
`;

function Fabric () {
  const [drawType, setDrawType] = useState(1);
  const [tableCols, setTableCols] = useState(1);
  const [rect, setRect] = useState(null);
  const [line, setLine] = useState(null);
  const [radio, setRadio] = useState(1);
  const canvas = useRef();
  const add = () => {
    const r2 = new fabric.Rect({
      // 边框不缩放
      strokeUniform: true,
      stroke: "#000",
      strokeWidth: 4,
      left: 400, //距离画布左侧的距离，单位是像素
      top: 50, //距离画布上边的距离
      fill: "green", //填充的颜色
      width: 5, //方形的宽度
      height: 50, //方形的高度
      // lockScalingX: true, // 禁用水平缩放
      lockMovementY: true, // 禁用垂直移动
      lockScalingFlip: true, // 锁定翻转
      hasRotatingPoint: false,
      hasControls: false, // 是否显示控制点
      // hoverCursor: "pointer",
    });

    const r = new fabric.Rect({
      strokeUniform: true,
      stroke: "#000",
      strokeWidth: 4,
      left: 50, //距离画布左侧的距离，单位是像素
      top: 50, //距离画布上边的距离
      fill: "red", //填充的颜色
      width: 100, //方形的宽度
      height: 100, //方形的高度
      lockScalingFlip: true,
      // borderDashArray: [5],
    });
    const l = new fabric.Line([90, 50, 90, 150], {
      stroke: "green",
      strokeUniform: true,
      strokeWidth: 2,
      padding: 6,
      // cornerSize: 30
    });
    canvas.current.add(r);
    canvas.current.add(r2);
    canvas.current.add(l);
    setRect(r);
    setLine(l);
  };

  // const move = () => {
  //   rect.set({
  //     left: 200,
  //   });
  //   canvas.current.renderAll();
  // };

  useEffect(() => {
    const c = new fabric.Canvas("main", {
      // 选中对象不会到最高层，按原层次摆放
      preserveObjectStacking: true,
      centeredScaling: true
    });
    fabric.Image.fromURL(girl, (img, err) => {
      const r = Math.min(1, c.width / img.width, c.height / img.height)
      img.set({
        // 通过scale来设置图片大小，这里设置和画布一样大
        scaleX: r,
        scaleY: r,
        originX: "center", 
        originY: "center"
      });
      setRadio(r)
      c.add(img)
      // 设置背景
      // c.setBackgroundImage(img, c.renderAll.bind(c));
      // const point = new fabric.Point(c.width / 2, c.height / 2); // 中心点缩放
      // c.zoomToPoint(point, r);
      // c.renderAll();
    })



    canvas.current = c;
    c.on("mouse:down", ({ pointer, target }) => {
      if (!target) {
        // 新增

        console.log(pointer, target);
      }
    });
    // c.clipTo = function (ctx) {
    //   ctx.arc(100, 100, 200, 0, Math.PI*2, true);
    // }
    // add();
  }, []);

  const small = () => {
    setRadio(radio - 0.1)
    canvas.current.setZoom(radio - 0.1, {x: 300, y: 300})

  }
  const big = () => {
    setRadio(radio + 0.1)
    canvas.current.setZoom(radio + 0.1, {x: 300, y: 300})
  }
  return (
    <Box>
      <Control>
        <Radio.Group
          onChange={(e) => setDrawType(e.target.value)}
          value={drawType}
        >
          <Radio value={1}>框选</Radio>
          <Radio value={2}>表格</Radio>
        </Radio.Group>
        <InputNumber
          min={1}
          value={tableCols}
          onChange={(e) => setTableCols(e)}
        ></InputNumber>
        列
        <Button onClick={big}>放大</Button>
        {parseInt(radio * 100)}%
        <Button type="dashed" onClick={small} >缩小</Button>
      </Control>
      <Content>
        <canvas id="main" height="300" width="600"></canvas>
      </Content>
    </Box>
  );
}

// https://www.cnblogs.com/rachelch/p/14172947.html
// https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/704333/#outline__4_8
export default Fabric;


// [14款web前端常用的富文本编辑器插件](https://cloud.tencent.com/developer/article/1747244)

// https://xdsoft.net/jodit/