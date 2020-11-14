import * as React from 'react';
import Head from 'next/head';


const HeadSetUp = (props) => (
    <Head>
        <title>{props.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />

        <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta content="always" name="referrer" />
        {/* 无人货柜 */}
        <meta name="description" content="前端笔记" />
        <link rel="shortcut icon" href="/favicon.ico"></link>
    </Head>
)

export default HeadSetUp
