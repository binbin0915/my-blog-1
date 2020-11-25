import 'antd/dist/antd.css'
import '@/src/styles/globals.less'
import Router from 'next/router'
import { tagList, categoryList, publishList, sysInfo } from '@/src/api'
import { withRouter } from 'next/router'
import { BackTop } from 'antd';

Router.events.on('routeChangeComplete', () => {
    setTimeout(() => {
        document.documentElement.scrollTop = 0;
    }, 0);
});

function MyApp (props) {
    const { Component, pageProps, ca, tags, list, sysinfo } = props
    return (
        <>
            <BackTop />
            <Component
                {...pageProps}
                ca={ca?.rows || []}
                tags={tags?.rows || []}
                sysinfo={sysinfo[0] || {}}
                list={list}
                router={props.router}
            />
        </>
    )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const rr = await Promise.all([
        categoryList(),
        tagList(),
        publishList({ page: 1, size: 10 }),
        sysInfo()
    ]);
    let pageProps = {}
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps({ ctx })
    }
    return { ca: rr[0], tags: rr[1], list: rr[2], sysinfo: rr[3], pageProps };
};
export default withRouter(MyApp)
