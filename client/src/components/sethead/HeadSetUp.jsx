import * as React from 'react';
import Head from 'next/head';


const HeadSetUp = (props) => (
    <Head>
        <title>{props.title || "前端老狗"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
        <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta content="always" name="referrer" />
        <meta name="description" content={props.sysinfo.meta_description || "连小壮的个人网站，个人博客（www.xz1024.top），学习总结前端技术"} />
        <meta name="keyword" content={props.sysinfo.meta_keyword || "前端,JavaScript,js,Vue.js,react,React.js,连小壮"} data-react-helmet="true"></meta>
        <link rel="shortcut icon" href={props.sysinfo.ico || "https://lianxiaozhuang.oss-cn-beijing.aliyuncs.com/xz1024/img/system/favicon.ico"}></link>
    </Head>
)

export default HeadSetUp
