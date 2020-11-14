/* eslint-disable */
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const withCSS = require('@zeit/next-css');
const fs = require('fs')
const path = require('path')

console.log('process.env.NEXT_PUBLIC_RUN_ENV--', process.env.NEXT_PUBLIC_RUN_ENV)
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)
const configs = {
    assetPrefix: '/', //加前缀
    // basePath: '/', //node 
    // 编译文件的输出目录
    distDir: process.env.NEXT_PUBLIC_RUN_ENV === 'prod' ? 'dist-prod' : 'dist-qa',
    // 是否给每个路由生成Etag
    generateEtags: true,
    // 页面内容缓存配置
    onDemandEntries: {
        // 内容在内存中缓存的时长（ms）
        maxInactiveAge: 25 * 1000,
        // 同时缓存多少个页面
        pagesBufferLength: 2,
    },
    // 在pages目录下那种后缀的文件会被认为是页面
    pageExtensions: ['jsx', 'js', 'tsx'],
    // 配置buildId
    generateBuildId: async () => {
        if (process.env.YOUR_BUILD_ID) {
            return process.env.YOUR_BUILD_ID
        }

        // 返回null使用默认的unique id
        return null
    },
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
    },
    cssLoaderOptions: {

    },
    webpack: (config, { isServer }) => {
        // if (isServer) {
        //   const antStyles = /antd\/.*?\/style.*?/
        //   const origExternals = [...config.externals]
        //   config.externals = [
        //     (context, request, callback) => {
        //       if (request.match(antStyles)) return callback()
        //       if (typeof origExternals[0] === 'function') {
        //         origExternals[0](context, request, callback)
        //       } else {
        //         callback()
        //       }
        //     },
        //     ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        //   ]

        //   config.module.rules.unshift({
        //     test: antStyles,
        //     use: 'null-loader',
        //   })
        // }
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "./*"),
        };
        config.plugins.push(
            new FilterWarningsPlugin({
                exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
            })
        );
        return config
    },
}

if (typeof require !== 'undefined') {
    require.extensions['.css', '.less'] = file => { }
}

module.exports = withLess(withCSS({
    ...configs
}))