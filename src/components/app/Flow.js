import { useRef, useState, useEffect } from 'react'
import {
  CanvasScaleToolbar,
  CanvasMiniMap,
  CanvasSnapline,
  XFlow,
  XFlowCanvas
  // XFlowGraphCommands
} from '@antv/xflow'
import styled from '@emotion/styled'
import '@antv/xflow/dist/index.css'

import { useGraphConfig } from '../../utils/useGraphConfig'
// import { useEffect, useState } from 'react/cjs/react.production.min'

// https://github.com/antvis/XFlow/blob/master/packages/xflow-core/src/xflow-main/components/index.tsx

const Box = styled.div`
  height: 700px;
`

const defaultData = {
  nodes: [],
  edges: []
}

const Flow = (props) => {
  const { data } = props
  const appRef = useRef(null)
  const [chartData, setChartData] = useState(defaultData)

  const graphConfig = useGraphConfig()
  const onLoad = (app) => {
    console.log('onLoad')
    appRef.current = app
  }

  useEffect(() => {
    console.log(data, 'ddd---')
    setChartData(data)
  }, [data])

  return (
    <Box>
      <XFlow
        graphData={chartData}
        graphLayout={{
          layoutType: 'dagre',
          layoutOptions: {
            type: 'dagre',
            rankdir: 'TB',
            nodesep: 60,
            ranksep: 40
          }
        }}
        onLoad={onLoad}
        // isAutoCenter={true}
      >
        <XFlowCanvas config={graphConfig}>
          <CanvasScaleToolbar position={{ top: 12, left: 12 }} />
          <CanvasMiniMap
            miniMapClz="xflow-custom-minimap"
            nodeFillColor="#ccc"
            minimapOptions={{
              width: 200,
              height: 120
            }}
            position={{ top: 12, right: 12 }}
          />
          <CanvasSnapline color="#1890ff" />
        </XFlowCanvas>
      </XFlow>
    </Box>
  )
}

export default Flow
