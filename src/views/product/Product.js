import { useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from '@emotion/styled'
import TreeBox from './components/TreeBox'
import CanvasBox from './components/CanvasBox'

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

function Product() {
  const [active, setActive] = useState(-1)
  return (
    <Box>
      <DndProvider backend={HTML5Backend}>
        <Content>
          <ListBox>
            <TreeBox active={active} setActive={setActive}></TreeBox>
          </ListBox>
          <CanvasWrap>
            <CanvasBox></CanvasBox>
          </CanvasWrap>
        </Content>
      </DndProvider>
    </Box>
  )
}
export default Product
