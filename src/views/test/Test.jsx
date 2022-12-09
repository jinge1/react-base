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
  overflow: auto;
`

const DropBox = styled.div`
  padding: 20px;
  border: dashed 1px orange;
`

const DragItem = () => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'Card'
      //   collect: (monitor) => ({
      //     isDragging: !!monitor.isDragging()
      //   })
    }),
    []
  )
  return <div ref={drag}>drag</div>
}

const DropItem = ({ children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'Card',
    // drop: () => moveKnight(x, y),
    // collect: (monitor) => ({
    //   //   isOver: !!monitor.isOver()
    // })
    hover(item, monitor) {
      console.log(monitor, 'item---')
    }
  }))
  return <DropBox ref={drop}>{children}</DropBox>
}

function Test() {
  return (
    <Box>
      <DndProvider backend={HTML5Backend}>
        <Content>
          <ListBox>
            <DragItem></DragItem>
          </ListBox>
          <CanvasWrap>
            <DropItem>drop</DropItem>
          </CanvasWrap>
        </Content>
      </DndProvider>
    </Box>
  )
}
export default Test
