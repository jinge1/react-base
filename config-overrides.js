const path = require('path')
const {
  override,
  addWebpackAlias,
  addLessLoader,
  fixBabelImports,
  addPostcssPlugins,
  overrideDevServer,
} = require('customize-cra')
const { exit } = require('process')

// 5、本地开发时代理服务器解决跨域问题（仅仅本地开发有效）
const devServerConfig = () => (config) => {
  return {
    ...config,
    port: '8080',
    // 服务开启gzip
    compress: true,
    proxy: {
      '/': {
        target: 'http://192.168.100.118:8808/api',
        changeOrigin: true,
        pathRewrite: {
          '^/': '/',
        },
      },
    },
  }
}

const resolve = (dir) => path.join(__dirname, '.', dir)
module.exports = {
  webpack: override(
    addWebpackAlias({
      ['@']: resolve('src'),
    })
    // fixBabelImports('import', {
    //   libraryName: 'antd-mobile',
    //   style: 'css'
    // }),
    // addLessLoader({
    //   lessOptions: {
    //     javascriptEnabled: true,
    //     // Optionally adjust URLs to be relative. When false, URLs are already relative to the entry less file.
    //     relativeUrls: false,
    //     modifyVars: { '@primary-color': '#A80000' },
    //     // cssModules: {
    //     //   // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    //     //   localIdentName: "[path][name]__[local]--[hash:base64:5]",
    //     // }
    //   },
    // })
  ),
  // devServer: function(configFunction) {
  //   return function(proxy, allowedHost) {
  //     const config = configFunction(proxy, allowedHost);
  //     // config.port = 8080
  //     console.log(config, 'config---')
  //     exit()
  //     return config
  //   }
  // }
}
