import axios from '@/config/axios';
import { setInfo, removeInfo } from '@/utils/auth';
import { message } from 'antd';
const request = function (params) {

    return new Promise((resolve, reject) => {
        axios(params).then((response) => {
            if (response && response.code) {
                let code = response.code;
                if (code === '0000') {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        resolve(response);
                    }
                } else if (code === '0001') {
                    removeInfo();
                    resolve(false);
                    message.error('登录信息失效！', 2, () => {
                        window.location.href = '/user/login'
                    })
                } else if (code === '0002') {
                    resolve(false);
                    message.error('权限不足，请联系管理员！', 2)
                } else {
                    resolve(response);
                }
            } else {
                response !== undefined ? resolve(response) : reject('未知错误');
            }
        })
            .catch((error) => {
                reject(error);
            });
    });
};

export default request;
