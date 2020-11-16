import request from './request'

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

export function loginOut () {
    return request({
        url: '/user/logout',
        method: 'post',
        data: {
            body: ''
        },
        needNotToken: true,
    })
}

