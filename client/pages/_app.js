import App, { Container } from 'next/app'
import 'antd/dist/antd.css'
import '@/src/styles/globals.less'
import getConfig from 'next/config'
import Router from 'next/router'
import { tagList, categoryList, publishList } from '@/src/api'
import { BackTop } from 'antd';

Router.events.on('routeChangeComplete', () => {
    setTimeout(() => {
        document.documentElement.scrollTop = 0;
    }, 0);
});
Router.events.on('routeChangeStart', (...args) => {
    console.log('1.routeChangeStart->路由开始变化,参数为:', ...args)
})

function MyApp (props) {
    const { Component, pageProps, ca, tags, list } = props
    return (
        <>
            <BackTop />
            <Component {...pageProps} ca={ca?.rows || []} tags={tags?.rows || []} list={list} />
        </>
    )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const rr = await Promise.all([
        categoryList(),
        tagList(),
        publishList({ page: 1, size: 10 })
    ]);
    let pageProps = {}
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps({ ctx })
    }
    return { ca: rr[0], tags: rr[1], list: rr[2], pageProps };
};
export default MyApp
