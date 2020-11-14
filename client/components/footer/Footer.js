import * as React from 'react'
import './footer.less'

const Footer = () => (
    <div className='footer-wrapper'>
        <div className="ww">
            <br />
            <br />
            <br />
            <p>Designed & Powerd by lianxiaozhuang </p>
            <p>Copyright© {(new Date()).getFullYear()} 前端技术博客</p>
            <p>京ICP备000000号</p>
        </div>
    </div >
)

export default Footer
