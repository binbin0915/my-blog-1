import { Card, Tag, Tooltip, Spin } from 'antd';
import { useCallback, useEffect, useState, useRef } from 'react';
import { publishList, tagArticle } from '@/src/api'
import Router from 'next/router'
import dayjs from 'dayjs'
import Layout from '@/src/components/layout'
import NoData from '@/src/components/nodata'
import { GithubOutlined, MailOutlined, } from '@ant-design/icons'
import { deepCopy } from '@/src/utils/tools'
import '@/src/styles/home.less'

let loading = false, finished = false;
let page = 1, size = 10, filter = {};

export const LiDate = (item, props, clickFn) => {
    let fca = props.ca.find(d => d.id == item.category_id)
    return (
        <li className='article-li' key={item.id} onClick={() => {
            clickFn && clickFn();
            Router.push(`/article/${item.id}`)
        }}>
            { item.covery_img && <img className="ldd-img" src={item.covery_img} />}
            <div className="p-box">
                <div className="tit">{item.title}</div>
                <div className={`dis ${item.summary ? '' : 'no'}`}>{item.summary}</div>
                <div className="bot clearfix">
                    <div className="ca-tag-div">
                        <span className='ca'>
                            {fca?.name || ''}
                        </span>
                        <span className="tag">
                            {item.tag_ids.map(d => {
                                let f = props.tags.find(r => r.id == d)
                                return f ? <Tag key={f.id} color={f.color}>{f.name}</Tag> : null
                            })}
                        </span>
                    </div>
                    <div className="rr">
                        <div className='read'>
                            {item?.read_nums || '0'} 次阅读
                        </div>
                        <div className="times">{dayjs(item.publish_time).format(`YYYY-MM-DD    HH:mm:ss`)}</div>
                    </div>

                </div>
            </div>
        </li>
    )
}


function Home (props) {
    const navRef = useRef(null)
    const [data, setData] = useState(props.list.rows)
    const [tags, setTags] = useState(props?.tags || [])
    const [count, setCount] = useState(props.list.count);
    const tagArticleFn = useCallback(async () => {
        let res = await tagArticle();
        if (res.length) {
            let newTagsArr = deepCopy(tags);
            res.forEach(d => {
                let f = newTagsArr.find(t => t.id == d.tag_id)
                if (f) {
                    if (!f.num) {
                        f.num = 1
                    } else {
                        f.num++
                    }
                }
            })
            setTags(newTagsArr)
        }
    })
    const plist = async () => {
        loading = true;
        try {
            let res = await publishList({
                page,
                size,
                filter
            })
            setCount(res.count)
            if (res.rows) {
                setData((oldData) => {
                    let newData = oldData.concat(res.rows);
                    if (newData.length >= res.count) {
                        finished = true
                    }
                    return newData
                })
            }
            loading = false
        } catch (error) {
            loading = false
        }
    }
    useEffect(() => {
        tagArticleFn()
        let ub = document.getElementById('ul-bottom');
        function handler () {
            let sh = ub.offsetTop;
            let cw = document.documentElement.clientHeight;
            let scrollTop = document.documentElement.scrollTop ||
                window.pageYOffset ||
                window.scrollY ||
                document.body.scrollTop;

            let d = sh - cw - scrollTop;
            if (d < 0) {
                if (loading) return;
                if (finished) return;
                page++
                plist()
            }
        }
        document.addEventListener('scroll', handler)
        return () => {
            document.removeEventListener('scroll', handler)
        }
    }, [])

    const caClick = async (id) => {
        document.documentElement.scrollTop = 0;
        page = 1;
        filter = { ca: id }
        finished = false
        setData([])
        let temp = tags.map(k => Object.assign({}, k, { ac: false }))
        setTags(temp);
        plist()
    }
    const tagClick = async (id) => {
        document.documentElement.scrollTop = 0;
        page = 1;
        filter = { tag: id }
        finished = false
        setData([])
        navRef.current.clearAc()
        plist()
    }
    return (
        <Layout
            className='home-c'
            goTop
            ca={props.ca}
            tags={tags}
            caClick={(id) => { caClick(id) }}
            ref={navRef}
        >
            <div className="ww clearfix"  >
                <div className="home-ul-div" span={18}>
                    <ul id='index-ul' className='article-ul clearfix'>
                        {count ? data.map((item, index) => LiDate(item, props)) : <NoData />}
                    </ul>
                    <div id="ul-bottom">
                        {!finished ? <Spin size="large" /> : <div className='no-more'>已加载全部</div>}
                    </div>
                </div>
                <div className="home-r-div" span={6}>
                    <Card
                        size="small"
                        style={{ height: 300, marginTop: '20px' }}
                        className="jianjie"
                    >
                        <div className="xx">
                            <img src="/oss/xz1024/img/common/av.jpg" alt="" />
                        </div>
                        <p className='p-1 tc'>小壮</p>
                        <p className="p-2"> 个人技术博客，日常学习，总结，欢迎一起交流！ </p>
                        <div className="bottom">
                            <a target="_blank" href="https://github.com/xz1024">
                                <GithubOutlined style={{ fontSize: '20px', color: '#666' }} />
                            </a>
                                    &nbsp;
                                    &nbsp;
                                    <Tooltip title="lianxiaozhuang@126.com" color={'#1890ff'}  >
                                <MailOutlined style={{ fontSize: '20px', color: '#666' }} />
                            </Tooltip>
                        </div>
                    </Card>
                    <Card
                        size="small" title="标签"
                        className='fenlei'
                        id='fenlei'
                        style={{ height: 'auto', minHeight: '300px', marginTop: '20px' }}
                    >
                        {
                            tags.map(d => {
                                return (
                                    <Tag
                                        onClick={() => {
                                            if (d.ac) return;
                                            let temp = tags.map(k => {
                                                return Object.assign({}, k, {
                                                    ac: d.id === k.id
                                                })
                                            })
                                            setTags(temp)
                                            tagClick(d.id)
                                        }}
                                        className={d.ac ? 'ac' : ''}
                                        key={d.id}
                                        color={d.ac ? d.color : ''}
                                    >{d.name} [{d.num || 0}] </Tag>
                                )
                            })
                        }
                    </Card>
                </div>
            </div>
        </Layout >
    )
}
export default Home