import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styled from "@emotion/styled";
import { Button, Radio, InputNumber } from "antd";
// import logo from '@/assets/logo.svg'
// import girl from "@/assets/girl.jpeg";
import screen from "@/assets/screen.jpg";

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
  /* height: 300px; */
`;

function Fabric() {
  const [drawType, setDrawType] = useState(1);
  const [tableCols, setTableCols] = useState(1);
  const [pathObj, setPathObj] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [imgObj, setImgObj] = useState(null);
  // const canvas = useRef();
  // const add = () => {
  //   // const r2 = new fabric.Rect({
  //   //   // 边框不缩放
  //   //   strokeUniform: true,
  //   //   stroke: "#000",
  //   //   strokeWidth: 4,
  //   //   left: 400, //距离画布左侧的距离，单位是像素
  //   //   top: 50, //距离画布上边的距离
  //   //   fill: "green", //填充的颜色
  //   //   width: 5, //方形的宽度
  //   //   height: 50, //方形的高度
  //   //   // lockScalingX: true, // 禁用水平缩放
  //   //   // lockMovementY: true, // 禁用垂直移动
  //   //   // lockScalingFlip: true, // 锁定翻转
  //   //   // hasRotatingPoint: false,
  //   //   // hasControls: false, // 是否显示控制点
  //   //   // hoverCursor: "pointer",
  //   // });
  //   // const r = new fabric.Rect({
  //   //   strokeUniform: true,
  //   //   stroke: "#000",
  //   //   strokeWidth: 4,
  //   //   left: 50, //距离画布左侧的距离，单位是像素
  //   //   top: 20, //距离画布上边的距离
  //   //   fill: "red", //填充的颜色
  //   //   width: 500, //方形的宽度
  //   //   height: 250, //方形的高度
  //   //   lockScalingFlip: true
  //   //   // borderDashArray: [5],
  //   // });
  //   // const l = new fabric.Line([90, 50, 90, 150], {
  //   //   stroke: "green",
  //   //   strokeUniform: true,
  //   //   strokeWidth: 2,
  //   //   padding: 6,
  //   //   // cornerSize: 30
  //   // });
  //   // canvas.current.add(r);
  //   // canvas.current.add(r2);
  //   // canvas.current.add(l);
  //   // setRect(r);
  //   // setLine(l);
  // };

  // const move = () => {
  //   rect.set({
  //     left: 200,
  //   });
  //   canvas.current.renderAll();
  // };

  // useEffect(() => {
  //   const c = new fabric.Canvas("main", {
  //     // 选中对象不会到最高层，按原层次摆放
  //     preserveObjectStacking: true,
  //   });
  //   fabric.Image.fromURL(screen, (img, err) => {
  //     img.set({
  //       // 通过scale来设置图片大小，这里设置和画布一样大
  //       scaleX: c.width / img.width,
  //       scaleY: c.height / img.height
  //     });

  //     // 设置背景
  //     c.setBackgroundImage(img, c.renderAll.bind(c));
  //     // add();
  //     // c.setHeight(img.width);
  //     // c.setWidth(img.height);
  //     c.renderAll();
  //   });
  // useEffect(() => {
  //   var canvas = new fabric.Canvas("main");
  //   canvas.controlsAboveOverlay = true;
  //   var clipPath = new fabric.Rect({
  //     width: 100,
  //     height: 100,
  //     top: 0,
  //     left: 0,
  //   });
  //   var group = new fabric.Group(
  //     [
  //       new fabric.Rect({ width: 100, height: 100, fill: "red" }),
  //       new fabric.Rect({ width: 100, height: 100, fill: "yellow", left: 100 }),
  //       new fabric.Rect({ width: 100, height: 100, fill: "blue", top: 100 }),
  //       new fabric.Rect({
  //         width: 100,
  //         height: 100,
  //         fill: "green",
  //         left: 100,
  //         top: 100,
  //       }),
  //     ],
  //     {
  //       scaleX: 1.5,
  //     }
  //   );
  //   canvas.clipPath = clipPath;
  //   canvas.add(group);
  //   setTimeout(() => {
  //     clipPath.set({ left: 150 });
  //     canvas.renderAll()
  //   }, 1000);
  // }, []);

  useEffect(() => {
    const c = new fabric.Canvas("main", {
      // 选中对象不会到最高层，按原层次摆放
      preserveObjectStacking: true,
      centeredScaling: true
    });
    // c.controlsAboveOverlay = true;
    fabric.Image.fromURL(screen, (img, err) => {
      const { width, height } = img;
      const cWidth = c.getWidth();
      const cHeight = c.getHeight();
      const radio = Math.min(cWidth / width, cHeight / height);
      img.set({
        // 通过scale来设置图片大小，这里设置和画布一样大
        scaleX: radio,
        scaleY: radio,
        selectable: false,
      });

      const rect = new fabric.Rect({
        width: cWidth,
        height: cHeight,
        left: 0,
        top: 0,
        fill: "rgba(0, 0, 0, 0.6)",
      });
      rect.set({
        selectable: false,
      });

      const pathRect = new fabric.Rect({
        width: 400,
        height: 200,
        left: -200,
        top: -200,
      });
      // rect.clipPath = pathRect;

      c.add(img);
      c.add(rect);

      img.clone((img2) => {
        img2.set({
          selectable: false,
        });
        img2.clipPath = pathRect;
        c.add(img2);
        setImgObj(img2);

        setTimeout(() => {
          console.log(12345)
          pathRect.set({
            left: 300,
          });
          c.renderAll();
        }, 1000);
        // pathRect.set({
        //   left: 100,
        // });
        setImgObj(img2)
        c.renderAll();
        setPathObj(pathRect);
      });
      c.renderAll();
      setCanvas(c);
     

      // 设置背景
      // c.setBackgroundImage(img, c.renderAll.bind(c));
      // add();
      // c.setHeight(img.width);
      // c.setWidth(img.height);
      
    });

    // canvas.current = c;

    // c.clipTo = (ctx) => {
    //   ctx.arc(100, 100, 200, 0, Math.PI * 2, true);
    // };
    // c.on("mouse:down", ({ pointer, target }) => {
    //   if (!target) {
    //     // 新增

    //     console.log(pointer, target);
    //   }
    // });
    // c.clipTo = function (ctx) {
    //   ctx.arc(100, 100, 200, 0, Math.PI*2, true);
    // }
    // add();
  }, []);

  const small = () => {
    console.log(pathObj, '999---', canvas)
    pathObj.set({
      left: 300,
      width: 300,
      height: 300
    });
    canvas.remove(imgObj)
    canvas.renderAll();
  };
  const big = () => {
    // const p = new fabric.Rect({
    //   width: 100,
    //   height: 200,
    //   left: 100,
    //   top: 100,
    // });
    // imgObj.clipPath = p;
    // canvas.renderAll();
    // console.log("bbbbb---");
  };

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
        列<Button onClick={big}>放大</Button>
        <Button type="dashed" onClick={small}>
          缩小
        </Button>
      </Control>
      <Content>
        <canvas id="main" height="360" width="800"></canvas>
      </Content>
    </Box>
  );
}

// https://www.cnblogs.com/rachelch/p/14172947.html
// https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/704333/#outline__4_8
export default Fabric;

// [14款web前端常用的富文本编辑器插件](https://cloud.tencent.com/developer/article/1747244)

// https://xdsoft.net/jodit/
