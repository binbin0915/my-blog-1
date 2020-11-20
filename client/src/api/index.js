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
export function archives (data) {
    return request({
        url: '/article/archives',
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
