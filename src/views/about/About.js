import { useState, useEffect } from 'react'
import { Document, pdfjs, Page } from 'react-pdf'
import styled from '@emotion/styled'
import { mock } from './mock'
import PdfView from '../../components/pdfView'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

function About() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const init = async () => {
      fetch(
        'http://sit-slb.datapandora.net/hm-codeless-app-test/dataworkprinttemplate/preview/data_idizy00whu',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            csrf_token: 'test',
            Referer: 'http://192.168.5.103:9999/',
            token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXRoIjpbXSwidW5pb25pZCI6IjEyMyIsImRpbmdJZCI6IjEyMyIsInVuaXRJZCI6MTE1LCJpZCI6MTU3LCJhdmF0YXIiOiIiLCJleHAiOjE2Nzc4MDgxNDYsImlkQmluZHMiOiIxNTcsMTE1IiwidXNlcm5hbWUiOiLmnInpmZDlhazlj7gifQ.mVMB0ikK2NBIOaz2qFsd5X32cgP5_uiwoUEa5zutF38'
          },
          body: JSON.stringify(mock)
        }
      )
        .then(({ body }) => {
          console.log(body, 'body---', typeof body)
          return body
        })
        .then((stream) => new Response(stream))
        .then((res) => res.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => setData(url))
        .catch((err) => console.error(err))
    }
    // init()
  }, [])

  const url =
    'http://datapandora01.oss-cn-shenzhen.aliyuncs.com/codeless/XeWfYA5BMi/data_1sr07nyshe77.pdf'

  // return <PdfView file={data} show={true}></PdfView>
  return <PdfView file={data}></PdfView>
}
export default About
