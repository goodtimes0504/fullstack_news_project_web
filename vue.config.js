// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   chainWebpack: config => {
//     config.plugin('define').tap(args => {
//       Object.assign(args[0], {
//         __VUE_PROD_DEVTOOLS__: false,
//         __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
//       })
//       return args
//     })
//   }
// })

const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_TIPS__: JSON.stringify(false),
      }),
    ],
  },
  devServer: {
    proxy: {
      "/webapi": {
        target: "http://localhost:3000",
        changeOrigin: true,
      }
    }
  },

});
