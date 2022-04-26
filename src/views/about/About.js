import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import G6 from '@antv/g6'
import { data } from './mock'

// G6.registerEdge(
//   'mid-point-edge',
//   {
//     update: undefined
//   },
//   'cubic'
// )

G6.registerEdge('hvh', {
  draw(cfg, group) {
    const startPoint = cfg.startPoint
    const endPoint = cfg.endPoint
    const shape = group.addShape('path', {
      attrs: {
        stroke: '#333',
        // path: [
        //   ['M', startPoint.x, startPoint.y],
        //   ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
        //   ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
        //   ['L', endPoint.x, endPoint.y],
        // ],
        path: [
          ['M', startPoint.x, startPoint.y],
          // ['L', startPoint.x, startPoint.y + startPoint.y / 3], // 三分之一处
          ['L', endPoint.x, startPoint.y], // 三分之二处
          ['L', endPoint.x, endPoint.y],
        ],
      },

      // must be assigned in G6 3.3 and later versions. it can be any value you want
      name: 'path-shape',
    })
    if (cfg.label) {
      group.addShape('text', {
        // attrs: style
        attrs: {
          x: 0, // 居中
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: '#666',
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'text-shape',
        // 设置 draggable 以允许响应鼠标的图拽事件
        draggable: true,
      })
    }

    return shape
  },
  afterDraw(cfg, group) {
    // 获取图形组中的第一个图形，在这里就是边的路径图形
    const shape = group.get('children')[0]
    // 获取路径图形的中点坐标
    const midPoint = shape.getPoint(0.5)
    // 在中点增加一个矩形，注意矩形的原点在其左上角
    group.addShape('rect', {
      attrs: {
        width: 10,
        height: 10,
        fill: '#f00',
        // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
        x: midPoint.x - 5,
        y: midPoint.y - 5,
      },
    })
  },
})

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
    const width = 600
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
        controlPoints: true,
      },
      defaultNode: {
        type: 'modelRect',
        // type: 'rect',
        size: [200, 100],
        description: '789',
        anchorPoints: [[0.5, 1]],
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
      // fitView: true
    })
    graph.data(data)
    graph.render()
    const item = graph.findById('3')
    console.log(item, 'item---')
    // graph.updateItem(item, {id: 3, x: 0, y: 0})
    // graph.refreshPositions()
    graph.on('edge:click', (ev) => {
      const { item, target } = ev
      if (target?.attrs?.fill === '#f00') {
        console.log(item, 'ev---', target.attrs)
        const actionItem = graph.findById('3')
        graph.updateItem(actionItem, { id: '3', x: 500, y: 430 })
        // graph.addItem('node', {
        //   id: 'node',
        //   label: 'node',
        //   address: 'cq',
        //   x: 200,
        //   y: 150,
        //   style: {
        //     fill: 'blue',
        //   },
        // })
      }
    })
  }, [])
  return <Box ref={boxRef}>About2</Box>
}
export default About
