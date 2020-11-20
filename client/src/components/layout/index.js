import React from 'react'
import TopNav from '../topnav/TopNav'
import HeadSetUp from '../sethead/HeadSetUp'
import Footer from '../footer/Footer'
import GoTop from '../move/GoTop'
import './index.less'
const UserLayout = (props) => {
    return (
        <div className={`layout ${props.className}`}>
            {props.goTop !== undefined ? <GoTop /> : null}
            <HeadSetUp title={props.title} />
            <TopNav ca={props.ca} />
            <div className="main-wrapper">
                {props.children}
            </div>
            <Footer />
        </div >
    )
}

export default UserLayout