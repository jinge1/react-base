import G6 from '@antv/g6'
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