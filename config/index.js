'use strict'
const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/':{
        target: 'http://192.168.155.56', //开发环境
        // target: 'http://192.168.155.26', //测试环境
      },
    },
    host: '0.0.0.0', // 是为了支持手机通过ip访问
    // host: 'localhost', // 支持开vpn 在远程调试
    port: 11111,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css', 'less'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
