import axios from '@/src/config/axios';
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
