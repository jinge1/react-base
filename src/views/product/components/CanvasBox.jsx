import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Row, Col, Table } from 'antd'
import styled from '@emotion/styled'

import confList from '../../../mock/confList.json'

const Box = styled.div`
  background-color: gray;
`

const ItemBox = styled.div``

const CardBox = styled.div`
  position: relative;
`

const Direction = styled.div`
  position: absolute;
  z-index: 3;
  background: orange;
`

const TableBox = styled.div`
  width: 100%;
  overflow: auto;
`

const TableInnerBox = styled.div`
  display: flex;
`

const TableCol = styled.div``

const cardStyle = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  //   marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
}

const Card = ({ id, children, index, parentId, targetInfo, setTargetInfo }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'CARD',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      const { current } = ref
      if (!current) {
        return
      }

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

      setTargetInfo({
        x: hoverClientY < hoverMiddleY ? 'up' : 'down',
        y: hoverClientX < hoverMiddleX ? 'left' : 'right',
        id
      })
    }
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    //   previewOptions: (args)=> {
    //     console.log(args, 'aaa---')
    //     return <div>1</div>
    //   }
    })
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  let activeStyle =
    targetInfo.x === 'up'
      ? { left: 0, top: 0, width: '100%', height: '2px' }
      : { left: 0, bottom: 0, width: '100%', height: '2px' }
  if (parentId) {
    activeStyle =
      targetInfo.y === 'left'
        ? { left: 0, top: 0, width: '2px', height: '100%' }
        : { right: 0, top: 0, width: '2px', height: '100%' }
  }
  return (
    <CardBox
      ref={ref}
      style={{ ...cardStyle, opacity }}
      data-handler-id={handlerId}
    >
      {children}
      {targetInfo.id === id && <Direction style={activeStyle}></Direction>}
    </CardBox>
  )
}

const SubForm = ({ arr = [], parentId, targetInfo, setTargetInfo }) => {
  const itemWidth = 360

  return (
    <TableBox>
      <TableInnerBox
        style={{ width: arr.reduce((pre, curr) => pre + itemWidth, 0) + 80 }}
      >
        <TableCol style={{ width: 80 }}>
          <div>序号</div>
          <div>序号</div>
        </TableCol>
        {arr.map((item) => (
          <TableCol style={{ width: itemWidth }} key={item.attrNo}>
            <Card
              id={item.attrNo}
              parentId={parentId}
              targetInfo={targetInfo}
              setTargetInfo={setTargetInfo}
            >
              <div>{item.attrTitle}</div>
              <div>{item.attrType}</div>
            </Card>
          </TableCol>
        ))}
      </TableInnerBox>
    </TableBox>
  )
}

const CanvasBox = ({ layoutLine = 2, arr = confList }) => {
  const [targetInfo, setTargetInfo] = useState({})
  return (
    <Box>
      <Row>
        {arr
          .filter((e) => e.configJson.fixed !== 1)
          .map((item) => (
            <Col
              key={item.attrNo}
              span={
                item.attrType === 'subform'
                  ? 24
                  : (24 / parseInt(layoutLine)) *
                    parseInt(item.configJson.layoutLine)
              }
            >
              {item.attrType === 'subform' ? (
                <ItemBox>
                  <Card
                    id={item.attrNo}
                    name={item.attrTitle}
                    targetInfo={targetInfo}
                    setTargetInfo={setTargetInfo}
                  >
                    <div>{item.attrTitle}</div>
                    <SubForm
                      arr={item.configJson.tableAttrList}
                      targetInfo={targetInfo}
                      parentId={item.attrNo}
                      setTargetInfo={setTargetInfo}
                    ></SubForm>
                  </Card>
                </ItemBox>
              ) : (
                <ItemBox>
                  <Card
                    id={item.attrNo}
                    targetInfo={targetInfo}
                    setTargetInfo={setTargetInfo}
                  >
                    <div>{item.attrTitle}</div>
                    <div>{item.attrType}</div>
                  </Card>
                </ItemBox>
              )}
            </Col>
          ))}
      </Row>
    </Box>
  )
}

export default CanvasBox
