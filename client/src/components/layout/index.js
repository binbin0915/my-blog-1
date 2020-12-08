import React, { forwardRef } from 'react'
import TopNav from '../topnav/TopNav'
import HeadSetUp from '../sethead/HeadSetUp'
import Footer from '../footer/Footer'
import './index.less'

const UserLayout = forwardRef((props, navRef) => {
    return (
        <div className={`layout ${props.className}`}>
            <HeadSetUp title={props.title} sysinfo={props.sysinfo} />
            <TopNav ca={props.ca} caClick={props.caClick} tags={props.tags} ref={navRef} sysinfo={props.sysinfo} />
            <div className="main-wrapper">
                {props.children}
            </div>
            {!props.nofooter && <Footer sysinfo={props.sysinfo} />}
        </div >
    )
})

export default UserLayout