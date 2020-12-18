/* eslint-disable */
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css');

const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const configs = {
    assetPrefix: process.env.NEXT_PUBLIC_RUN_ENV === 'dev' ? '/' : 'https://lianxiaozhuang.oss-cn-beijing.aliyuncs.com/xz1024/dist/', //加前缀
    // basePath: '/', //node 
    // 编译文件的输出目录
    distDir: 'dist',
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
    webpack: (config, { isServer }) => {

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