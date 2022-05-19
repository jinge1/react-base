export const data = {
  nodes: [
    {
      type: 'circle',
      label: '开始',
      nodeTypeName: '开始',
      size: 64,
      style: {
        fill: '#376BFF',
        stroke: '#376BFF'
      },
      labelCfg: {
        positions: 'center',
        style: {
          fontSize: 14,
          fill: '#fff'
        }
      },
      id: 'startEvent_a2f50e36151',
      name: 'startEvent',
      edges: ['conditionRouteNode_8f3f5d07c45'],
      description: '开始节点',
      isDesign: true,
      layerIndex: 0,
      layer: 0,
      _order: 3
    },
    {
      type: 'circle',
      size: 24,
      style: {
        fill: '#376BFF',
        stroke: '#376BFF'
      },
      anchorPoints: [
        [0.5, 0],
        [1, 0.5],
        [0.5, 1],
        [0, 0.5]
      ],
      icon: {
        show: true,
        width: 25,
        height: 25,
        text: '',
        fontFamily: 'iconfont',
        fontSize: 14,
        fill: '#fff',
        lineWidth: 0
      },
      id: 'conditionRouteNode_8f3f5d07c45',
      name: 'conditionRouteNode',
      description: '请输入',
      isDesign: true,
      edges: ['conditionNode_73539f0324a', 'conditionNode_5f5457cda85'],
      layer: 1,
      layerIndex: 0
    },
    {
      type: 'circle',
      size: 100,
      anchorPoints: [
        [0.5, 0],
        [0.5, 1]
      ],
      logoIcon: {
        show: false
      },
      preRect: {
        show: false
      },
      stateIcon: {
        show: false
      },
      style: {
        lineWidth: 0,
        radius: 10
      },
      labelCfg: {
        position: 'center',
        offset: 15,
        style: {
          fill: '#fff'
        }
      },
      descriptionCfg: {
        style: {
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold'
        },
        paddingTop: 15
      },
      nodeTypeName: '分支节点',
      id: 'conditionNode_73539f0324a',
      name: 'conditionNode',
      description: '当文本输入1为空',
      isDesign: true,
      sortIndex: 0,
      edges: ['conditionRouteNode_7489a00bb1e'],
      layer: 2,
      layerIndex: 0
    },
    {
      type: 'circle',
      size: 24,
      style: {
        fill: '#376BFF',
        stroke: '#376BFF'
      },
      anchorPoints: [
        [0.5, 0],
        [1, 0.5],
        [0.5, 1],
        [0, 0.5]
      ],
      icon: {
        show: true,
        width: 25,
        height: 25,
        text: '',
        fontFamily: 'iconfont',
        fontSize: 14,
        fill: '#fff',
        lineWidth: 0
      },
      id: 'conditionRouteNode_7489a00bb1e',
      name: 'conditionRouteNode',
      description: '请输入',
      isDesign: true,
      edges: ['conditionNode_702fa1c7f30', 'conditionNode_92a7b246de1'],
      layer: 3,
      layerIndex: 0
    },
    {
      type: 'circle',
      size: 100,
      anchorPoints: [
        [0.5, 0],
        [0.5, 1]
      ],
      logoIcon: {
        show: false
      },
      preRect: {
        show: false
      },
      stateIcon: {
        show: false
      },
      style: {
        lineWidth: 0,
        radius: 10
      },
      labelCfg: {
        position: 'center',
        offset: 15,
        style: {
          fill: '#fff'
        }
      },
      descriptionCfg: {
        style: {
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold'
        },
        paddingTop: 15
      },
      nodeTypeName: '分支节点',
      id: 'conditionNode_702fa1c7f30',
      name: 'conditionNode',
      description: '当子表单为空',
      isDesign: true,
      sortIndex: 0,
      edges: ['virtualNode_852498389a5'],
      layer: 4,
      layerIndex: 0
    },
    {
      type: 'circle',
      size: 100,
      anchorPoints: [
        [0.5, 0],
        [0.5, 1]
      ],
      logoIcon: {
        show: false
      },
      preRect: {
        show: false
      },
      stateIcon: {
        show: false
      },
      style: {
        lineWidth: 0,
        radius: 10
      },
      labelCfg: {
        position: 'center',
        offset: 15,
        style: {
          fill: '#fff'
        }
      },
      descriptionCfg: {
        style: {
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold'
        },
        paddingTop: 15
      },
      nodeTypeName: '分支节点',
      id: 'conditionNode_92a7b246de1',
      name: 'conditionNode',
      description: '其他情况进入此流程',
      isDesign: true,
      sortIndex: 1,
      edges: ['virtualNode_852498389a5'],
      layer: 4,
      layerIndex: 1
    },
    {
      type: 'circle',
      size: 100,
      anchorPoints: [
        [0.5, 0],
        [0.5, 1]
      ],
      logoIcon: {
        show: false
      },
      preRect: {
        show: false
      },
      stateIcon: {
        show: false
      },
      style: {
        lineWidth: 0,
        radius: 10
      },
      labelCfg: {
        position: 'center',
        offset: 15,
        style: {
          fill: '#fff'
        }
      },
      descriptionCfg: {
        style: {
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold'
        },
        paddingTop: 15
      },
      nodeTypeName: '分支节点',
      id: 'conditionNode_5f5457cda85',
      name: 'conditionNode',
      description: '其他情况进入此流程',
      isDesign: true,
      sortIndex: 1,
      edges: ['carbonNode_93194370da5'],
      layer: 2,
      layerIndex: 1
    },
    {
      type: 'circle',
      size: 100,
      anchorPoints: [
        [0.5, 0],
        [0.5, 1]
      ],
      logoIcon: {
        show: false
      },
      preRect: {
        show: false
      },
      stateIcon: {
        show: false
      },
      style: {
        lineWidth: 0,
        radius: 10
      },
      labelCfg: {
        position: 'center',
        offset: 15,
        style: {
          fill: '#fff'
        }
      },
      descriptionCfg: {
        style: {
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold'
        },
        paddingTop: 15
      },
      nodeTypeName: '抄送节点',
      id: 'carbonNode_93194370da5',
      name: 'carbonNode',
      description: '抄送人：朱华振,梅坦',
      isDesign: true,
      edges: ['virtualNode_cfe88a2b95a'],
      layer: 3,
      layerIndex: 1
    },
    {
      type: 'rect',
      size: [1, 112],
      anchorPoints: [
        [0.5, 0],
        [0.5, 1]
      ],
      style: {
        stroke: false,
        fill: '#CCCCCC'
      },
      id: 'virtualNode_852498389a5',
      name: 'virtualNode',
      description: '',
      conf: {
        nodeId: 'virtualNode_852498389a5',
        name: '1'
      },
      edges: ['virtualNode_cfe88a2b95a'],
      routeId: 'conditionRouteNode_7489a00bb1e',
      layer: 5,
      layerIndex: 0
    },
    {
      type: 'rect',
      size: [1, 112],
      anchorPoints: [
        [0.5, 0],
        [0.5, 1]
      ],
      style: {
        stroke: false,
        fill: '#CCCCCC'
      },
      id: 'virtualNode_cfe88a2b95a',
      name: 'virtualNode',
      description: '',
      edges: ['endEvent_c9646c921e6'],
      routeId: 'conditionRouteNode_8f3f5d07c45',
      layer: 6,
      layerIndex: 0
    },
    {
      type: 'circle',
      label: '结束',
      size: 64,
      style: {
        fill: '#999999',
        stroke: '#999'
      },
      labelCfg: {
        position: 'center',
        style: {
          fontSize: 14,
          fill: '#fff'
        }
      },
      id: 'endEvent_c9646c921e6',
      name: 'endEvent',
      edges: [],
      description: '结束节点',
      isDesign: true,
      layer: 7,
      layerIndex: 0
    }
  ],
  edges: [
    {
      source: 'startEvent_a2f50e36151',
      target: 'conditionRouteNode_8f3f5d07c45',
      type: 'mid-point-edge',
      isDesign: true
    },
    {
      source: 'conditionRouteNode_8f3f5d07c45',
      target: 'conditionNode_73539f0324a',
      type: 'router-edge',
      isDesign: true,
      sourceAnchor: 3
    },
    {
      source: 'conditionRouteNode_8f3f5d07c45',
      target: 'conditionNode_5f5457cda85',
      type: 'router-edge',
      isDesign: true,
      sourceAnchor: 1
    },
    {
      source: 'conditionNode_73539f0324a',
      target: 'conditionRouteNode_7489a00bb1e',
      type: 'mid-point-edge',
      isDesign: true
    },
    {
      source: 'conditionRouteNode_7489a00bb1e',
      target: 'conditionNode_702fa1c7f30',
      type: 'router-edge',
      isDesign: true,
      sourceAnchor: 3
    },
    {
      source: 'conditionRouteNode_7489a00bb1e',
      target: 'conditionNode_92a7b246de1',
      type: 'router-edge',
      isDesign: true,
      sourceAnchor: 1
    },
    {
      source: 'conditionNode_702fa1c7f30',
      target: 'virtualNode_852498389a5',
      type: 'together-edge',
      isDesign: true,
      targetAnchor: 0
    },
    {
      source: 'conditionNode_92a7b246de1',
      target: 'virtualNode_852498389a5',
      type: 'together-edge',
      isDesign: true,
      targetAnchor: 0
    },
    {
      source: 'conditionNode_5f5457cda85',
      target: 'carbonNode_93194370da5',
      type: 'mid-point-edge',
      isDesign: true
    },
    {
      source: 'carbonNode_93194370da5',
      target: 'virtualNode_cfe88a2b95a',
      type: 'together-edge',
      isDesign: true,
      targetAnchor: 0
    },
    {
      source: 'virtualNode_852498389a5',
      target: 'virtualNode_cfe88a2b95a',
      type: 'together-edge',
      isDesign: true,
      routeId: 'conditionRouteNode_7489a00bb1e',
      targetAnchor: 0
    },
    {
      source: 'virtualNode_cfe88a2b95a',
      target: 'endEvent_c9646c921e6',
      type: 'mid-point-edge',
      isDesign: true,
      routeId: 'conditionRouteNode_8f3f5d07c45'
    }
  ]
}
