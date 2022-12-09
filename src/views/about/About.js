import { useRef, useState } from 'react'
import { Table, Typography } from 'antd'

import styled from '@emotion/styled'

const { Text } = Typography

const Box = styled.div`
  .ant-table-body {
    position: relative;
    padding-bottom: 80px;
    &::-webkit-scrollbar {
      width: 1px;
      height: 1px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 1px;
      /* background: #efefef; */
    }
  }
`

const Wrap = styled.div`
  width: 100%;
  overflow-x: auto;
`
const Inner = styled.div`
  height: 1px;
  opacity: 0;
`

function About() {
  const boxRef = useRef(null)
  const fixedColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: true,
      width: 100
    },
    {
      title: 'Description1',
      dataIndex: 'description1',
      width: 200
    },
    {
      title: 'Description2',
      dataIndex: 'description2',
      width: 200
    },
    {
      title: 'Description3',
      dataIndex: 'description3',
      width: 200
    },
    {
      title: 'Description4',
      dataIndex: 'description4',
      width: 200
    },
    {
      title: 'Description5',
      dataIndex: 'description5',
      width: 200
    }
  ]
  const fixedData = []
  for (let i = 0; i < 20; i += 1) {
    fixedData.push({
      key: i,
      name: ['Light', 'Bamboo', 'Little'][i % 3],
      description1: 'Everything that has a beginning, has an end.',
      description2: 'Everything that has a beginning, has an end.',
      description3: 'Everything that has a beginning, has an end.',
      description4: 'Everything that has a beginning, has an end.',
      description5: 'Everything that has a beginning, has an end.'
    })
  }
  const totalWidth = fixedColumns.reduce((pre, { width }) => pre + width, 0)
  console.log(totalWidth, 'totalWidth---')
  const onScroll = ({ target }) => {
    const { current } = boxRef
    const { scrollLeft } = target
    const tableEle = current.querySelector('.ant-table-body')
    tableEle.scrollLeft = scrollLeft
  }
  return (
    <Box ref={boxRef}>
      <Table
        columns={fixedColumns}
        dataSource={fixedData}
        pagination={false}
        scroll={{
          x: '100%',
          y: 400
        }}
        bordered
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                This is a summary content
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
      <Wrap onScroll={onScroll}>
        <Inner
          style={{
            width: totalWidth + (fixedColumns.length - 1) * 10,
            background: 'orange'
          }}
        >
          1234
        </Inner>
      </Wrap>
    </Box>
  )
}
export default About
