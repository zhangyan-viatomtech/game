
module.exports = {
    // 基本路径
    publicPath: './',
    // webpack-dev-server 相关配置
    devServer: {
        host: '0.0.0.0',
        port: 8082,
        open: true,
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                target: `http://localhost:8082`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        disableHostCheck: true
    }
}
