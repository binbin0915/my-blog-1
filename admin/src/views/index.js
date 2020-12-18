import React from 'react';
import { lazyLoad } from '@/utils/lazyLoad'

const App404 = lazyLoad(React.lazy(() => import(/* webpackChunkName: "App404" */`./App404`)))
const Regist = lazyLoad(React.lazy(() => import(/* webpackChunkName: "user" */`./user/Regist`)))
const Login = lazyLoad(React.lazy(() => import(/* webpackChunkName: "user" */`./user/Login`)))
const Info = lazyLoad(React.lazy(() => import(/* webpackChunkName: "user" */`./user/Info`)))
const SysSet = lazyLoad(React.lazy(() => import(/* webpackChunkName: "user" */`./system/SystemSet`)))
const PermissionMgt = lazyLoad(React.lazy(() => import(/* webpackChunkName: "user" */`./user/PermissionMgt`)))
const ArticleList = lazyLoad(React.lazy(() => import(/* webpackChunkName: "ArticleList" */`./article/ArticleList`)))
const ArticleEdit = lazyLoad(React.lazy(() => import(/* webpackChunkName: "ArticleEdit" */`./article/ArticleEdit`)))
const BookList = lazyLoad(React.lazy(() => import(/* webpackChunkName: "ArticleList" */`./book/BookList`)))
const MessageList = lazyLoad(React.lazy(() => import(/* webpackChunkName: "MessageList" */`./message/MessageList`)))
const ArticleTags = lazyLoad(React.lazy(() => import(/* webpackChunkName: "ArticleList" */`./article/ArticleTags`)))
const ArticleCategory = lazyLoad(React.lazy(() => import(/* webpackChunkName: "ArticleList" */`./article/ArticleCategory`)))

export default {
    App404,
    Login,
    Regist,
    Info,
    SysSet,
    PermissionMgt,
    ArticleList,
    ArticleEdit,
    BookList,
    MessageList,
    ArticleTags,
    ArticleCategory,
}