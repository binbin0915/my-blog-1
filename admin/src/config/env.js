const u = navigator.userAgent;
const isWx = u.indexOf('micromessenger') !== -1;
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
const baseUrl = process.env.REACT_APP_BASE_URL;
const runEnv = process.env.REACT_APP_RUN_ENV;


export default {
    u,
    isWx,
    isiOS,
    isAndroid,
    baseUrl,
    runEnv,
}
