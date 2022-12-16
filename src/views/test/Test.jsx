import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from '@emotion/styled'

const Box = styled.div``

const Content = styled.div`
  display: flex;
`

const ListBox = styled.div`
  width: 200px;
  margin-right: 20px;
  overflow: auto;
`

const CanvasWrap = styled.div`
  width: 100%;
  overflow: auto;
`

const DragBox = styled.div`
  border: dashed 1px #ccc;
  padding: 10px;
  cursor: move;
  margin-bottom: 10px;
`

const DropBox = styled.div`
  border: dashed 1px orange;
  box-sizing: border-box;
  position: relative;
  cursor: move;
  position: relative;
  /* background: #6c6c6c; */
  /* &:hover {
    background: #6c6c6c;
  } */
`

const Line = styled.div`
  position: absolute;
  background: red;
  z-index: 3;
  pointer-events: none;
`

const widgets = [
  { text: '文本输入', type: 'input' },
  { text: '数字输入', type: 'number' },
  { text: '日期选择', type: 'date' },
  { text: '子表单', type: 'form' }
]

const mockData = [
  {
    id: 'input_01',
    widget: 'input',
    text: '文本输入01'
  },
  {
    id: 'input_02',
    widget: 'input',
    text: '文本输入02'
  },
  {
    id: 'date_01',
    widget: 'date',
    text: '日期选择01'
  },
  {
    id: 'form_01',
    widget: 'form',
    text: '子表单01',
    children: [
      {
        id: 'input_11',
        widget: 'input',
        text: '文本输入11'
      },
      {
        id: 'number_11',
        widget: 'number',
        text: '数字输入11'
      }
    ]
  },
  {
    id: 'number_03',
    widget: 'number',
    text: '数字输入03'
  }
]

const PreviewLine = ({ position, parentId }) => {
  const { x, y } = position || {}

  if (parentId) {
    const subStyle = { height: '100%', width: 2, top: 0 }
    return x === 'right' ? (
      <Line style={{ ...subStyle, right: 0 }}></Line>
    ) : (
      <Line style={{ ...subStyle, left: 0 }}></Line>
    )
  }
  const baseStyle = { width: '100%', height: 2, left: 0 }
  return y === 'down' ? (
    <Line style={{ ...baseStyle, bottom: 0 }}></Line>
  ) : (
    <Line style={{ ...baseStyle, top: 0 }}></Line>
  )
}

const DragItem = ({ children, info }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'Card',
      item: () => ({ type: 'add', info }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    []
  )
  const style = isDragging ? { opacity: 0.3 } : { opacity: 1 }

  return (
    <DragBox ref={drag} style={style}>
      {children}
    </DragBox>
  )
}

const DropItem = ({
  children,
  type,
  parentId,
  hover,
  drop,
  canDrop,
  targetInfo,
  info,
  style
}) => {
  const ref = useRef(null)
  const parentInfo = parentId ? { parentId } : {}
  const { info: target, position: pos, isDrop } = targetInfo || {}

  const isActive = target && target.id === info?.id

  const [, droper] = useDrop(() => ({
    accept: 'Card',
    canDrop,
    drop(item) {
      drop(type)
    },
    hover(item, monitor) {
      const { current } = ref

      // console.log('canDrop---', monitor.canDrop())

      // Determine rectangle on screen
      const hoverBoundingRect = current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      const hoverClientX = clientOffset.x - hoverBoundingRect.left

      const position = {
        x: hoverClientX < hoverMiddleX ? 'left' : 'right',
        y: hoverClientY < hoverMiddleY ? 'up' : 'down'
      }

      hover({ type, info, position, isDrop, ...parentInfo })
    }
  }))

  const [{ isDragging }, drag] = useDrag({
    type: 'Card',
    item: () => {
      return {
        type,
        info,
        ...parentInfo
      }
    }
  })

  drag(droper(ref))
  const opacity = isDragging ? 0.3 : 1

  return (
    <DropBox ref={ref} style={style ? { ...style, opacity } : { opacity }}>
      {children}
      {isActive && <PreviewLine position={pos} {...parentInfo}></PreviewLine>}
    </DropBox>
  )
}

function Test() {
  const [conf, setConf] = useState([])
  const hoverRef = useRef(null)
  const [targetInfo, setTargetInfo] = useState({})
  // 每行显示列数
  const cols = 2

  useEffect(() => {
    const init = async () => {
      setConf(mockData)
    }
    init()
  }, [])

  const hover = useCallback((info) => {
    hoverRef.current = info
    setTargetInfo(info)
  }, [])

  const canDrop = useCallback((item) => {
    const { current } = hoverRef // 目标元素信息
    const { info: target, parentId } = current || {}
    const { info } = item // 拖拽元素信息
    const hadId = (o) =>
      typeof o === 'object' && o !== null && typeof o.id !== 'undefined'
    if (!hadId(target) || !hadId(info)) {
      return true
    }
    // 拖动位置与原位置一致无效
    if (info.id === target.id) {
      return false
    }
    // 子表单不能拖动到子表单内部
    if (parentId && info.widget === 'form') {
      return false
    }
    return true
  }, [])

  const drop = useCallback((t) => {
    if (t === hoverRef.current) {
      // console.log(hoverRef.current, 'ccc')
    }
  }, [])

  return (
    <Box>
      <DndProvider backend={HTML5Backend}>
        <Content>
          <ListBox>
            {widgets.map((item) => (
              <DragItem key={item.type} info={item}>
                {item.text}
              </DragItem>
            ))}
          </ListBox>
          <CanvasWrap>
            <DropItem
              type="canvas"
              hover={hover}
              drop={drop}
              canDrop={canDrop}
              targetInfo={targetInfo}
              style={{
                height: '100%',
                padding: 30,
                display: 'flex',
                flexWrap: 'wrap'
              }}
            >
              {conf.map((item) =>
                item.widget === 'form' ? (
                  <DropItem
                    key={item.id}
                    type="form"
                    info={item}
                    style={{ width: '100%', padding: 20, display: 'flex' }}
                    hover={hover}
                    drop={drop}
                    canDrop={canDrop}
                    targetInfo={targetInfo}
                  >
                    {Array.isArray(item.children) &&
                    item.children.length > 0 ? (
                      item.children.map((sub) => (
                        <DropItem
                          key={sub.id}
                          type="widget"
                          info={sub}
                          parentId={item.id}
                          style={{ flex: 1 }}
                          hover={hover}
                          drop={drop}
                          canDrop={canDrop}
                          targetInfo={targetInfo}
                        >
                          {sub.text}
                        </DropItem>
                      ))
                    ) : (
                      <div style={{ textAlign: 'center' }}>请拖入组件</div>
                    )}
                  </DropItem>
                ) : (
                  <DropItem
                    key={item.id}
                    type="widget"
                    info={item}
                    style={{ width: `${100 / cols}%` }}
                    hover={hover}
                    drop={drop}
                    canDrop={canDrop}
                    targetInfo={targetInfo}
                  >
                    {item.text}
                  </DropItem>
                )
              )}
            </DropItem>
          </CanvasWrap>
        </Content>
      </DndProvider>
    </Box>
  )
}
export default Test
