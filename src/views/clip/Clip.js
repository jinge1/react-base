import { useEffect, useRef, useState, useCallback } from "react";
import { fabric } from "fabric";
import { Button, Modal, Tooltip } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  UndoOutlined,
  RedoOutlined,
  DragOutlined,
  RadiusSettingOutlined
} from "@ant-design/icons";
import mei from "@/assets/mei.jpeg";
import {
  Page,
  Title,
  Desc,
  List,
  Item,
  ItemTop,
  CanvasBox,
  CodeBox,
  IconBox,
  Controler
} from './style'

const BoxImgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC'

const defaultRectInfo = {
  width: 100,
  height: 100,
  left: 0,
  top: 0,
  fill: "orange",
};

/**
 * 
 * @param {*} left : ;
 * @param {*} top 
 * @param {*} info 
 */
function getAbsolutePosition(left, top, info){
  const {width, height} = info
  return {
    left: left + width/2, 
    top: top + height/2
  }
}


function ClipItem() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resultJson, setResultJson] = useState("");
  const [actionType, setActionType] = useState(1);
  const [clipPosition, setClipPosition] = useState({});
  const list = useRef(null);
  const canvasEle = useRef(null);
  const fabricList = useRef([]);
  const ratioStep = 0.05;
  const activeRef = useRef(null);
  const clipRef = useRef(null);
  const fabricRef = useRef(null);
  //   const createLimit = 10;

  /**
   * 以某点为中心点缩放画布
   * obj canvas对象
   * left 中心点横坐标
   * top 中心点纵坐标
   * r 缩放比例
   */
  const setCanvasZoom = useCallback((fabricObj, left, top, r) => {
    const zoomPoint = new fabric.Point(left, top);
    fabricObj.zoomToPoint(zoomPoint, r);
  }, []);

  // 生成fabric矩形
  const getRect = useCallback((info = {}) => {
    return new fabric.Rect({
      ...defaultRectInfo,
      ...info,
    });
  }, []);

  // 生成fabric图片
  const getImg = useCallback((url) => {
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(url, (img) => {
        resolve(img);
      });
    });
  }, []);

  // 缩放设置
  const changeSize = useCallback((index, type = 1) => {
    const { current } = fabricRef;
    const width = current.getWidth();
    const height = current.getHeight();
    const zoom = current.getZoom() + type * ratioStep;
    const zoomPoint = new fabric.Point(width / 2, height / 2);
    current.zoomToPoint(zoomPoint, zoom);
  }, []);

  // 缩放缩放角度
  const changeAngle = useCallback((index, type = 1) => {
    const { current } = fabricRef;
    const eles = current.getObjects();
    console.log(eles, 'eles---')
    eles.forEach((ele) => {
      if(ele === activeRef.current){
        return false
      }
      const { angle = 0 } = ele;
      let nextAngle = angle + 90 * type;
      if (nextAngle > 360) {
        nextAngle = nextAngle - 360;
      }
      if (nextAngle < 0) {
        nextAngle = 360 + nextAngle;
      }
      ele.set({
        angle: nextAngle,
      });
    });
    current.renderAll();
  }, []);

  const updateClip = useCallback(() => {
    const { left, top, scaleX, scaleY } = activeRef.current;
    clipRef.current.set({
      left: left / 2,
      top: top / 2,
      scaleX,
      scaleY,
    });
    fabricRef.current.renderAll();
  }, []);

  const changeObj = useCallback(()=> {
    const { left, top, scaleX, scaleY } = activeRef.current;
    clipRef.current.set({
      left, 
      top,
      scaleX,
      scaleY
    });
    
    // fabricRef.current.renderAll();
  }, [])

  useEffect(() => {
    const ele = canvasEle.current;
    const box = ele.parentNode;

    // 初始化画布
    const fabricObj = new fabric.Canvas(ele, {
      height: box.offsetHeight,
      centeredRotation: true,
    });

    fabricRef.current = fabricObj;

    fabricObj.on({
      "object:scaling": changeObj,
      "object:moving": changeObj,
    });

    const initClip = {
      width: 200,
      height: 100,
      left: 100,
      top: 50,
    }


    // 初始化渲染
    const initDraw = async () => {
      const img = await getImg(mei);
      const { width, height } = img;
      // 插入图片
      img.set({
        ...getAbsolutePosition(0, 0, {width, height}),
        evented: false,
        originX: "center",  // 围绕自身中心点旋转
        originY: "center",
      });
      fabricObj.add(img);

      // 遮罩图层
      const background = new fabric.Rect({
        width,
        height,
        ...getAbsolutePosition(0, 0, {width, height}),
        originX: "center",  // 围绕自身中心点旋转
        originY: "center",
        evented: false,
        fill: "rgba(0,0,0,0.5)",
      })

      // 遮罩框
      const {width: clipWidth, height: clipHeight, left: clipLeft, top: clipTop} = initClip
      const clip = new fabric.Rect({
        width: clipWidth,
        height: clipHeight,
        left: clipLeft,
        top: clipTop,
        // 裁剪颠倒
        inverted: true,
        // clipPath从对象的中心开始定位，对象originX和originY不起任何作用
        // absolutePositioned不是相对于对象的中心，而是仅仅定位在画布上
        absolutePositioned: true,
      })
      clipRef.current = clip;
      // 遮罩绑定蒙版
      background.clipPath = clip
      // 加入遮罩层
      fabricObj.add(background);

      // 活动元素（不能直接操作遮罩层，通过该互动元素间接操作）
      const active = new fabric.Rect({
        width: clipWidth,
        height: clipHeight,
        left: clipLeft,
        top: clipTop,
        fill: "rgba(255, 0, 0, 0)",
      })
      activeRef.current = active;
      fabricObj.add(active);
    };

    // 页面大小改变的时候，重置canvas宽度
    const resize = () => {
      const boxWidth = box.offsetWidth;
      fabricObj.setWidth(boxWidth);
    };

    const setBackgroundImage = async (url)=> {
      const img = await getImg(url);
      const { width, height } = img;
      fabricObj.setBackgroundImage(img, fabricObj.renderAll.bind(fabricObj), {repeat: 'repeat', width: 300, height: 300, scaleX: 1, scaleY: 1})
    }

    // 初始化生成fabric对象列表，高度统一为父级节点高度，宽度随页面宽度自适应
    const init = () => {
      setBackgroundImage(BoxImgSrc)
      initDraw();
      resize();
    };

    // 初始化页面
    init();

    window.addEventListener("resize", resize);
    return () => {
      // 组件卸载前移除事件
      window.removeEventListener("resize", resize);
    };
  }, [getRect, getImg, setCanvasZoom, clipPosition, updateClip, changeObj]);

  // 获取canvas对象位置信息
  const getInfo = (index) => {
    const { current } = fabricList;
    const { objects } = current[index].toJSON();
    setResultJson(
      JSON.stringify(
        objects.map(
          ({
            type,
            left,
            top,
            width,
            height,
            scaleX,
            scaleY,
            angle,
            originX,
            originY,
          }) => ({
            type,
            left,
            top,
            width,
            height,
            scaleX,
            scaleY,
            angle,
            originX,
            originY,
          })
        ),
        null,
        2
      )
    );
    setIsModalVisible(true);
  };

  const changePic = () => {
    // clipRef.current.set({
    //   left: 200
    // })
    // // fabricRef.current = fabricObj
    // // clipRef.current = active
    // fabricRef.current.renderAll()
    // console.log('9876---')
  };

  const getActionStyle = (type)=> actionType === type ? {style: {color: '#1890ff'}} : {}
  return (
    <Page>
      <Desc>
        <Title>fabric简介</Title>
        <Desc>
          <p>类似于jQuery替代原生javascript操作Dom。</p>
          <p>
            Fabric.js为canvas提供所缺少的对象模型，可以轻松实现不同对象添加，移动，旋转，分组等操作。
          </p>
        </Desc>
      </Desc>
      <List ref={list}>
        <Item>
          <ItemTop>
            <p onClick={changePic}>裁剪图片：</p>
            <Controler>
              <IconBox>
                <Tooltip placement="top" title="移动背景图片">
                  <DragOutlined {...getActionStyle(1)} onClick={()=> setActionType(1)}/>
                </Tooltip>
              </IconBox>
              <IconBox>
                <Tooltip placement="top" title="重新框选或操作框选区">
                  <RadiusSettingOutlined {...getActionStyle(2)} onClick={()=> setActionType(2)} />
                </Tooltip>
              </IconBox>
              
              <IconBox>
                <PlusCircleOutlined onClick={() => changeSize(2, 1)} />
              </IconBox>
              <IconBox>
                <MinusCircleOutlined onClick={() => changeSize(2, -1)} />
              </IconBox>
              <IconBox>
                <UndoOutlined onClick={() => changeAngle(2, -1)} />
              </IconBox>
              <IconBox>
                <RedoOutlined onClick={() => changeAngle(2, 1)} />
              </IconBox>
              <Button type="primary" onClick={() => getInfo(2)}>
                裁剪后
              </Button>
            </Controler>
          </ItemTop>
          <CanvasBox height={330} style={{backgroundImage: BoxImgSrc}}>
            <canvas ref={canvasEle}></canvas>
          </CanvasBox>
        </Item>
      </List>
      <Modal
        transition={false}
        title="元素位置信息"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[]}
      >
        <CodeBox>
          <code>{resultJson}</code>
        </CodeBox>
      </Modal>
    </Page>
  );
}
export default ClipItem;
