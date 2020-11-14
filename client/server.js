const express = require('express')
const next = require('next')
const compression = require('compression')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var log4js = require("log4js");
log4js.configure(
    {
        appenders: {
            file: {
                type: 'file',
                filename: './logs/out.log',
                maxLogSize: 10 * 1024 * 1024, // = 10Mb
                backups: 5, // keep five backup files
                compress: true, // compress the backups
                encoding: 'utf-8',
                mode: 0o0640,
                flags: 'w+'
            },
            dateFile: {
                type: 'dateFile',
                filename: './logs/data.log',
                pattern: 'yyyy-MM-dd-hh',
                compress: true
            },
            out: {
                type: 'stdout'
            }
        },
        categories: {
            default: { appenders: ['file', 'dateFile', 'out'], level: 'trace' }
        }
    }
);

var logger = log4js.getLogger("blog_pc");

console.log('process.env.PORT', process.env.PORT)

const port = process.env.PORT || 8080;

app.prepare()
    .then(() => {
        const server = express()
        if (!dev) {
            server.use(compression()) //gzip
        }
        server.get('*', (req, res) => {
            return handle(req, res)
        })
        server.listen(port, (err) => {
            if (err) throw err;

            logger.info(' process.env.RUN_ENV: ', process.env.NEXT_PUBLIC_RUN_ENV)
            logger.info('> Ready on http://localhost ' + port + '\n');
        })

    })
    .catch((ex) => {
        logger.error(ex.stack);
        //console.error(ex.stack)
        process.exit(1)
    })
