import { useEffect, useRef, useState, useCallback } from "react";
import { fabric } from "fabric";
import styled from "@emotion/styled";
import { Button } from "antd";
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
  const [canvas, setCanvas] = useState(null)
  // const [ratio, setRatio] = useState(1)
  const ratio = useRef(1)

  /** 
   * 以某点为中心点缩放画布
   * obj canvas对象
   * left 中心点横坐标
   * top 中心点纵坐标
   * r 缩放比例
   */
  const setZoomCanvas = useCallback((obj, left, top, r) => {
    const zoomPoint = new fabric.Point(left, top);
    obj.zoomToPoint(zoomPoint, r);
  }, [])

  const changeBoxSize = useCallback((obj, width, height) => {
    // 设置canvas宽高
    obj.setWidth(width)
    obj.setHeight(height)

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
  const setRelativePan = useCallback((obj, x, y) => {
    const point = new fabric.Point(x, y);
    obj.relativePan(point);
  }, [])

  // 初始化canvas
  const initCanvas = useCallback((obj, boxWidth, boxHeight) => {
    fabric.Image.fromURL(imgUrl, (img) => {
      const { width, height } = img
      // 以宽高比例较小值作为实际缩放比例
      let initRatio = Math.min(boxWidth / width, boxHeight / height);

      // 缩放比例最大为1，预留ratioStep为方便边缘操作
      if (initRatio >= 1) {
        initRatio = initRatio > 1 + ratioStep ? 1 : initRatio - ratioStep
      }
      if (initRatio < 1) {
        initRatio = initRatio - ratioStep > 0 ? initRatio - ratioStep : initRatio
      }

      img.set({
        // 禁用对象事件
        evented: false,
        // 对象是否可选择
        selectable: false
      })

      // 渲染图片
      obj.add(img)

      // 设置画布基于画布中心点缩放
      setZoomCanvas(obj, boxWidth / 2, boxHeight / 2, initRatio)

      // canvas 缩放及偏移信息
      const { viewportTransform } = obj

      // 缩放后的水平偏移
      const left = viewportTransform[4]

      // 缩放后的垂直偏移
      const top = viewportTransform[5]

      // 平移画布，使其在视觉上居中（这里的居中是基于画布的整体偏移，元素相对画布坐标并未改变）
      setRelativePan(obj, (boxWidth - width * initRatio) / 2 - left, (boxHeight - height * initRatio) / 2 - top)

      // 存储缩放比例
      ratio.current = initRatio
    })

  }, [setZoomCanvas, setRelativePan, imgUrl, ratioStep])

  const updateDraw = useCallback((obj) => {
    console.log(obj, 'oo')
    const { fill, width, height, left, top } = obj
    canvas.remove(obj)
    canvas.add(new fabric.Rect({ fill, width, height, left, top }))
  }, [canvas])

  // 画布事件设置
  const setCanvasEvents = useCallback(() => {
    if (!canvas) {
      return false
    }
    let start = null
    let tempRect = null
    canvas.on({
      // 鼠标滚动缩放
      "mouse:wheel": ({ e }) => {
        const { deltaY, offsetX, offsetY } = e;
        const r = ratio.current
        let nextRatio = deltaY > 0 ? r - ratioStep : r + ratioStep
        nextRatio = Math.max(ratioStep, nextRatio)
        // 设置画布基于画布中心点缩放
        setZoomCanvas(canvas, offsetX, offsetY, nextRatio)
        // setRatio(nextRatio)
        ratio.current = nextRatio
      },
      // 鼠标按下，
      "mouse:down": ({ e, target }) => {
        if (!target) {
          const { x, y } = canvas.getPointer(e);
          start = { x, y };
        }
      },
      "mouse:move": ({ e }) => {
        if (start) {
          const { x, y } = canvas.getPointer(e.e);
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
            canvas.add(tempRect)
          }
          if (tempRect) {
            tempRect.set({
              width,
              height,
              left: Math.min(x, sX),
              top: Math.min(y, sY),
            })
            canvas.renderAll();
          }
        }
      },
      "mouse:up": ({ e }) => {
        start = null
        updateDraw(tempRect)
        tempRect = null
      },
    })
  }, [canvas, ratioStep, setZoomCanvas, createLimit, updateDraw])

  useEffect(() => {
    const { offsetWidth = 300, offsetHeight = 300 } = canvasBox.current
    const canvasObj = new fabric.Canvas(canvasEle.current, {
      // 选中对象不会到最高层，按原层次摆放
      preserveObjectStacking: true,
      // 缩放对象是否基于对象中心点
      // centeredScaling: true,
    });

    // 设置canvas宽高及存储宽高信息
    changeBoxSize(canvasObj, offsetWidth, offsetHeight)

    // 存储canvas对象
    setCanvas(canvasObj)

    // 初始化画布
    initCanvas(canvasObj, offsetWidth, offsetHeight)

  }, [initCanvas, changeBoxSize])

  // 监听窗口大小改变，动态需改缩放比例
  useEffect(() => {
    const changeSize = debounce(() => {
      if (!canvas) {
        return false
      }
      const { width, height, docHeight } = boxSize
      // 这里不使用高度的原因是高度无法自适应改变，设置了高度后，再次缩小可能出现滚动条
      const { offsetWidth } = canvasBox.current

      // 当前可视区整体高度
      const currDocHeight = document.documentElement.clientHeight
      // 通过可视区变化百分比，动态计算改变后的高度
      const offsetHeight = height / docHeight * currDocHeight
      // 重置父级高度
      canvasBox.current.style.height = `${offsetHeight}px`

      // 设置canvas宽高及存储宽高信息
      changeBoxSize(canvas, offsetWidth, offsetHeight)

      // 偏移画布内容，使其相对位置保持不变
      setRelativePan(canvas, (offsetWidth - width) / 2, (offsetHeight - height) / 2)

    }, 500)
    window.addEventListener('resize', changeSize)
    return () => {
      window.removeEventListener('resize', changeSize)
    }
  }, [canvas, boxSize, changeBoxSize, setRelativePan])

  useEffect(() => {
    // 设置
    setCanvasEvents()
  }, [setCanvasEvents])

  // 点击放大缩小
  const changeRatio = (r) => {
    const temp = r > 0 ? r : ratioStep
    const { width, height } = boxSize
    // 设置画布基于画布中心点缩放
    setZoomCanvas(canvas, width / 2, height / 2, temp)
    // setRatio(temp)
    ratio.current = temp
  }

  return (
    <Sub>
      <Control>
        <Button onClick={() => changeRatio(ratio.current + ratioStep)} type="primary" shape="round" icon={<PlusCircleOutlined />} size="small">
          放大
        </Button>
        <RatioText>{parseInt(ratio.current * 100)}%</RatioText>
        <Button onClick={() => changeRatio(ratio.current - ratioStep)} type="primary" shape="round" icon={<MinusCircleOutlined />} size="small">
          缩小
        </Button>
      </Control>
      <Box ref={canvasBox}>
        <canvas ref={canvasEle}></canvas>
      </Box>
    </Sub>
  );
}

export default Fabric;
