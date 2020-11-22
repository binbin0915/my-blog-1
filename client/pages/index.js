import { Row, Col, Card, Tag, Tooltip, Spin } from 'antd';
import { useCallback, useEffect, useState, useRef } from 'react';
import { publishList, tagArticle } from '@/src/api'
import Router from 'next/router'
import dayjs from 'dayjs'
import Layout from '@/src/components/layout'
import { GithubOutlined, MailOutlined, } from '@ant-design/icons'
import deepClone from 'lodash.clonedeep'
import '@/src/styles/home.less'
let loading = false, finished = false;
let page = 1, size = 10, filter = {};
function Home (props) {
    const navRef = useRef(null)
    const [data, setData] = useState(props.list.rows)
    const [ca, setCa] = useState(props.ca)
    const [tags, setTags] = useState(props?.tags || [])
    const [count, setCount] = useState(props.list.count);
    const tagArticleFn = useCallback(async () => {
        let res = await tagArticle();
        if (res.length) {
            let newTagsArr = deepClone(tags);

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

            console.log('seted-tags', tags)
            setTags(newTagsArr)
        }
        console.log('ar_tags', res)
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
        console.log('props?.tags', props.tags)
        let ub = document.getElementById('ul-bottom');
        function handler () {
            let sh = ub.offsetTop;
            let cw = document.documentElement.clientHeight;
            let scrollTop = document.documentElement.scrollTop;
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

    const LiDate = useCallback((item) => {
        let fca = props.ca.find(d => d.id == item.category_id)
        return (
            <li className='article-li' key={item.id} onClick={() => Router.push(`/article/${item.id}`)}>
                { item.covery_img && <img src={item.covery_img} alt="" className="ldd-img" />}
                <div className="p-box">
                    <div className="tit">{item.title}</div>
                    <div className="dis">{item.summary}</div>
                    <span className='read'>
                        {item?.read_nums || '0'} 次阅读
                    </span>
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
                    <div className="times">{dayjs(item.publish_time).format(`YYYY-MM-DD    HH:mm:ss`)}</div>
                </div>
            </li>
        )
    }, [])
    const caClick = async (id) => {
        console.log('ca-click-id', id)
        document.documentElement.scrollTop = 0;
        page = 1;
        filter = {
            ca: id
        }
        finished = false
        setData([])
        // setCount(0)
        /**
         * initTag show
         */
        let temp = tags.map(k => {
            return Object.assign({}, k, {
                ac: false
            })
        })
        setTags(temp);

        plist()
    }
    const tagClick = async (id) => {
        console.log('ca-click-id', id)
        document.documentElement.scrollTop = 0;
        page = 1;
        filter = {
            tag: id
        }
        finished = false
        setData([])
        navRef.current.clearAc()
        plist()
    }
    console.log('count', count)
    return (
        <Layout
            className='home-c'
            goTop
            ca={ca}
            caClick={(id) => {
                caClick(id)
            }}
            ref={navRef}
        >
            <div className="ww"  >
                <Row gutter={16}>
                    <Col className="gutter-row" span={18}>
                        <ul id='index-ul' className='article-ul clearfix'>
                            {
                                count
                                    ? data.map((item, index) => LiDate(item))
                                    : <div>
                                        <div class="ant-empty ant-empty-normal"><div class="ant-empty-image"><svg class="ant-empty-img-simple" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse class="ant-empty-img-simple-ellipse" cx="32" cy="33" rx="32" ry="7"></ellipse><g class="ant-empty-img-simple-g" fill-rule="nonzero"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" class="ant-empty-img-simple-path"></path></g></g></svg></div><p class="ant-empty-description">No Data</p></div>
                                    </div>
                            }
                        </ul>

                        <div id="ul-bottom">
                            {!finished ? <Spin size="large" /> : <div className='no-more'>已加载全部</div>}
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Card
                            size="small"
                            //title="简介"
                            //extra={<a href="#">More</a>}
                            style={{ height: 300, marginTop: '20px' }}
                            className="jianjie"
                        >
                            <div className="xx">
                                <img src="https://lianxiaozhuang.oss-cn-beijing.aliyuncs.com/xz1024/img/common/av.jpg" alt="" />
                            </div>
                            <p className='p-1 tc'>小壮</p>
                            <p className="p-2">
                                个人技术博客，日常学习，总结，欢迎一起交流！
                                </p>
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
                        {/* {JSON.stringify(props.tags)}
                        {JSON.stringify(props.ca)} */}
                        <Card
                            size="small" title="标签"
                            className='fenlei'
                            id='fenlei'
                            style={{ height: 300, marginTop: '20px' }}
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
                    </Col>
                </Row>
            </div>
        </Layout >
    )
}
export default Home