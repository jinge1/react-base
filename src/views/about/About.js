import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { Button } from 'antd'
import Flow from '../../components/app/Flow'
import { data, apiData, data2 } from './mock'

const Box = styled.div`
  height: 100%;
`

const Controler = styled.div``

const sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

function About() {
  const [chartData, setChartData] = useState({ nodes: [], edges: [] })
  const changeData = (type) => {
    if (type === 'clear') {
      setChartData({ nodes: [], edges: [] })
    }
    if (type === 'reset') {
      const { nodes, edges } = apiData
      setChartData({
        nodes: nodes.map((n) => ({ ...n })),
        edges: edges.map((n) => ({ ...n }))
      })
    }
    if (type === 'del') {
      const { nodes, edges } = chartData
      // const delId = 'conditionNode_0dcbc3f5fb7'
      const delId = nodes[2].id
      console.log(delId, 'delId---')
      let lId = ''
      setChartData({
        nodes: nodes.filter((n) => n.id !== delId),
        edges: edges.reduce((pre, curr) => {
          const { source, target } = curr
          if (target === delId) {
            lId = source
            return pre
          }
          if (source === delId) {
            return [...pre, { source: lId, target }]
          }
          return [...pre, curr]
        }, [])
      })
    }
    if (type === 'edit') {
      const { nodes, edges } = chartData
      // const delId = 'conditionNode_0dcbc3f5fb7'
      const editId = nodes[2].id
      setChartData({
        nodes: nodes.map((node) =>
          node.id === editId ? { ...node, label: `${Date.now()}` } : node
        ),
        edges
      })
    }
  }
  useEffect(() => {
    async function init() {
      await sleep()
      // setChartData(data)
      // setChartData(data2)
      setChartData(apiData)
      console.log(data)
      console.log(apiData)
      console.log('apiData---')
    }
    init()
  }, [])
  return (
    <Box>
      <Controler>
        <Button onClick={() => changeData('clear')}>清空</Button>
        <Button onClick={() => changeData('reset')}>还原</Button>
        <Button onClick={() => changeData('edit')}>修改</Button>
        <Button onClick={() => changeData('add')}>新增</Button>
        <Button onClick={() => changeData('del')}>删除</Button>
      </Controler>
      <Flow data={chartData}></Flow>
    </Box>
  )
}
export default About
