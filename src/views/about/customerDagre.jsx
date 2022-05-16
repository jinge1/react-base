import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import G6 from '@antv/g6'
import { data } from './mock'
import { DagreLayout } from '@antv/layout'
import '../../utils/register'

const dagreLayout = new DagreLayout({
  type: 'customer-dagre',
  rankdir: 'UL', // layout 的方向
  nodesep: 200, // 节点水平间距
  ranksep: 60, // 节点垂直间距
})

const Box = styled.div``

function About() {
  const boxRef = useRef(null)
  useEffect(() => {
    const container = boxRef.current
    // const width = container.scrollWidth
    // const height = container.scrollHeight || 500
    const width = 600
    const height = 500
    const graph = new G6.Graph({
      container: container,
      width,
      height,
      defaultNode: {
        type: 'modelRect',
        // type: 'rect',
        size: [200, 100],
        description: '789',
        anchorPoints: [
          [0.5, 0],
          [0.5, 1],
        ],
        // logoIcon: {
        //   show: false,
        // },
        preRect: {
          show: false,
        },
        stateIcon: {
          show: false,
        },
      },
      defaultEdge: {
        type: 'polyline',
        // type: 'hvh',
        style: {
          radius: 20,
          offset: 45,
          endArrow: true,
          lineWidth: 2,
          stroke: '#C2C8D5',
        },
      },
      nodeStateStyles: {
        selected: {
          stroke: '#d9d9d9',
          fill: '#5394ef',
        },
      },
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'click-select',
          {
            type: 'tooltip',
            formatText(model) {
              const cfg = model.conf
              // const text = []
              // cfg.forEach((row) => {
              //   text.push(row.label + ':' + row.value + '<br>')
              // })
              // return text.join('\n')
              return typeof cfg === 'object' ? cfg.a : ''
            },
            offset: 30,
          },
        ],
      },
      fitCenter: true,
      fitView: true,
    })
    // graph.data(data)
    const { nodes, edges } = dagreLayout.layout(data)
    // console.log(newModel)

    graph.data({
      nodes: nodes.map((node) =>
        node.id === '3' ? { ...node, y: 200 } : node
      ),
      edges,
    })
    graph.render()
    // const item = graph.findById('3')
    // console.log(item, 'item---')
    // // graph.updateItem(item, {id: 3, x: 0, y: 0})
    // // graph.refreshPositions()
    // graph.on('edge:click', (ev) => {
    //   const { item, target } = ev
    //   if (target?.attrs?.fill === '#f00') {
    //     console.log(item, 'ev---', target.attrs)
    //     const actionItem = graph.findById('3')
    //     graph.updateItem(actionItem, { id: '3', x: 500, y: 430 })
    //     // graph.addItem('node', {
    //     //   id: 'node',
    //     //   label: 'node',
    //     //   address: 'cq',
    //     //   x: 200,
    //     //   y: 150,
    //     //   style: {
    //     //     fill: 'blue',
    //     //   },
    //     // })
    //   }
    // })
  }, [])
  return <Box ref={boxRef}>About2</Box>
}
export default About
