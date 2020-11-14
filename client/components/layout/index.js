import React from 'react'
import TopNav from '../topnav/TopNav'
import HeadSetUp from '../sethead/HeadSetUp'
import Footer from '../footer/Footer'
import GoTop from '../move/GoTop'
import './index.less'


const UserLayout = ({
    className,
    title = '前端老狗',
    children,
    goTop,
}) => {

    return (
        <div className={`layout ${className}`}>
            {goTop !== undefined ? <GoTop /> : null}
            <HeadSetUp title={title} />
            <TopNav />
            <div className="main-wrapper">
                {children}
            </div>
            <Footer />
        </div >
    )
}
export default UserLayout