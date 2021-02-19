const requireDirectory = require('require-directory')
const Router = require('koa-router')
const httpExp = require('@/middleware/httpExp');
const logger = require('@/middleware/logger');
const auth = require('@/middleware/auth')

class InitManager {
    static initCore(app) {
        //入口方法
        InitManager.app = app;
        app.use(logger());
        app.use(httpExp());
        app.use(auth())

        // InitManager.loadConfig(app)
        InitManager.initModels(app)

        InitManager.initLoadRouters(app)
        // InitManager.loadHttpException();


    }

    // static loadConfig (app) {
    //     const config = require('@/config/index')
    //     app.config = config
    // }
    static initModels(app) {
        const m = require('../models/index')
        m.init()
    }
    static initLoadRouters(app) {
        //path config
        requireDirectory(module, `${process.cwd()}/src/routes`, {
            visit: function whenLoadModule(obj) {
                if (obj instanceof Router) {
                    app.use(obj.routes());
                    app.use(obj.allowedMethods());
                }
            },
        });
    }

    // static loadHttpException () {
    //     const errors = require('./http-exception')
    //     global.errs = errors
    // }


}

module.exports = InitManager