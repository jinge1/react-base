import styled from "@emotion/styled";
import { useEffect, useRef, useState, useCallback } from "react";
import { fabric } from "fabric";
import { Button, Modal } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import mei from "@/assets/mei.jpeg";

const Page = styled.div`
  padding: 20px;
  p {
    margin: 0 0 10px 0;
    padding: 0;
  }
`;
const Title = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
`;
const Desc = styled.div``;
const List = styled.div``;
const Item = styled.div`
  box-shadow: 0 0 10px #ccc;
  margin-bottom: 10px;
`;
const ItemTop = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
const CanvasBox = styled.div`
  height: ${(props) => props.height}px;
  overflow: hidden;
`;
const CodeBox = styled.div`
  max-height: 300px;
  overflow: auto;
  background: #e1e1e1;
  code {
    white-space: break-spaces;
  }
`;
const IconBox = styled.span`
  font-size: 22px;
  margin-right: 20px;
`;

const defaultRectInfo = {
  width: 100,
  height: 100,
  left: 0,
  top: 0,
  fill: "orange",
};

function ClipItem() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resultJson, setResultJson] = useState("");
  const [clipPosition, setClipPosition] = useState({
    width: 200,
    height: 100,
    left: 100,
    top: 50,
  });
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
  const getImg = useCallback((url, info = {}) => {
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(url, (img) => {
        if (Object.keys(info).length > 0) {
          img.set(info);
        }
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
    eles.forEach((ele) => {
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

  useEffect(() => {
    const ele = canvasEle.current;
    const box = ele.parentNode;
    const fabricObj = new fabric.Canvas(ele, {
      height: box.offsetHeight,
      // centeredRotation: true,
    });
    // 页面大小改变的时候，重置canvas宽度
    const resize = () => {
      const boxWidth = box.offsetWidth;
      fabricObj.setWidth(boxWidth);
    };

    /**
     * 获取裁剪位置信息
     * @param {number} type 1 裁剪区 2 拖拽对象
     * @param {*} clipInfo
     * @param {*} imgInfo
     * @returns
     */
    const getClipPosition = (type, clipInfo, imgInfo) => {
      const { width, height } = imgInfo;
      const { width: cWidth, height: cHeight, left, top } = clipInfo;
      if (type === 1) {
        return {
          ...clipInfo,
          left: -width / 2 + left,
          top: -height / 2 + top,
        };
      }
      return {
        ...clipInfo,
        left: cWidth / 2 + left,
        top: cHeight / 2 + top,
      };
    };

    // 初始化渲染
    const initDraw = async () => {
      const img = await getImg(mei);
      const { width, height } = img;
      const rect = getRect({
        width,
        height,
        fill: "rgba(0,0,0,0.5)",
      });
      const clip = getRect({
        ...getClipPosition(1, clipPosition, { width, height }),
        // 裁剪颠倒
        inverted: true,
        // clipPath从对象的中心开始定位，对象originX和originY不起任何作用
        // absolutePositioned不是相对于对象的中心，而是仅仅定位在画布上
        absolutePositioned: true,
      });
      const active = getRect({
        ...getClipPosition(2, clipPosition, { width, height }),
        originX: "center",
        originY: "center",
        fill: "rgba(255, 0, 0, 0.5)",
      });
      rect.clipPath = clip;
      img.set({
        evented: false,
      });
      rect.set({
        evented: false,
      });
      // const group = new fabric.Group([img, rect], {
      //   left: width / 2,
      //   top: height / 2,
      //   originX: "center",
      //   originY: "center",
      //   // 禁用对象事件
      //   evented: false,
      //   // 对象是否可选择
      //   selectable: false,
      //   // 操作旋转控制点时候，旋转中心点是自身中心，还是自身左上角
      //   // 该菜蔬动态设置angle无效
      //   // centeredRotation: true,
      // });

      // let showId = ''
      fabricObj.add(img);
      fabricObj.add(rect);
      // fabricObj.add(group);
      fabricObj.add(active);
      fabricRef.current = fabricObj;
      activeRef.current = active;
      clipRef.current = clip;
      fabricObj.on({
        "object:scaling": updateClip,
        "object:moving": updateClip,
      });
    };

    // 初始化生成fabric对象列表，高度统一为父级节点高度，宽度随页面宽度自适应
    const init = () => {
      initDraw();
      resize();
    };
    init();
    window.addEventListener("resize", resize);
    return () => {
      // 组件卸载前移除事件
      window.removeEventListener("resize", resize);
    };
  }, [getRect, getImg, setCanvasZoom, clipPosition]);

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
            <p>
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
            </p>
          </ItemTop>
          <CanvasBox height={300}>
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
