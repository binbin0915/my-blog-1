import React from 'react';
import { lazyLoad } from '@/utils/lazyLoad'

const App404 = lazyLoad(React.lazy(() => import(/* webpackChunkName: "App404" */`./App404`)))

const ArticleList = lazyLoad(React.lazy(() => import(/* webpackChunkName: "ArticleList" */`./ArticleList`)))

//
const UseMemo = lazyLoad(React.lazy(() => import(/* webpackChunkName: "UseMemo" */`./UseMemo`)))


export default {
    App404,
    ArticleList,


    UseMemo,
}