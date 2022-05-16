const path = require('path')
const {
  override,
  addWebpackAlias,
  addLessLoader,
  addWebpackPlugin,
  addWebpackResolve
} = require('customize-cra')
const ProgressBar = require('progress-bar-webpack-plugin')

const resolve = (dir) => path.join(__dirname, '.', dir)
module.exports = override(
  addWebpackPlugin(new ProgressBar()), // 添加进度条
  addWebpackResolve({
    extensions: ['.js', '.jsx', '.json', '.less', '.css']
  }),
  addWebpackAlias({
    ['@']: resolve('src')
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {}
    }
  })
)
