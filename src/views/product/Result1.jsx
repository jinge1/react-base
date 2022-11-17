import { useRef, useState } from 'react'
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
  height: 300px;
  overflow: auto;
`

const CanvasWrap = styled.div`
  width: 100%;
  overflow: scroll;
`

const CanvasBox = styled.div`
  padding: 20px;
  background-color: gray;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  width: 1500px;
`

const ItemInner = styled.div`
  padding: 10px 20px;
  width: 300px;
  box-sizing: border-box;
`

const coms = [
  { text: '文本框1' },
  { text: '日期选择2' },
  { text: '子表单3' },
  { text: '文本框4' },
  { text: '日期选择5' },
  { text: '子表单6' },
  { text: '文本框7' },
  { text: '日期选择8' },
  { text: '子表单9' },
  { text: '文本框10' },
  { text: '日期选择11' },
  { text: '子表单12' },
  { text: '文本框13' },
  { text: '日期选择14' },
  { text: '子表单15' },
  { text: '文本框16' },
  { text: '日期选择17' },
  { text: '子表单18' }
]

const settings = [
  { key: 'input_01', text: '文本框' },
  { key: 'date_01', text: '日期选择' },
  { key: 'form_01', text: '子表单' },
  { key: 'input_02', text: '文本框' },
  { key: 'date_02', text: '日期选择' },
  { key: 'form_02', text: '子表单' },
  { key: 'input_03', text: '文本框' },
  { key: 'date_06', text: '日期选择' },
  { key: 'form_06', text: '子表单' },
  { key: 'input_06', text: '文本框' }
]

const DragItem = ({ name, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BOX',
    item: { name },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const dropRes = monitor.getDropResult()
        //获取拖拽对象所处容器的数据，获取坐标变化
        if (dropRes) {
          // top = dropRes.top;
          // left = dropRes.left;
          console.log(dropRes, 'dropRes---', dropRes.top)
        }
      }
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  })
  return <ItemInner ref={drag}>{children}</ItemInner>
}

const cardStyle = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  width: '200px'
}

const Card = ({ id, name, index, active, setActive }) => {
  const ref = useRef(null)
  const isActive = active === index
  const [action, setAction] = useState({})
  const [{ handlerId }, drop] = useDrop({
    accept: 'CARD',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }

      setActive(index)
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      console.log(hoverBoundingRect, 'hoverBoundingRect---')

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

      setAction({
        x: hoverClientY < hoverMiddleY ? 'up' : 'down',
        y: hoverClientX < hoverMiddleX ? 'left' : 'right'
      })
      console.log(hoverClientY < hoverMiddleY, 'yyy')
    }
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div
      ref={ref}
      style={{ ...cardStyle, opacity }}
      data-handler-id={handlerId}
    >
      <div>{name}</div>
      {isActive && (
        <div>
          <div>
            <span style={{ color: 'orange' }}>{action.x}</span>
          </div>
          <div>
            <span style={{ color: 'blue' }}>{action.y}</span>
          </div>
        </div>
      )}
    </div>
  )
}

const FlexItem = () => {}

function Product() {
  const [active, setActive] = useState(-1)
  return (
    <Box>
      <DndProvider backend={HTML5Backend}>
        <Content>
          <ListBox>
            {coms.map(({ text }, index) => (
              <Card
                key={text}
                name={text}
                id={index}
                index={index}
                active={active}
                setActive={setActive}
              ></Card>
            ))}
          </ListBox>
          <CanvasWrap>
            <CanvasBox>
              {settings.map(({ text, key }, index) => (
                <Card
                  key={key}
                  name={key}
                  id={index}
                  index={index}
                  active={active}
                  setActive={setActive}
                >
                  <div>{text}</div>
                </Card>
              ))}
            </CanvasBox>
          </CanvasWrap>
        </Content>
      </DndProvider>
    </Box>
  )
}
export default Product
