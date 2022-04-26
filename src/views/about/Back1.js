import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import G6 from '@antv/g6'
import { data } from './mock'

G6.registerEdge('hvh', {
  draw(cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const shape = group.addShape('path', {
      attrs: {
        stroke: '#333',
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
          ['L', endPoint.x, endPoint.y],
        ],
      },
      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
    });
    return shape;
  },
});

// G6.registerEdge('flow-line', {
//   draw(cfg, group) {
//     const startPoint = cfg.startPoint
//     const endPoint = cfg.endPoint

//     const { style } = cfg
//     const shape = group.addShape('path', {
//       attrs: {
//         stroke: style.stroke,
//         label: '123',
//         // endArrow: style.endArrow,
//         path: [
//           ['M', startPoint.x, startPoint.y],
//           ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
//           ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
//           ['L', endPoint.x, endPoint.y]
//         ]
//       }
//     })

//     return shape
//   }
// })

const Box = styled.div``

function About() {
  const boxRef = useRef(null)
  useEffect(() => {
    const container = boxRef.current
    // const width = container.scrollWidth
    // const height = container.scrollHeight || 500
    const width = 1000
    const height = 500
    const graph = new G6.Graph({
      container: container,
      width,
      height,
      layout: {
        type: 'dagre',
        // nodesepFunc: (d) => {
        //   if (d.id === '3') {
        //     return 500
        //   }
        //   return 50
        // },
        ranksep: 70,
        rankdir: 'UL',
        controlPoints: true
      },
      defaultNode: {
        type: 'modelRect',
        // type: 'rect',
        size: [200, 100],
        description: '789',
        anchorPoints: [[0.5, 1]]
      },
      defaultEdge: {
        type: 'polyline',
        style: {
          radius: 20,
          offset: 45,
          endArrow: true,
          lineWidth: 2,
          stroke: '#C2C8D5'
        }
      },
      nodeStateStyles: {
        selected: {
          stroke: '#d9d9d9',
          fill: '#5394ef'
        }
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
            offset: 30
          }
        ]
      },
      fitView: true
    })
    graph.data(data)
    graph.render()
  }, [])
  return <Box ref={boxRef}>About2</Box>
}
export default About
