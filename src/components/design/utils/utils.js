
// 模拟网络请求
export function getAction(){
  return new Promise((resolve)=> {
    setTimeout(()=> {
      resolve({})
    }, 600)
  })
}