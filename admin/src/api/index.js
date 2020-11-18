import request from './request'
/**
 * 
 * @param {user} user 
 */
export function login (data) {
    return request({
        url: '/user/login',
        method: 'post',
        data,
    })
}
export function regist (data) {
    return request({
        url: '/user/regist',
        method: 'post',
        data,
    })
}
export function getUseInfo () {
    return request({
        url: '/user/getuserinfo',
        method: 'get',
    })
}
export function updataInfo (data) {
    return request({
        url: '/user/updatainfo',
        method: 'post',
        data,
    })
}

/**
 * article
 */

export function articleList (data) {
    return request({
        url: '/article/list',
        method: 'post',
        data,
    })
}

export function articleAdd (data) {
    return request({
        url: '/article/add',
        method: 'post',
        data,
    })
}
export function articlePublish (data) {
    return request({
        url: '/article/publish',
        method: 'post',
        data,
    })
}
export function articleUpdata (data) {
    return request({
        url: '/article/updata',
        method: 'post',
        data,
    })
}
/**
 * category
 */
export function categoryList (data) {
    return request({
        url: '/category/list',
        method: 'post',
        data,
    })
}
export function categoryAdd (data) {
    return request({
        url: '/category/add',
        method: 'post',
        data,
    })
}
export function categoryDel (data) {
    return request({
        url: '/category/del',
        method: 'post',
        data,
    })
}
export function categoryUpadata (data) {
    return request({
        url: '/category/updata',
        method: 'post',
        data,
    })
}
/**
 * tags
 */
export function tagList (data) {
    return request({
        url: '/tags/list',
        method: 'post',
        data,
    })
}
export function tagAdd (data) {
    return request({
        url: '/tags/add',
        method: 'post',
        data,
    })
}
export function tagDel (data) {
    return request({
        url: '/tags/del',
        method: 'post',
        data,
    })
}
export function tagUpadata (data) {
    return request({
        url: '/tags/updata',
        method: 'post',
        data,
    })
}