import { useRef, useState } from 'react'
// https://react-dnd.github.io/react-dnd/about
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'
import { TreeSelect } from 'antd'

const { SHOW_PARENT } = TreeSelect;
// 
const styles = css`
  .ab___cd .val {
    display: none;
  }
`

const Box = styled.div`
  .ant-select-selection-item .opt {
    display: none;
  }
`

const Content = styled.div`
  display: flex;
`

const ListBox = styled.div`
  width: 200px;
  margin-right: 20px;
  height: 300px;
  overflow: auto;
`

const coms = [
  { text: '文本框1' },
  { text: '日期选择2' },
  { text: '子表单3' },
  { text: '文本框4' },
  { text: '日期选择5' },
  { text: '子表单6' },
  { text: '文本框7' },
  { text: '日期选择8' },
  { text: '子表单9' },
  { text: '文本框10' },
  { text: '日期选择11' },
  { text: '子表单12' },
  { text: '文本框13' },
  { text: '日期选择14' },
  { text: '子表单15' },
  { text: '文本框16' },
  { text: '日期选择17' },
  { text: '子表单18' }
]

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1'
          },
          {
            value: 'leaf2',
            title: 'leaf2'
          }
        ]
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: (
              <b style={{ color: '#08c' }}>
                <span className="opt">leaf3</span>
                <span className="val">parent 1-1 leaf3</span>
              </b>
            )
          }
        ]
      }
    ]
  }
]

const MenuContent = () => {
  const [active, setActive] = useState(-1)
  return (
    <ListBox>
      {coms.map(({ text }, index) => (
        <MenuItem
          key={text}
          text={text}
          index={index}
          active={active}
          setActive={setActive}
        ></MenuItem>
      ))}
    </ListBox>
  )
}

const MenuItem = () => {}

const Test = () => {
  const [, drag] = useDrop(() => ({
    accept: 'CARD',
    hover(item, monitor) {
      console.log(monitor, 'monitor---', monitor.getClientOffset())
      return {
        isDragging: monitor.isDragging()
      }
    }
  }))
  return <div ref={drag}>test</div>
}

function Product() {
  const [value, setValue] = useState('')

  const onChange = (newValue) => {
    setValue(newValue)
  }

  return (
    <Box>
      <Global styles={styles}></Global>
      <TreeSelect
        showSearch
        dropdownRender={(data) => <div className="ab___cd">{data}</div>}
        style={{ width: '100%' }}
        value={value}
        showCheckedStrategy={SHOW_PARENT}
        treeCheckStrictly={true}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeCheckable={true}
        treeDefaultExpandAll
        onChange={onChange}
        treeData={treeData}
      />
    </Box>
  )
}
export default Product
