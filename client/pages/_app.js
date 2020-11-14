import App, { Container } from 'next/app'
import 'antd/dist/antd.css'
import '@/styles/globals.less'
// import '../styles/theme.less'
import getConfig from 'next/config'
// const { NEXT_APP_BASE_URL, NEXT_APP_RUN_ENV } = getConfig().publicRuntimeConfig
function MyApp ({ Component, pageProps }) {
  return (
    <>
      {/* {
        NEXT_APP_RUN_ENV !== 'prod' ?
          <div style={{
            position: 'fixed', left: '10px', bottom: '110px',
            zIndex: 9999, background: '#eee', lineHeight: '20px',
            padding: '10px'
          }}>
            测试：
            <br />
            NEXT_APP_RUN_ENV： {NEXT_APP_RUN_ENV}
            <br />
            NEXT_APP_BASE_URL {NEXT_APP_BASE_URL}

          </div>
          : null
      } */}
      <Component {...pageProps} />

    </>
  )
}


export default MyApp
