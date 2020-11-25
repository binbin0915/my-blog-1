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

let loading = false;
let size = 10, filter = {};
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
    const [finished, setFinished] = useState(props.list.rows.length >= props.list.count);
    const [page, setPage] = useState(1);
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
    const plist = async (page, init) => {
        loading = true;
        try {
            let res = await publishList({
                page,
                size,
                filter
            })
            setCount(res.count)
            if (res.rows) {
                let newData = init ? res.rows : data.concat(res.rows);
                console.log(newData)
                setData(newData);
                if (newData.length >= res.count) {
                    setFinished(true)
                }
            }
            loading = false
        } catch (error) {
            loading = false
        }
    }

    useEffect(() => {
        filter = {}
        tagArticleFn()
    }, [])
    useEffect(() => {
        function handler () {
            let ub = document.getElementById('ul-bottom');
            let sh = ub.offsetTop;
            let cw = document.documentElement.clientHeight;
            let scrollTop =
                document.documentElement.scrollTop ||
                window.pageYOffset ||
                window.scrollY ||
                document.body.scrollTop;
            let d = sh - cw - scrollTop;
            if (d < 0) {
                if (loading) return;
                if (finished) return;
                setPage(page + 1)
                plist(page + 1)
            }
        }
        document.addEventListener('scroll', handler)
        return () => {
            document.removeEventListener('scroll', handler)
        }
    })

    const caClick = async (id) => {
        document.documentElement.scrollTop = window.pageYOffset = 0
        filter = { ca: id }
        setPage(1)
        setFinished(false)
        let temp = tags.map(k => Object.assign({}, k, { ac: false }))
        setTags(temp);
        plist(1, 'init')
    }
    const tagClick = async (id) => {
        document.documentElement.scrollTop = window.pageYOffset = 0
        filter = { tag: id }
        setPage(1)
        setFinished(false)
        navRef.current.clearAc()
        plist(1, 'init')
    }
    return (
        <Layout
            className='home-c'
            nofooter
            goTop
            ca={props.ca}
            tags={tags}
            caClick={(id) => { caClick(id) }}
            ref={navRef}
            sysinfo={props.sysinfo || {}}
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
                            <img src={props.sysinfo.av || `https://lianxiaozhuang.oss-cn-beijing.aliyuncs.com/xz1024/img/system/av.jpg`} alt="" />
                        </div>
                        <p className='p-1 tc'>{props.sysinfo.name || ''}</p>
                        <p className="p-2"> {props.sysinfo.discribe || '个人技术博客，日常学习，总结，欢迎一起交流！'} </p>
                        <div className="bottom">
                            <a target="_blank" href={props.sysinfo.github || "https://github.com/xz1024"}>
                                <GithubOutlined style={{ fontSize: '20px', color: '#666' }} />
                            </a>
                            &nbsp;
                            &nbsp;
                            <Tooltip title={props.sysinfo.email || 'lianxiaozhuang@126.com'} color={'#1890ff'}  >
                                <MailOutlined style={{ fontSize: '20px', color: '#666' }} />
                            </Tooltip>
                        </div>
                    </Card>
                    <div id="biaoqian" className='biaoqian'>
                        <Card
                            size="small" title="标签"
                            style={{ height: 'auto', minHeight: '300px', marginTop: '20px' }}
                        >
                            {
                                tags.map(d => {
                                    return (
                                        <Tag
                                            onClick={() => {
                                                if (d.ac) return;
                                                let temp = tags.map(k => {
                                                    return Object.assign({}, k, { ac: d.id === k.id })
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
                        <div className="p-footer" dangerouslySetInnerHTML={{
                            __html: props.sysinfo.footer ||
                                `
                                <p>Copyright© 2020 前端技术博客</p> 
                                <p>Designed & Powerd by lianxiaozhuang </p>
                                <p><a href='https://www.baidu.com' target="_blank">京ICP备000000号</a></p>
                                `
                        }}>
                        </div>
                        {JSON.stringify(props.res)}
                    </div>
                </div>
            </div>
        </Layout >
    )
}

Home.getInitialProps = async () => {
    let res = await publishList({ page: 1, size: 10 })
    return {
        list: res || { rows: [], count: 0 }
    }
}
export default Home