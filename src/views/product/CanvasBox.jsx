import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from '@emotion/styled'

const Box = styled.div`

`

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

const coms = [{ text: '文本框' }, { text: '日期选择' }, { text: '子表单' }]
const settings = [
  { key: 'input_01', text: '文本框' },
  { key: 'date_01', text: '日期选择' },
  { key: 'form_01', text: '子表单' },
  { key: 'input_02', text: '文本框' }
]

function Product() {
  return (
    <Box>
      <DndProvider backend={HTML5Backend}>
        <Content>
          <ListBox>
            {coms.map(({ text }) => (
              <div key={text}>{text}</div>
            ))}
          </ListBox>
          <CanvasBox>
            {settings.map(({ text, key }) => (
              <div key={key}>{text}</div>
            ))}
          </CanvasBox>
        </Content>
      </DndProvider>
    </Box>
  )
}
export default Product
