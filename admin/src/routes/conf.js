export default [
    {
        path: '/article', title: '',
        subs: [
            { path: '/article/list', title: 'article-list', name: "ArticleList", component: 'ArticleList' },
            { path: '/app/KeepAliveDemo', title: 'KeepAliveDemo', name: "KeepAliveDemo", component: 'KeepAliveDemo', cache: true },
        ],
    },
    { path: '/404', title: '404', name: "404", component: 'App404' },

] 