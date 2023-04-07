import { useState, useEffect } from 'react'
import { Document, pdfjs, Page } from 'react-pdf'
import styled from '@emotion/styled'
import { mock } from './mock'
import PdfView from '../../components/pdfView'


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

function About() {
  const [data, setData] = useState(null)

  const url =
    'http://datapandora01.oss-cn-shenzhen.aliyuncs.com/codeless/XeWfYA5BMi/data_1sr07nyshe77.pdf'

  // return <PdfView file={data} show={true}></PdfView>
  return <PdfView file={data}></PdfView>
}
export default About
