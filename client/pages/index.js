import { Row, Col, Card, Tag, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { publishList } from '@/src/api'
import Router from 'next/router'
import dayjs from 'dayjs'
import Layout from '@/src/components/layout'
import { GithubOutlined, MailOutlined, } from '@ant-design/icons'
import '@/src/styles/home.less'

function Home (props) {
    const [data, setData] = useState(props.list.rows)
    const [count, setCount] = useState(props.list.count)
    const [loading, setLoading] = useState(false)
    const size = 10;
    const [page, setPage] = useState(1)
    async function plist () {
        try {
            let res = await publishList({ page, size, })
            if (res.rows) {
                setCount(res.count);
                let temp = data.slice().concat(res.rows)
                console.log('temp', temp)
                setData(temp)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        let ub = document.getElementById('ul-bottom');
        function handler () {
            let sh = ub.offsetTop;
            let cw = document.documentElement.clientHeight;
            let scrollTop = document.documentElement.scrollTop;
            let d = sh - cw - scrollTop;
            if (d < 0) {
                console.log('loading', loading);
                if (loading) return;
                setLoading(true)
                setPage(page + 1)
            }
        }
        document.addEventListener('scroll', handler)
        return () => {
            document.removeEventListener('scroll', handler)
        }
    }, [])
    useEffect(() => {
        if (page <= 1) return;
        console.log('useEffect', page, loading)
        plist()
    }, [page])
    const LiDate = useCallback((item) => {
        let fca = props.ca?.rows.find(d => d.id == item.category_id)
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
                                let f = props.tags.rows.find(r => r.id == d)
                                return f ? <Tag key={f.id} color={f.color}>{f.name}</Tag> : null
                            })}
                        </span>
                    </div>
                    <div className="times">{dayjs(item.publish_time).format(`YYYY-MM-DD    HH:mm:ss`)}</div>
                </div>
            </li>
        )
    }, [])

    return (
        <Layout
            className='home-c'
            goTop
            ca={props.ca}
        >
            <div className="ww"  >
                <>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={18}>
                            <ul id='index-ul' className='article-ul clearfix'>
                                {
                                    count
                                        ? data.map((item, index) => LiDate(item))
                                        : <div>没有数据</div>
                                }
                            </ul>
                            <div id="ul-bottom">
                                <div>加载中</div>
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
                            {JSON.stringify(props.tags.rows)}
                            {JSON.stringify(props.ca.rows)}
                            <Card
                                size="small" title="标签"
                                className='fenlei'
                                id='fenlei'
                                style={{ height: 300, marginTop: '20px' }}
                            >
                                {
                                    props.tags?.rows.map(d => {
                                        return (
                                            <Tag key={d.id} color={d.color}>{d.name}</Tag>
                                        )
                                    })
                                }
                            </Card>
                        </Col>
                    </Row>
                </>
            </div>
        </Layout >
    )
}
export default Home