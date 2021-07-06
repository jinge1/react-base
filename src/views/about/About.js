import React from 'react';
import { Modal } from 'antd'
import * as PDFJS from "pdfjs-dist";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// const Dragger = Upload.Dragger;

PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default class ImportPdf extends React.Component {
  state = {
    pdf: '/spd.pdf',
    imgUrl: ''
  }

  // openPage (pdfFile, pageNumber, context) {
  //   var scale = 2;
  //   pdfFile.getPage(pageNumber).then(function (page) {
  //     // reference canvas via context
  //     const viewport = page.getViewport(scale);
  //     var canvas = context.canvas;
  //     canvas.width = viewport.width;
  //     canvas.height = viewport.height;
  //     canvas.style.width = "100%";
  //     canvas.style.height = "100%";
  //     var renderContext = {
  //       canvasContext: context,
  //       viewport: viewport
  //     };
  //     page.render(renderContext);
  //   });
  //   return;
  // }

  exportImg (page) {
    // 将 canvas 导出成 img
    // $('#pdf-container canvas').each(function (index, ele) {
    // const canvas = document.getElementById("pageNum");
    const canvas = document.createElement('canvas');

    var vp = page.getViewport({ scale: 1 });
    let ctx = canvas.getContext('2d')
    let dpr = window.devicePixelRatio || 1
    let bsr = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1
    let ratio = dpr / bsr
    let viewport = page.getViewport({ scale: window.innerWidth / vp.width });
    canvas.width = viewport.width * ratio
    canvas.height = viewport.height * ratio
    canvas.style.width = viewport.width + 'px'
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    let renderContext = {
      canvasContext: ctx,
      viewport: viewport
    }
    page.render(renderContext)
    document.getElementById('content').appendChild(canvas)




    // 将 canvas 转成 base64 格式的图片
    // let base64ImgSrc = canvas.toDataURL("image/png")
    // const img = document.createElement("img")
    // img.setAttribute('class', 'pdf-img');
    // img.src = base64ImgSrc
    // img.style.width = '100%';
    // img.onload = (e) => {
    //   console.log(e.path[0].currentSrc, 'eee---')
    //   if (!this.state.imgUrl) {
    //     this.setState({
    //       imgUrl: e.path[0].currentSrc
    //     })
    //   }
    // }
    // 将图片挂载到 dom 中
    // $('#pdf-container').append(img);
    // });
  }

  // readPdf (file) {
  //   // pdf.js无法直接打开本地文件,所以利用FileReader转换
  //   const reader = new FileReader();
  //   reader.readAsArrayBuffer(file);
  //   reader.onload = function (e) {
  //     const typedarray = new Uint8Array(this.result);
  //     const loadingTask = PDFJS.getDocument(typedarray);
  //     loadingTask.promise.then(function (pdf) {
  //       if (pdf) {
  //         // pdf 总页数
  //         const pageNum = pdf.numPages;
  //         console.log(pageNum, 'pageNum---')
  //         for (let i = 1; i <= pageNum; i++) {
  //           // 生成每页 pdf 的 canvas
  //           // const canvas = document.createElement('canvas');
  //           // canvas.id = "pageNum" + i;
  //           // 将 canvas 添加到 dom 中
  //           // $('#pdf-container').append(canvas);
  //           // const context = canvas.getContext('2d');
  //           // self.openPage(pdf, i, context);
  //         }
  //         // setTimeout(() => {
  //         //   self.exportImg(self)
  //         // }, 1000);
  //       }
  //     }).catch(function (reason) {
  //       console.error("Error: " + reason);
  //     });
  //   };
  // }

  render () {
    // this.readPdf(this.state.pdf)
    PDFJS.getDocument(this.state.pdf).promise.then((pdf) => {
      console.log(pdf, '---')
      pdf.getPage(3).then(page => {
        this.exportImg(page)
      })

    })
    // const self = this;
    // const uploadProps = {
    //   name: 'file',
    //   accept: '.pdf',
    //   action: '',
    //   onChange (info) {
    //     const status = info.file.status;
    //     if (status != 'done') {
    //       self.setState({ loading: true });
    //     }
    //     if (status !== 'uploading') {
    //       console.log(info.file, info.fileList);
    //     }
    //     if (status === 'done') {
    //       self.setState({ loading: false });
    //       // message.success(`${info.file.name} 导入成功`);
    //       // 解析 pdf 文件
    //       self.readPdf(info.file.originFileObj);
    //     } else if (status === 'error') {
    //       console.log(`${info.file.name} 导入失败`);
    //     }
    //   },
    // };
    return (
      <div>
        {this.state.imgUrl ? <img src={this.state.imgUrl} alt="hello" /> : null}
        {/* <canvas id="pageNum" width="1000"></canvas> */}
        <div id="content"></div>
      </div>
      // <Modal
      //   title="导入pdf"
      //   width={480}
      //   className="import-pdf-modal"
      //   footer={null}
      // >
      //   <Spin tip="导入中" spinning={this.state.loading}>
      //     <Dragger {...uploadProps} id="document">
      //       <p className="ant-upload-drag-icon">
      //         <Icon type="inbox" />
      //       </p>
      //       <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
      //       <p className="ant-upload-hint">支持扩展名：.pdf</p>
      //       <div id='pdf-container' style={{ height: 0, overflow: 'hidden' }}></div>
      //     </Dragger>
      //   </Spin>
      // </Modal>
    )
  }
}