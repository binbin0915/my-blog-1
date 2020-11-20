import React from 'react';
import { lazyLoad } from '@/utils/lazyLoad'

const App404 = lazyLoad(React.lazy(() => import(/* webpackChunkName: "App404" */`./App404`)))
const Regist = lazyLoad(React.lazy(() => import(/* webpackChunkName: "user" */`./user/Regist`)))
const Login = lazyLoad(React.lazy(() => import(/* webpackChunkName: "user" */`./user/Login`)))
const Info = lazyLoad(React.lazy(() => import(/* webpackChunkName: "user" */`./user/Info`)))
const PermissionMgt = lazyLoad(React.lazy(() => import(/* webpackChunkName: "user" */`./user/PermissionMgt`)))
const ArticleList = lazyLoad(React.lazy(() => import(/* webpackChunkName: "ArticleList" */`./article/ArticleList`)))
const ArticleTags = lazyLoad(React.lazy(() => import(/* webpackChunkName: "ArticleList" */`./article/ArticleTags`)))
const ArticleCategory = lazyLoad(React.lazy(() => import(/* webpackChunkName: "ArticleList" */`./article/ArticleCategory`)))

export default {
    App404,
    Login,
    Regist,
    Info,
    PermissionMgt,
    ArticleList,
    ArticleTags,
    ArticleCategory,
}