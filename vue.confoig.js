// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  lintOnSave: true,
  publicPath: "/yeah-form/",
  devServer: {
    open: true, // 项目启动时是否自动打开浏览器
    overlay: {
      warnings: true,
      errors: true,
    },
    hot: true,
  },
};
