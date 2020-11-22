import request from './request'

/**
 * article
 */

export function publishList (data) {
    return request({
        url: '/article/publishList',
        method: 'post',
        data,
    })
}
export function read (data) {
    return request({
        url: '/article/read',
        method: 'post',
        data,
    })
}
export function archives (data) {
    return request({
        url: '/article/archives',
        method: 'post',
        data,
    })
}
export function booklist (data) {
    return request({
        url: '/book/list',
        method: 'post',
        data,
    })
}
export function getArticleDetail (data) {
    return request({
        url: '/article/detail',
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
export function tagArticle (data) {
    return request({
        url: '/tags/tagArticle',
        method: 'post',
        data,
    })
}