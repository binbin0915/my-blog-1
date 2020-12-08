import * as React from 'react'
import './footer.less'

const Footer = (props) => (
    <div className='footer-wrapper'>
        <div className="ww">
            <div dangerouslySetInnerHTML={{
                __html: props.sysinfo.footer ||
                    `
                                <p>Copyright© 2020 前端技术博客</p> 
                                <p>Designed & Powerd by lianxiaozhuang </p>
                                <p><a href='https://www.baidu.com' target="_blank">京ICP备000000号</a></p>
                                `
            }}>
            </div>
        </div>
    </div >
)

export default Footer
