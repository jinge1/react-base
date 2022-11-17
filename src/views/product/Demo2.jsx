import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from '@emotion/styled'

const Box = styled.div``

const Content = styled.div`
  display: flex;
`

const ListBox = styled.div`
  width: 200px;
  margin-right: 20px; ;
`

const CanvasBox = styled.div`
  padding: 20px;
  background-color: gray;
  min-height: 300px;
  flex: 1;
`

const ItemInner = styled.div`
  padding: 10px 20px;
`

const coms = [{ text: '文本框' }, { text: '日期选择' }, { text: '子表单' }]

const settings = [
  { key: 'input_01', text: '文本框' },
  { key: 'date_01', text: '日期选择' },
  { key: 'form_01', text: '子表单' },
  { key: 'input_02', text: '文本框' }
]

const CanvasContent = ({ children }) => {
  const [{ canDrap, isOver }, droper] = useDrop({
    accept: 'BOX',
    drop: () => {},
    // 收集监听
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrap: monitor.canDrop()
    }),
    hover: (item, monitor) => {
      console.log('hhhh---', monitor.getClientOffset())
    }
  })
  const isActive = canDrap && isOver
  return (
    <div ref={droper} style={{ background: isActive ? '#999900' : '#009999' }}>
      <div>{String(isActive)}---1</div>
      <div>{children}</div>
    </div>
  )
}

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

function Product() {
  return (
    <Box>
      <DndProvider backend={HTML5Backend}>
        <Content>
          <ListBox>
            {coms.map(({ text }) => (
              <DragItem key={text} name={text}>
                <div>{text}</div>
              </DragItem>
            ))}
          </ListBox>
          <CanvasBox>
            <CanvasContent>
              {settings.map(({ text, key }) => (
                <DragItem key={key} name={key}>
                  <div>{text}</div>
                </DragItem>
              ))}
            </CanvasContent>
          </CanvasBox>
        </Content>
      </DndProvider>
    </Box>
  )
}
export default Product
