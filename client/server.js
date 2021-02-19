const express = require('express')
const next = require('next')
const compression = require('compression')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 80;
const path = require("path")
const { createProxyMiddleware } = require('http-proxy-middleware');

app.prepare()
    .then(() => {
        const server = express()
        if (!dev) {
            server.use(compression()) //gzip
        }
        server.use('/api',
            createProxyMiddleware({
                target: 'http://localhost:4000',
                pathRewrite: {
                    '^/api': '/'
                },
                changeOrigin: true
            })
        );
        server.use('/oss/',
            createProxyMiddleware({
                target: 'https://lianxiaozhuang.oss-cn-beijing.aliyuncs.com/',
                pathRewrite: {
                    '^/oss': '/'
                },
                changeOrigin: true
            })
        );

        server.get('*', (req, res) => {
            return handle(req, res)
        })
        server.listen(port, (err) => {
            if (err) throw err;

            console.log(' process.env.RUN_ENV: ', process.env.RUN_ENV)
            // console.log('> Ready on http://localhost:' + port + '\n');
        })

    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })
