import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from '@emotion/styled'

const ItemStyle = styled.div`
  border: 1px dashed gray;
  background: white;
  padding: 0.5rem 1rem;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  cursor: move;
  float: left;
`

const DusStyle = styled.div`
  height: 12rem;
  width: 12rem;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  line-height: normal;
  float: left;
`

const Wraper = styled.div`
  padding: 20px;
`

const Box = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BOX',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }))
  const opacity = isDragging ? 0.4 : 1
  return (
    <ItemStyle ref={drag} style={{ opacity }} data-testid={`box`}>
      {name}
    </ItemStyle>
  )
}

const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'BOX',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))
  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (
    <DusStyle ref={drop} style={{ backgroundColor }} data-testid="dustbin">
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </DusStyle>
  )
}

const Example = () => {
  return (
    <div>
      <div>
        <Dustbin />
      </div>
      <div>
        <Box name="Glass" />
        <Box name="Banana" />
        <Box name="Paper" />
      </div>
    </div>
  )
}

function Product() {
  return (
    <Wraper>
      <DndProvider backend={HTML5Backend}>
        <Example></Example>
      </DndProvider>
    </Wraper>
  )
}
export default Product
