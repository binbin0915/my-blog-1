export default [
    {
        path: '/user',
        subs: [
            { path: '/user/login', title: '登录', name: "login", component: 'Login' },
            { path: '/user/regist', title: '注册', name: "regist", component: 'Regist' },
            { path: '/user/info', title: '个人中心', name: "info", component: 'Info' },
            { path: '/user/permissionMgt', title: '用户权限', name: "permissionMgt", component: 'PermissionMgt' },
        ],
    },
    {
        path: '/article',
        subs: [
            { path: '/article/list', title: '文章列表', name: "ArticleList", component: 'ArticleList' },
            { path: '/article/edit', title: '文章编辑', name: "ArticleEdit", component: 'ArticleEdit' },
            { path: '/article/tags', title: '标签管理', name: "ArticleTags", component: 'ArticleTags' },
            { path: '/article/category', title: '分类管理', name: "ArticleCategory", component: 'ArticleCategory' },
        ],
    },
    {
        path: '/book',
        subs: [
            { path: '/book/list', title: '书籍列表', name: "BookList", component: 'BookList' },
        ],
    },
    {
        path: '/message',
        subs: [
            { path: '/message/list', title: '留言列表', name: "MessageList", component: 'MessageList' },
        ],
    },
    {
        path: '/sys',
        subs: [
            { path: '/sys/set', title: '系统设置', name: "SysSet", component: 'SysSet' },
        ],
    },
    { path: '/404', title: '404', name: "404", component: 'App404' },

]

export const whiteList = ['regist', 'login']