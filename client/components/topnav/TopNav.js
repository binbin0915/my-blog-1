import './top.less'
import Link from '../link/Link'
import { useEffect, useState } from 'react';
import Router from 'next/router'
import { Input } from 'antd';

const { Search } = Input;

const TopNav = (props) => {
    const [scrolled, setScrolled] = useState(0);
    const [showFenLei, setShowFenLei] = useState(false)
    useEffect(() => {
        const route = Router.route
        setShowFenLei(route === '/' || route === '/home')
        window.addEventListener('scroll', (event) => {
            let t = document.documentElement.scrollTop;
            let gt = document.getElementById('goTop')
            let fl = document.getElementById('fenlei')
            if (t <= 340) {
                setScrolled(0)

                fl && fl.classList.remove('fixed')
                gt && gt.classList.remove('show')
            } else {
                setScrolled(1)
                fl && fl.classList.add('fixed')
                gt && gt.classList.add('show')
            }
        })
    }, [])

    const onSearch = value => console.log(value);
    return (
        <>
            <div className={`top-nav-c ${scrolled ? 'scrolled' : ''}`}>
                <div className="inner">
                    <div className="ww w1">
                        <div className="logo-div" onClick={() => Router.push('/')}>
                            <img src={'/img/common/logo2.png'} className="logo cursor" />
                            <img src={'/img/common/logo3.png'} className="logo logo3 cursor" />
                        </div>
                        <ul className='fl top-ul1'>
                            <li>
                                <Link activeClassName='active' href='/'>
                                    <a className='nav-link'>
                                        <p>首页</p>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link activeClassName='active' href='/archives'>
                                    <a className='nav-link'>
                                        <p>归档</p>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link activeClassName='active' href='/links'>
                                    <a className='nav-link'>
                                        <p>博文推荐</p>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link activeClassName='active' href='/about'>
                                    <a className='nav-link prod-intro-a'>
                                        <p>关于</p>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                        <Search
                            placeholder="搜索文章"
                            allowClear
                            className={'fl search'}
                            onSearch={onSearch}
                            style={{ width: 200, margin: '14px 10px 0 130px' }}
                        />
                    </div>
                    {/*  */}

                </div>
                {
                    showFenLei ?
                        <div className="inner2">
                            <div className="ww ww2">
                                <ul>
                                    <li className='ac'>全部分类</li>
                                    <li>js</li>
                                    <li>css</li>
                                    <li>git</li>
                                    <li>react</li>
                                    <li>浏览器</li>
                                </ul>
                            </div>

                        </div>
                        : null
                }

            </div>
            <div style={{ height: showFenLei ? '112px' : '62px' }}></div>
        </>
    )
}

export default TopNav