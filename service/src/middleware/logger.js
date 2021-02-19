var log4js = require("log4js");
log4js.configure(
    {
        pm2: true,
        disableClustering: true,    // 这里这里
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

var logger = log4js.getLogger("koa_app");
module.exports = () => async (ctx, next) => {
    ctx.logger = logger
    await next();
};
