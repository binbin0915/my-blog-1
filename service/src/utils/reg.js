
export const emojiReg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
const strUrl =
    '^((https|http|ftp|rtsp|mms)?://)' +
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@ +
    '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184 +
    '|' + // 允许IP和DOMAIN（域名） +
    "([0-9a-z_!~*'()-]+.)*" + // 域名- www. +
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名 +
    '[a-z]{2,6})' + // first level domain- .com or .museum +
    '(:[0-9]{1,4})?' + // 端口- :80 +
    '((/?)|' + // a slash isn't required if there is no file name +
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
export const urlReg = new RegExp(strUrl);
export const hshAppVReg = /\/[\s]*?\d{1,2}\.\d{1,2}\.\d{1,2}[\s]*?\//g;
