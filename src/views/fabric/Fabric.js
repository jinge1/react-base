import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import { fabric } from "fabric";
import styled from "@emotion/styled";
import { Button, Radio } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import girl from "@/assets/girl.jpeg";
// import screen from "@/assets/screen.jpg";
// import girl from "@/assets/mei.jpeg";

// 防抖函数
function debounce (fn, delay) {
  let timmer = null
  return (...args) => {
    if (timmer) {
      clearTimeout(timmer)
    }
    timmer = setTimeout(() => fn(...args), delay)
  }
}

const Sub = styled.div`
  background: #eee;
  height: 100%;
  display: flex;
  flex-flow: column;
`;
const Control = styled.div`
  margin: 6px 0;
  background: #ccc;
  padding: 10px 30px;
  display: flex;
`;
const Box = styled.div`
  background: #ddd;
  flex: 1;
  overflow: hidden;
`;

const RatioText = styled.span`
  width: 60px;
  text-align: center;
  color: green;
`;

function Fabric (props) {
  const { ratioStep = 0.05, imgUrl = girl, createLimit = 10 } = props
  const canvasBox = useRef(null)
  const canvasEle = useRef(null)
  const [boxSize, setBoxSize] = useState({})
  const [clipRect, setClipRect] = useState(null)
  const [ratio, setRatio] = useState(1)
  const [moveType, setMoveType] = useState('1')
  const canvasRef = useRef(null)

  /** 
   * 以某点为中心点缩放画布
   * obj canvas对象
   * left 中心点横坐标
   * top 中心点纵坐标
   * r 缩放比例
   */
  const setCanvasZoom = useCallback((left, top, r) => {
    const { current } = canvasRef
    const zoomPoint = new fabric.Point(left, top);
    current.zoomToPoint(zoomPoint, r);
  }, [])

  const changeBoxSize = useCallback((width, height) => {
    const { current } = canvasRef
    // 设置canvas宽高
    current.setWidth(width)
    current.setHeight(height)

    // 存储当前可视区整体高度
    const docHeight = document.documentElement.clientHeight
    // 存储容器宽高
    setBoxSize({
      width: width,
      height: height,
      // 存储当前可视区整体高度
      docHeight
    })
  }, [])

  /**
   * relativePan 平移画布（画布对象相对位置不变，后续获取画布对象位置信息不用计算）
   * x 水平偏移值(相对于当前的增减值)
   * y 垂直偏移值(相对于当前的增减值)
   */
  const setRelativePan = useCallback((x, y) => {
    const { current } = canvasRef
    const point = new fabric.Point(x, y);
    current.relativePan(point);
  }, [])

  // 获取初始缩放比例
  const getInitRatio = useCallback((xRatio, yRatio) => {
    // 以宽高比例较小值作为实际缩放比例
    let initRatio = Math.min(xRatio, yRatio);
    // 缩放比例最大为1，预留ratioStep为方便边缘操作
    if (initRatio >= 1) {
      initRatio = initRatio > 1 + ratioStep ? 1 : initRatio - ratioStep
    }
    if (initRatio < 1) {
      initRatio = initRatio - ratioStep > 0 ? initRatio - ratioStep : initRatio
    }
    return initRatio
  }, [ratioStep])

  const updateDraw = useCallback((obj) => {
    const { current } = canvasRef
    obj.clone((o) => {
      const pre = current.getObjects().find(({ showId: id }) => id)
      const showId = Date.now()
      o.set({ showId })
      // console.log(clipRect, 'clipRect')
      // const { width, height, left, top } = o
      // if (clipRect) {
      //   clipRect.set({
      //     width, height, left, top
      //   })
      // }

      // current.add(o)
      // current.remove(obj)
      if (pre) {
        // 删除前一个
        // current.remove(pre)
      }
      current.renderAll();
    })
  }, [])

  console.log('aa')
  // 画布事件设置
  const setCanvasEvents = useCallback(() => {
    let start = null
    let tempRect = null
    const { current } = canvasRef
    current.on({
      // 鼠标滚动缩放
      "mouse:wheel": ({ e }) => {
        const { deltaY, offsetX, offsetY } = e;
        const r = current.getZoom()
        let nextRatio = deltaY > 0 ? r - ratioStep : r + ratioStep
        nextRatio = Math.max(ratioStep, nextRatio)
        // 设置画布基于画布中心点缩放
        setCanvasZoom(offsetX, offsetY, nextRatio)
        // setRatio(nextRatio)
        // ratio.current = nextRatio
        setRatio(nextRatio)
      },
      // 鼠标按下，
      "mouse:down": ({ e, target }) => {
        if (!target) {
          const { x, y } = current.getPointer(e);
          start = { x, y };
        }
      },
      "mouse:move": ({ e }) => {
        if (start) {
          const { x, y } = current.getPointer(e.e);
          const { x: sX, y: sY } = start;
          const width = Math.abs(x - sX);
          const height = Math.abs(y - sY);
          if (
            !tempRect &&
            width > createLimit &&
            height > createLimit
          ) {
            tempRect = new fabric.Rect({
              fill: "rgba(238, 122, 233, 0.5)",
              width,
              height,
              left: Math.min(x, sX),
              top: Math.min(y, sY),
            })
            current.add(tempRect)
          }
          if (tempRect) {
            tempRect.set({
              width,
              height,
              left: Math.min(x, sX),
              top: Math.min(y, sY),
              // 禁用对象事件
              evented: false,
              // 对象是否可选择
              selectable: false
            })
            current.renderAll();
          }
        }
      },
      "mouse:up": ({ e }) => {
        start = null
        if (tempRect) {
          updateDraw(tempRect)
          tempRect = null
        }
      },
    })
  }, [ratioStep, setCanvasZoom, createLimit, updateDraw])

  // 设置遮罩区域
  const setClipPath = useCallback((info) => {
    const { current } = canvasRef
    const bgRect = new fabric.Rect({ fill: 'rgba(0,0,0,0.5)', ...info })
    bgRect.set({
      // 禁用对象事件
      evented: false,
      // 对象是否可选择
      selectable: false
    })
    const pathRect = new fabric.Rect({
      width: 300,
      height: 300,
      left: 100,
      top: 100,
      // 裁剪颠倒
      inverted: true,
      // clipPath从对象的中心开始定位，对象originX和originY不起任何作用
      // absolutePositioned不是相对于对象的中心，而是仅仅定位在画布上
      absolutePositioned: true,
    });
    bgRect.clipPath = pathRect
    current.add(bgRect)
    setClipRect(pathRect)
  }, [])

  useEffect(() => {
    const { offsetWidth = 300, offsetHeight = 300 } = canvasBox.current
    const canvasObj = new fabric.Canvas(canvasEle.current, {
      // 选中对象不会到最高层，按原层次摆放
      preserveObjectStacking: true,
      // 缩放对象是否基于对象中心点
      // centeredScaling: true,
      uniformScaling: false,
      perPixelTargetFind: false
    });
    canvasRef.current = canvasObj
    // 设置canvas宽高及存储宽高信息
    changeBoxSize(offsetWidth, offsetHeight)

    fabric.Image.fromURL(imgUrl, (img) => {
      const { width, height } = img
      const initRatio = getInitRatio(offsetWidth / width, offsetHeight / height)
      img.set({
        // 禁用对象事件
        evented: false,
        // 对象是否可选择
        selectable: false
      })
      // 渲染图片
      canvasObj.add(img)
      setClipPath({
        width: offsetWidth / initRatio,
        height: offsetHeight / initRatio,
        left: 0,
        top: 0
      })
      setCanvasZoom(offsetWidth / 2, offsetHeight / 2, initRatio)
      // canvas 缩放及偏移信息
      const { viewportTransform } = canvasObj

      // 缩放后的水平偏移
      const left = viewportTransform[4]

      // 缩放后的垂直偏移
      const top = viewportTransform[5]

      // 平移画布，使其在视觉上居中（这里的居中是基于画布的整体偏移，元素相对画布坐标并未改变）
      setRelativePan((offsetWidth - width * initRatio) / 2 - left, (offsetHeight - height * initRatio) / 2 - top)

      setRatio(initRatio)
      setCanvasEvents()
    })
  }, [changeBoxSize, getInitRatio, imgUrl, setClipPath, setCanvasZoom, setRelativePan, setRatio, setCanvasEvents])

  // 点击放大缩小
  const changeRatio = (r) => {
    const temp = r > 0 ? r : ratioStep
    const { width, height } = boxSize
    // 设置画布基于画布中心点缩放
    setCanvasZoom(width / 2, height / 2, temp)
    setRatio(temp)
  }

  const changeRadio = ({ target }) => {
    console.log(target.value, 'eee')
  }

  return (
    <Sub>
      <Control>
        <Button onClick={() => changeRatio(ratio + ratioStep)} type="primary" shape="round" icon={<PlusCircleOutlined />} size="small">
          放大
        </Button>
        <RatioText>{parseInt(ratio * 100)}%</RatioText>
        <Button onClick={() => changeRatio(ratio - ratioStep)} type="primary" shape="round" icon={<MinusCircleOutlined />} size="small">
          缩小
        </Button>
        <Radio.Group style={{ marginLeft: 20 }} defaultValue={moveType} onChange={({ target }) => setMoveType(target.value)} buttonStyle="solid">
          <Radio.Button value="1">create</Radio.Button>
          <Radio.Button value="2">move</Radio.Button>
        </Radio.Group>
      </Control>
      <Box ref={canvasBox}>
        <canvas ref={canvasEle}></canvas>
      </Box>
    </Sub>
  );
}

export default Fabric;
