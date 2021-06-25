const path = require('path')
const {
    override,
    addWebpackAlias
} = require('customize-cra')

const resolve = dir => path.join(__dirname, '.', dir)
module.exports = override(
    addWebpackAlias({
        ['@']: resolve('src')
    })
)