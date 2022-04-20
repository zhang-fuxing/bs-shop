const {defineConfig} = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
    lintOnSave: false,
    devServer: {
        port: 2000
    },
    transpileDependencies: true,
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ],


    },

})
