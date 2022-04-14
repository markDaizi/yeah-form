// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  lintOnSave: true,
  devServer: {
    open: true, // 项目启动时是否自动打开浏览器
    overlay: {
      warnings: true,
      errors: true,
    },
    hot: true,
  },
};
