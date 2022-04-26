export const data = {
  nodes: [
    {
      id: '1',
      name: 'node1',
      label: 'node1',
      anchorPoints: [
        [0, 0.5],
        [1, 0.5]
      ],
      conf: { a: 1 }
    },
    {
      id: '2',
      name: 'node2',
      label: 'node3'
    },
    {
      id: '3',
      name: 'node3',
      label: 'node3'
    },
    {
      id: '4',
      name: 'node4',
      label: 'node4'
    },
    {
      id: '5',
      name: 'node5',
      label: 'node5'
    }
  ],
  edges: [
    {
      source: '1',
      target: '2',
      label: 'edge-1',
      type: 'hvh',
      
    },
    {
      source: '1',
      target: '3',
      label: 'edge-1',
      type: 'hvh'
    },
    {
      source: '2',
      target: '4',
      label: 'edge-1'
    },
    {
      source: '4',
      target: '5',
      label: 'edge-1'
    },
    {
      source: '3',
      target: '5',
      label: 'edge-1'
    }
  ]
}
