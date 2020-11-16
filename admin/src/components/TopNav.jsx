import React from 'react'
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom'
import getRef from '@/utils/getRef'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.navBarBoxRef = React.createRef();
        this.state = {
            show: false,
            showBack: true
        }
    }
    render () {
        return (
            <div className={'top-nav'} ref={this.topNavRef} >
                <br />
                <div>
                    <span>当前页面是：{this.props.title}</span>
                </div>
                <br />
                <div>
                    <NavLink className='nav-link' activeClassName='active' to='/app/ClassDemo?abc=1'>ClassDemo</NavLink>
                    <NavLink className='nav-link' activeClassName='active' to='/app/ClassReduxDemo'>ClassReduxDemo</NavLink>
                    <NavLink className='nav-link' activeClassName='active' to='/app/HooksReduxDemo'>HooksReduxDemo</NavLink>
                    <NavLink className='nav-link' activeClassName='active' to='/app/HooksDemo'>HooksDemo</NavLink>
                    <NavLink className='nav-link' activeClassName='active' to='/app/KeepAliveDemo'>KeepAliveDemo</NavLink>
                    <span onClick={() => { this.props.history.push('/permission') }} className="nav-link">permission</span>
                    <span onClick={() => { window.reactHistory.goBack() }} className="nav-link">goBack</span>
                    <br />
                    <NavLink className='nav-link' activeClassName='active' to='/app/useMemo'>useMemo</NavLink>
                </div>
            </div>
        )
    }
}

NavBar.propTypes = {
    title: PropTypes.string,
}

export default withRouter(getRef(NavBar));
