import { useState } from 'react'
import { Document, pdfjs, Page } from 'react-pdf'
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined
} from '@ant-design/icons'
import styled from '@emotion/styled'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const Box = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 30000;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
`

const ContentBox = styled.div`
  position: relative;
`

const ControllerBox = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 83px;
  z-index: 30001;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
`

const ControllerInner = styled.div`
  background: rgba(33, 33, 33, 0.7);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 14px;
  color: #fff;
`

const ControllerItem = styled.div`
  padding: 0 10px;
`

const PdfBox = styled.div`
  height: 100%;
  overflow-x: hidden;
`

const scaleStep = 0.2

const getCorrectNumber = (n) => Number(n.toPrecision(12))

/**
 * pdf预览组件
 * @param file string | object
 */
function PdfView({ file, show = false }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1)

  function onDocumentLoadSuccess({ numPages, ...other }) {
    setNumPages(numPages)
    console.log('success', numPages, other)
  }

  return (
    show && (
      <Box>
        <ContentBox>
          <PdfBox>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={{
                cMapUrl: 'cmaps/',
                cMapPacked: true
              }}
            >
              <Page pageNumber={pageNumber} scale={scale} />
            </Document>
          </PdfBox>

          <ControllerBox>
            <ControllerInner>
              <ControllerItem>
                <ZoomOutOutlined
                  onClick={() =>
                    setScale(
                      scale <= scaleStep
                        ? scaleStep
                        : getCorrectNumber(scale - scaleStep)
                    )
                  }
                />
              </ControllerItem>
              <ControllerItem>{parseInt(scale * 100)}%</ControllerItem>
              <ControllerItem>
                <ZoomInOutlined
                  onClick={() =>
                    setScale(
                      scale >= scaleStep * 10
                        ? getCorrectNumber(scaleStep * 10)
                        : getCorrectNumber(scale + scaleStep)
                    )
                  }
                />
              </ControllerItem>
              <ControllerItem>
                {pageNumber}/{numPages}
              </ControllerItem>
              {numPages > 1 && (
                <ControllerItem>
                  <ArrowLeftOutlined
                    onClick={() =>
                      setPageNumber(
                        pageNumber === 1 || numPages === 1 ? 1 : pageNumber - 1
                      )
                    }
                  />
                </ControllerItem>
              )}

              {numPages > 1 && (
                <ControllerItem>
                  <ArrowRightOutlined
                    onClick={() =>
                      setPageNumber(
                        pageNumber === numPages || numPages === 1
                          ? numPages
                          : pageNumber + 1
                      )
                    }
                  />
                </ControllerItem>
              )}
              <ControllerItem style={{ borderLeft: 'solid 1px #fff' }}>
                <CloseOutlined />
              </ControllerItem>
            </ControllerInner>
          </ControllerBox>
        </ContentBox>
      </Box>
    )
  )
}
export default PdfView
