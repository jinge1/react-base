export const data = {
  nodes: [
    {
      id: '1',
      name: 'node1',
      label: 'node1',
      type: 'circle',
      size: 30,
      x: 10,
      y: 10 * 20,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5]
      ]
    },
    {
      id: '2',
      name: 'node2',
      label: 'node3',
      x: 20,
      y: 20 * 20
    },
    {
      id: '3',
      name: 'node3',
      label: 'node3',
      x: 30,
      y: 30 * 20
    },
    {
      id: '4',
      name: 'node4',
      label: 'node4',
      x: 40,
      y: 40 * 20
    },
    {
      id: '5',
      name: 'node5',
      label: 'node5',
      x: 50,
      y: 50 * 20
    }
  ],
  edges: [
    {
      source: '1',
      target: '2',
      // label: 'edge-11',
      type: 'mid-point-edge'
    },
    {
      source: '1',
      target: '3',
      // label: 'edge-2',
      type: 'mid-point-edge'
    },
    {
      source: '2',
      target: '4'
      // label: 'edge-1'
    },
    {
      source: '4',
      target: '5'
      // label: 'edge-3'
    },
    {
      source: '3',
      target: '5'
      // label: 'edge-4'
    }
  ]
}
