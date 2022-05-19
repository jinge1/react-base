import { createGraphConfig } from '@antv/xflow'
/** 自定义React节点/边 */
// import Node1 from './react-node/node1'
// import Node2 from './react-node/node2'
// import Edge1 from './react-edge/edge1'
// import Edge2 from './react-edge/edge2'

const Node = (props) => {
  // const { data = {} } = props
  // const { info = {} } = data
  // console.log(data, 'ddd---')
  // return <div>{info?.text}</div>
  return <div>NODE</div>
}
const Edge = () => {
  return <div>Edge</div>
}

export const useGraphConfig = createGraphConfig((config) => {
  /** 设置XFlow画布配置项 */
  config.setX6Config({
    grid: false,
    resizing: false,
    // scroller: true,
    async: true,
    interacting: {
      /** 节点默认可以被移动 */
      nodeMovable: false,
      /** 边上标签默认不可以被移动 */
      edgeLabelMovable: true
    },
    scaling: { min: 0.2, max: 3 },
    mousewheel: { enabled: true, zoomAtMousePosition: true }
  })

  /** 设置XFlow画布需要渲染的React节点/边 */
  config.setNodeRender('NODE', (props) => <Node {...props} />)
  config.setEdgeRender('EDGE', (props) => <Edge {...props} />)
})
