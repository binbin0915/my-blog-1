import './top.less'
import Link from '../link/Link'
import { useEffect, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import Router from 'next/router'
import { Input, message, Modal, Spin } from 'antd';
import { MenuUnfoldOutlined, CloseOutlined } from '@ant-design/icons'
import { search } from '@/src/api'
import { throttle } from '@/src/utils/tools'
import NoData from '@/src/components/nodata'
import { LiDate } from '@/pages/index.js'
const { Search } = Input;

const TopNav = forwardRef((props, ref) => {
    const [affix, setAffix] = useState(false);
    const [affixVisible, setAffixVisible] = useState(false);
    const [showFenLei, setShowFenLei] = useState(false)
    const [showSearchFlag, setSf] = useState(false)
    const [keyword, setK] = useState('')
    const [searching, setSearching] = useState(false)
    const [searchResArr, setSearchResArr] = useState([])
    const [ca, setCa] = useState(() => {
        let c = props.ca.sort((a, b) => a.weight - b.weight)
        return [{ id: 0, name: '全部分类', ac: true }].concat(c)
    });
    const [visible, setV] = useState(false);

    useEffect(() => {
        const route = Router.route
        let fl = document.getElementById('biaoqian');
        setShowFenLei(route === '/' || route === '/home');
        let beforeY =
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            window.scrollY ||
            document.body.scrollTop;
        const handler = throttle(() => {
            let y =
                document.documentElement.scrollTop ||
                window.pageYOffset ||
                window.scrollY ||
                document.body.scrollTop;

            setAffix(y > 0);
            setV(false)
            setAffixVisible(beforeY > y);
            setTimeout(() => {
                beforeY = y;
            }, 0);

            if (y <= 340) {
                fl && fl.classList.remove('fixed')
            } else {
                fl && fl.classList.add('fixed')
            }

        }, 200);
        document.addEventListener('scroll', handler);
        return () => {
            document.removeEventListener('scroll', handler);
        };
    }, [])
    useImperativeHandle(ref, () => ({
        clearAc () {
            let temp = ca.map(d => {
                return Object.assign({}, d, { ac: false })
            });
            setCa(temp)
        },
        setAc (id) {
            let temp = ca.map(d => {
                return Object.assign({}, d, { ac: d.id == id ? true : false })
            });
            setCa(temp)
        }
    }))
    function clickFn (id, isAc) {
        let temp = ca.map(d => {
            return Object.assign({}, d, { ac: d.id === id })
        });
        setCa(temp)
        if (!isAc) {
            props.caClick(id)
        }
    }
    async function onSearch (keyword) {
        setK(keyword)
        if (!keyword) {
            message.error('搜索词不能为空')
            return
        }
        setSf(true)
        setSearching(true)
        try {
            let res = await search({ keyword });
            if (res.length) {
                setSearchResArr(res)
            }
            setSearching(false)

        } catch (error) {
            setSearching(false)
        }
    }

    const RightTopBtnIco = () => {
        const BtnProps = {
            style: { color: '#007fff', fontSize: '30px' },
        }
        return (
            <div className="top-nav-small-menue"
                onClick={(e) => {
                    e.stopPropagation()
                    setV((pre) => !pre)
                }}>
                {visible ? <CloseOutlined {...BtnProps} /> : <MenuUnfoldOutlined {...BtnProps} />}
            </div>
        )
    }
    const NavListItem = () => (
        <>
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
                <Link activeClassName='active' href='/books'>
                    <a className='nav-link'>
                        <p>藏书</p>
                    </a>
                </Link>
            </li>
            <li>
                <Link activeClassName='active' href='/message'>
                    <a className='nav-link'>
                        <p>留言板</p>
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
        </>
    )
    return (
        <>
            <Modal
                title={`搜索“ ${keyword} ”的文章结果`}
                visible={showSearchFlag}
                footer={null}
                centered
                className='search-model-c'
                onCancel={() => {
                    setSf(false)
                    setSearchResArr([])
                }}
            >
                {searching ? <div className='tc'> <Spin size="large" /></div> :
                    searchResArr.length ? searchResArr.map((item, index) => {
                        return LiDate(item, props, () => {
                            setSf(false)
                        })
                    }) : <NoData />
                }
            </Modal>
            <div
                className={`top-nav-c 
                    ${affix ? 'isFixed' : ''}
                    ${affixVisible ? 'visible' : ""}
                `}>
                <div className="inner">
                    <div className="ww w1">
                        <div className="logo-div" onClick={() => Router.push('/')}>
                            <img src={props.sysinfo?.logo || `https://lianxiaozhuang.oss-cn-beijing.aliyuncs.com/xz1024/img/system/logo4.png`} className="logo cursor" />
                        </div>
                        <ul className='fl top-ul1'>
                            <NavListItem />
                        </ul>

                        <div className="top-nav-search-div">
                            <Search
                                placeholder="搜索文章"
                                // allowClear
                                onSearch={onSearch}
                            />
                        </div>
                        <RightTopBtnIco />
                    </div>
                    <ul className={`small-ul-div ${visible ? 'show' : ''}`}>
                        <li>
                            <Search
                                placeholder="搜索文章"
                                // allowClear
                                size='large'
                                style={{ paddingBottom: '20px' }}
                                onSearch={onSearch}
                            />
                        </li>

                        <NavListItem />

                    </ul>
                </div>
                <div className="inner2" id='top-ca-div' style={{ display: showFenLei ? '' : 'none' }}>
                    <div className="ww ww2 clearfix">
                        <ul className='top-ca-ul srcoll-y'>
                            {ca.map(d => (
                                <li
                                    key={d.id}
                                    className={d.ac ? 'ac' : ''}
                                    onClick={() => clickFn(d.id, d.ac)}
                                >{d.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ height: showFenLei ? '112px' : '62px' }}></div>
        </>
    )
})


export default TopNav