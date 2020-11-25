import 'antd/dist/antd.css'
import '@/src/styles/globals.less'
import Router from 'next/router'
import { tagList, categoryList, sysInfo } from '@/src/api'
import { BackTop } from 'antd';

Router.events.on('routeChangeComplete', () => {
    setTimeout(() => {
        document.documentElement.scrollTop = 0;
    }, 0);
});

function MyApp (props) {
    const { Component, pageProps, ca, tags, sysinfo } = props
    return (
        <>
            <BackTop />
            <Component
                {...pageProps}
                ca={ca?.rows || []}
                tags={tags?.rows || []}
                sysinfo={sysinfo[0] || {}}
                router={props.router}
            />
        </>
    )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const rr = await Promise.all([
        categoryList(),
        tagList(),
        sysInfo()
    ]);
    let pageProps = {}
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps({ ctx })
    }
    return { ca: rr[0], tags: rr[1], sysinfo: rr[2], pageProps };
};
export default MyApp
