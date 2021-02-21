

var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var mailConfig = require('@/config/index.js').email

smtpTransport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.qq.com',
    port: 465,
    secureConnection: true, // 使用了 SSL
    auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
    }
}));

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
async function sendMail(recipient, subject, html) {

    await smtpTransport.sendMail({

        from: mailConfig.user,
        to: recipient,
        subject: subject,
        html: html

    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        console.log('发送成功')
    });
}
function htmlFn(content, reply) {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .div {
            width: 300px;
            margin: 0 auto;
            text-align: center;
        }

        .see {
            display: block;
            color: #fff;
            background: #1890ff;
            border-color: #1890ff;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
            -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
            line-height: 32px;
            display: inline-block;
            white-space: nowrap;
            height: 32px;
            padding: 4px 15px;
            font-size: 14px;
            border-radius: 2px;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="div">
    <img style="width:100px;border-radius:50%" src="https://lianxiaozhuang.oss-cn-beijing.aliyuncs.com/xz1024/img/system/av.jpg" alt="">
        <p>来自 <a target="_blank" href="https://www.xz1024.top"> 前端老狗博客 </a> 的回复</p>
        <p>
            您的留言：${content}
        </p>
        <p>
            回复：${reply}
        </p>
        <br>
        <br>
        <a class="see" target="_blank" href="https://www.xz1024.top/message">去查看留言</a>

    </div>

</body>

</html>
    `
}
module.exports = {

    sendMail,
    htmlFn

};