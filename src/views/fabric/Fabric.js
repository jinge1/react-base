import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import styled from "@emotion/styled";
import { Button } from 'antd';

const Box = styled.div`
background: #eee;
`
const Control = styled.div`
margin: 6px 0;
background: #ccc;
padding: 4px 0;
`
const Content = styled.div`
background: #ddd;
height: 300px;
`

function Fabric () {
  const [rect, setRect] = useState(null)
  const [line, setLine] = useState(null)
  const canvas = useRef()
  const add = () => {
    const r = new fabric.Rect({
      noScaleCache: false,
      strokeUniform: true,
      stroke: '#000',
      strokeWidth: 4,
      left: 50,//距离画布左侧的距离，单位是像素
      top: 50,//距离画布上边的距离
      fill: 'red',//填充的颜色
      width: 100,//方形的宽度
      height: 100 //方形的高度
    });
    const l = new fabric.Line([90, 50, 90, 150], {
      stroke: 'green',
      strokeUniform: true,
      strokeWidth: 8
      // cornerSize: 30
    })
    canvas.current.add(r)
    canvas.current.add(l)
    setRect(r)
    setLine(l)
  }

  const move = () => {
    rect.set({
      left: 200
    })
    canvas.current.renderAll()
  }


  useEffect(() => {
    // const canvas = new fabric.Canvas('main')
    canvas.current = new fabric.Canvas('main', {
      preserveObjectStacking: true
    })
  }, [])



  return (
    <Box>
      <Control>
        <Button type="primary" onClick={add}>新增</Button>
        <Button onClick={move}>移动</Button>
        <Button type="dashed">删除</Button>
      </Control>
      <Content>
        <canvas id="main" height="300" width="1000"></canvas>
      </Content>

    </Box>
  )
}

// https://www.cnblogs.com/rachelch/p/14172947.html
// https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/704333/#outline__4_8
export default Fabric;
