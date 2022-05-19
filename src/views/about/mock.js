export const apiData = {
  nodes: [
    {
      id: 'startEvent_baf4740da7a',
      label: '开始'
    },
    {
      id: 'conditionRouteNode_8ee4ce7c35a',
      label: '条件分支网关1'
    },
    {
      id: 'conditionNode_0dcbc3f5fb7',
      label: '分支节点3'
    },
    {
      id: 'conditionRouteNode_e42f4558a8e',
      label: '条件分支网关2'
    },
    {
      id: 'conditionNode_5d25424ab30',
      label: '分支节点2'
    },
    {
      id: 'approvalNode_8218ab809a2',
      label: '人工节点3'
    },
    {
      id: 'conditionNode_0e2450245ea',
      label: '默认分支'
    },
    {
      id: 'approvalNode_10dc646296a',
      label: '人工节点2'
    },
    {
      id: 'virtualNode_621d874fc59',
      label: '1'
    },
    {
      id: 'approvalNode_31893cbb80a',
      label: '人工节点1'
    },
    {
      id: 'conditionNode_d5c57c28dcf',
      label: '默认分支'
    },
    {
      id: 'virtualNode_0199123fd3b',
      label: '1'
    },
    {
      id: 'endEvent_76e58674c9d',
      label: '结束'
    }
  ].map((node) => ({ ...node, width: 180, height: 36 })),
  edges: [
    {
      source: 'startEvent_baf4740da7a',
      target: 'conditionRouteNode_8ee4ce7c35a'
    },
    {
      source: 'conditionRouteNode_8ee4ce7c35a',
      target: 'conditionNode_0dcbc3f5fb7'
    },
    {
      source: 'conditionRouteNode_8ee4ce7c35a',
      target: 'conditionNode_d5c57c28dcf'
    },
    {
      source: 'conditionNode_0dcbc3f5fb7',
      target: 'conditionRouteNode_e42f4558a8e'
    },
    {
      source: 'conditionRouteNode_e42f4558a8e',
      target: 'conditionNode_5d25424ab30'
    },
    {
      source: 'conditionRouteNode_e42f4558a8e',
      target: 'conditionNode_0e2450245ea'
    },
    {
      source: 'conditionNode_5d25424ab30',
      target: 'approvalNode_8218ab809a2'
    },
    {
      source: 'approvalNode_8218ab809a2',
      target: 'virtualNode_621d874fc59'
    },
    {
      source: 'conditionNode_0e2450245ea',
      target: 'approvalNode_10dc646296a'
    },
    {
      source: 'approvalNode_10dc646296a',
      target: 'virtualNode_621d874fc59'
    },
    {
      source: 'virtualNode_621d874fc59',
      target: 'approvalNode_31893cbb80a'
    },
    {
      source: 'approvalNode_31893cbb80a',
      target: 'virtualNode_0199123fd3b'
    },
    {
      source: 'conditionNode_d5c57c28dcf',
      target: 'virtualNode_0199123fd3b'
    },
    {
      source: 'virtualNode_0199123fd3b',
      target: 'endEvent_76e58674c9d'
    }
  ]
}

export const data2 = {
  nodes: [
    {
      renderKey: 'NODE',
      id: 'startEvent_baf4740da7a',
      label: '开始'
    },
    {
      renderKey: 'NODE',
      id: 'conditionRouteNode_8ee4ce7c35a',
      label: '条件分支网关1'
    },
    {
      renderKey: 'NODE',
      id: 'conditionNode_0dcbc3f5fb7',
      label: '分支节点3'
    },
    {
      renderKey: 'NODE',
      id: 'conditionRouteNode_e42f4558a8e',
      label: '条件分支网关2'
    },
    {
      renderKey: 'NODE',
      id: 'conditionNode_5d25424ab30',
      label: '分支节点2'
    },
    {
      renderKey: 'NODE',
      id: 'approvalNode_8218ab809a2',
      label: '人工节点3'
    },
    {
      renderKey: 'NODE',
      id: 'conditionNode_0e2450245ea',
      label: '默认分支'
    },
    {
      renderKey: 'NODE',
      id: 'approvalNode_10dc646296a',
      label: '人工节点2'
    },
    {
      renderKey: 'NODE',
      id: 'virtualNode_441706b294b',
      label: '1'
    },
    {
      renderKey: 'NODE',
      id: 'approvalNode_31893cbb80a',
      label: '人工节点1'
    },
    {
      renderKey: 'NODE',
      id: 'conditionNode_d5c57c28dcf',
      label: '默认分支'
    },
    {
      renderKey: 'NODE',
      id: 'virtualNode_75084145629',
      label: '1'
    },
    {
      renderKey: 'NODE',
      id: 'endEvent_76e58674c9d',
      label: '结束'
    }
  ],
  edges: [
    {
      renderKey: 'EDGE',
      source: 'startEvent_baf4740da7a',
      target: 'conditionRouteNode_8ee4ce7c35a'
    },
    {
      renderKey: 'EDGE',
      source: 'conditionRouteNode_8ee4ce7c35a',
      target: 'conditionNode_0dcbc3f5fb7'
    },
    {
      renderKey: 'EDGE',
      source: 'conditionRouteNode_8ee4ce7c35a',
      target: 'conditionNode_d5c57c28dcf'
    },
    {
      renderKey: 'EDGE',
      source: 'conditionNode_0dcbc3f5fb7',
      target: 'conditionRouteNode_e42f4558a8e'
    },
    {
      renderKey: 'EDGE',
      source: 'conditionRouteNode_e42f4558a8e',
      target: 'conditionNode_5d25424ab30'
    },
    {
      renderKey: 'EDGE',
      source: 'conditionRouteNode_e42f4558a8e',
      target: 'conditionNode_0e2450245ea'
    },
    {
      renderKey: 'EDGE',
      source: 'conditionNode_5d25424ab30',
      target: 'approvalNode_8218ab809a2'
    }
  ]
}

export const data = {
  nodes: [
    {
      id: 'root1',
      renderKey: 'NODE'
    },
    {
      id: 'down1',
      renderKey: 'NODE'
    },
    {
      id: 'down2',
      renderKey: 'NODE'
    },
    {
      id: 'down3',
      renderKey: 'NODE'
    }
  ],
  edges: [
    {
      source: 'root1',
      target: 'down1',
      renderKey: 'EDGE'
    },
    {
      source: 'root1',
      target: 'down2',
      renderKey: 'EDGE'
    },
    {
      source: 'root1',
      target: 'down3',
      label: '1:N(纯文本)'
    }
  ]
}
