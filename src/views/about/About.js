import GridLayout, {
  Responsive as ResponsiveGridLayout
} from 'react-grid-layout'
import styled from '@emotion/styled'

const Box = styled.div`
  position: relative;
`

const CompA = styled.div`
  background: orange;
`

const CompB = styled.div`
  background: gray;
`

const CompC = styled.div`
  background: green;
`

const CompD = styled.div`
  position: relative;
  background: #990000;
`

function About() {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 }
  ]
  return (
    <Box>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <CompA key="a">a</CompA>
        <CompB key="b">b</CompB>
        <CompC key="c">c</CompC>
        <CompD key="d">
          <GridLayout
            className="layout"
            layout={layout}
            cols={3}
            rowHeight={30}
            width={300}
          >
            <CompA key="aa">a</CompA>
            <CompB key="ab">b</CompB>
            <CompC key="ac">c</CompC>
          </GridLayout>
        </CompD>
      </GridLayout>
    </Box>
  )
}
export default About
