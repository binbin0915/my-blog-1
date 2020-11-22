import React, { useRef, forwardRef } from 'react'
import TopNav from '../topnav/TopNav'
import HeadSetUp from '../sethead/HeadSetUp'
import Footer from '../footer/Footer'
import GoTop from '../move/GoTop'
import './index.less'
const UserLayout = forwardRef((props, navRef) => {
    return (
        <div className={`layout ${props.className}`}>
            {props.goTop !== undefined ? <GoTop /> : null}
            <HeadSetUp title={props.title} />
            <TopNav ca={props.ca} caClick={props.caClick} ref={navRef} />
            <div className="main-wrapper">
                {props.children}
            </div>
            <Footer />
        </div >
    )
})

export default UserLayout