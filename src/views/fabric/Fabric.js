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
  const canvas = useRef()
  const add = () => {
    const r = new fabric.Rect({
      left: 50,//距离画布左侧的距离，单位是像素
      top: 50,//距离画布上边的距离
      fill: 'red',//填充的颜色
      width: 100,//方形的宽度
      height: 100//方形的高度
    });
    setRect(r)
    canvas.current.add(r)
  }

  const move = () => {
    rect.set({
      left: 200
    })
    canvas.current.renderAll()
  }


  useEffect(() => {
    // const canvas = new fabric.Canvas('main')
    canvas.current = new fabric.Canvas('main')
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
export default Fabric;
