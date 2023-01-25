const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    //disableHostCheck: true,
    proxy: 'https://plankton-app-848ak.ondigitalocean.app/',
  },
  transpileDependencies: true,
  lintOnSave: false,

  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(4000000).maxAssetSize(4000000);
  },

});
