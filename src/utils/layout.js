// import dagre from '@antv/layout/lib/layout/dagre/index'
import dagre from './dagre'
import {
  isArray,
  isNumber,
  isObject,
  getEdgeTerminal,
  getFunc,
  // isString,
} from '@antv/layout/lib/util'
import { Base } from '@antv/layout/lib/layout/base'
import { Graph as DagreGraph } from '@antv/layout/lib/layout/dagre/graph'

// https://github.com/antvis/layout/blob/master/src/layout/dagre/src/position/index.ts


/**
 * 层次布局
 */
export default class DagreLayout extends Base {
  constructor(options) {
    super()
    this.updateCfg(options)
  }

  getDefaultCfg() {
    return {
      rankdir: 'TB', // layout 方向, 可选 TB, BT, LR, RL
      align: undefined, // 节点对齐方式，可选 UL, UR, DL, DR
      nodeSize: undefined, // 节点大小
      nodesepFunc: undefined, // 节点水平间距(px)
      ranksepFunc: undefined, // 每一层节点之间间距
      nodesep: 50, // 节点水平间距(px)
      ranksep: 50, // 每一层节点之间间距
      controlPoints: false, // 是否保留布局连线的控制点
      radial: false, // 是否基于 dagre 进行辐射布局
      focusNode: null, // radial 为 true 时生效，关注的节点
    }
  }

  layoutNode = (nodeId) => {
    const self = this
    const { nodes } = self
    const node = nodes.find((node) => node.id === nodeId)
    if (node) {
      const layout = node.layout !== false
      return layout
    }
    return true
  }

  /**
   * 执行布局
   */
  execute() {
    const self = this
    const { nodes, nodeSize, rankdir, combos, begin, radial, edges = [] } = self
    if (!nodes) return
    const g = new DagreGraph({
      multigraph: true,
      compound: true,
    })

    let nodeSizeFunc
    if (!nodeSize) {
      nodeSizeFunc = (d) => {
        if (d.size) {
          if (isArray(d.size)) {
            return d.size
          }
          if (isObject(d.size)) {
            return [d.size.width || 40, d.size.height || 40]
          }
          return [d.size, d.size]
        }
        return [40, 40]
      }
    } else if (isArray(nodeSize)) {
      nodeSizeFunc = () => nodeSize
    } else {
      nodeSizeFunc = () => [nodeSize, nodeSize]
    }
    const ranksepfunc = getFunc(self.ranksep, 50, self.ranksepFunc)
    const nodesepfunc = getFunc(self.nodesep, 50, self.nodesepFunc)
    let horisep = nodesepfunc
    let vertisep = ranksepfunc

    if (rankdir === 'LR' || rankdir === 'RL') {
      horisep = ranksepfunc
      vertisep = nodesepfunc
    }
    g.setDefaultEdgeLabel(() => ({}))
    g.setGraph(self)
    // console.log(g, 'g---')

    const comboMap = {}

    if (this.sortByCombo && combos) {
      combos.forEach((combo) => {
        if (!combo.parentId) return
        if (!comboMap[combo.parentId]) {
          comboMap[combo.parentId] = true
          g.setNode(combo.parentId, {})
        }
        g.setParent(combo.id, combo.parentId)
      })
    }

    nodes
      .filter((node) => node.layout !== false)
      .forEach((node) => {
        const size = nodeSizeFunc(node)
        const verti = vertisep(node)
        const hori = horisep(node)
        const width = size[0] + 2 * hori
        const height = size[1] + 2 * verti
        const layer = node.layer
        if (isNumber(layer)) {
          // 如果有layer属性，加入到node的label中
          g.setNode(node.id, { width, height, layer })
        } else {
          g.setNode(node.id, { width, height })
        }

        if (this.sortByCombo && node.comboId) {
          if (!comboMap[node.comboId]) {
            comboMap[node.comboId] = true
            g.setNode(node.comboId, {})
          }
          g.setParent(node.id, node.comboId)
        }
      })

    edges.forEach((edge) => {
      // dagrejs Wiki https://github.com/dagrejs/dagre/wiki#configuring-the-layout
      const source = getEdgeTerminal(edge, 'source')
      const target = getEdgeTerminal(edge, 'target')
      if (this.layoutNode(source) && this.layoutNode(target)) {
        g.setEdge(source, target, {
          weight: edge.weight || 1,
        })
      }
    })

    // 考虑增量图中的原始图
    let prevGraph = undefined
    if (self.preset) {
      prevGraph = new DagreGraph({
        multigraph: true,
        compound: true,
      })
      self.preset.nodes.forEach((node) => {
        prevGraph?.setNode(node.id, node)
      })
    }

    dagre.layout(g, {
      prevGraph,
      edgeLabelSpace: self.edgeLabelSpace,
      keepNodeOrder: Boolean(!!self.nodeOrder),
      nodeOrder: self.nodeOrder,
    })

    const dBegin = [0, 0]
    // if (begin) {
    //   let minX = Infinity
    //   let minY = Infinity
    //   g.nodes().forEach((node) => {
    //     const coord = g.node(node)
    //     if (minX > coord.x) minX = coord.x
    //     if (minY > coord.y) minY = coord.y
    //   })
    //   g.edges().forEach((edge) => {
    //     const coord = g.edge(edge)
    //     coord.points?.forEach((point) => {
    //       if (minX > point.x) minX = point.x
    //       if (minY > point.y) minY = point.y
    //     })
    //   })
    //   dBegin[0] = begin[0] - minX
    //   dBegin[1] = begin[1] - minY
    // }

    g.nodes().forEach((node) => {
      const coord = g.node(node)
      console.log(coord, node, dBegin, 'dBegin')
      const i = nodes.findIndex((it) => it.id === node)
      if (!nodes[i]) return
      nodes[i].x = coord.x + dBegin[0]
      nodes[i].y = coord.y + dBegin[1]
      // @ts-ignore: pass layer order to data for increment layout use
      nodes[i]._order = coord._order
    })
    g.edges().forEach((edge) => {
      const coord = g.edge(edge)
      const i = edges.findIndex((it) => {
        const source = getEdgeTerminal(it, 'source')
        const target = getEdgeTerminal(it, 'target')
        return source === edge.v && target === edge.w
      })
      if (
        self.edgeLabelSpace &&
        self.controlPoints &&
        edges[i].type !== 'loop'
      ) {
        edges[i].controlPoints = coord?.points?.slice(
          1,
          coord.points.length - 1
        ) // 去掉头尾
        edges[i].controlPoints.forEach((point) => {
          point.x += dBegin[0]
          point.y += dBegin[1]
        })
      }
    })

    if (self.onLayoutEnd) self.onLayoutEnd()

    return {
      nodes,
      edges,
    }
  }

  // getRadialPos(dimValue, range, rangeLength, radius, arcRange = [0, 1]) {
  //   // dimRatio 占圆弧的比例
  //   let dimRatio = (dimValue - range[0]) / rangeLength
  //   // 再进一步归一化到指定的范围上
  //   dimRatio = dimRatio * (arcRange[1] - arcRange[0]) + arcRange[0]
  //   // 使用最终归一化后的范围计算角度
  //   const angle = dimRatio * 2 * Math.PI // 弧度
  //   // 将极坐标系转换为直角坐标系
  //   return {
  //     x: Math.cos(angle) * radius,
  //     y: Math.sin(angle) * radius,
  //   }
  // }

  getType() {
    return 'dagre'
  }
}
