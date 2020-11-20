import '@/src/styles/home.less'
import axios from 'axios'
import Layout from '@/src/components/layout'
import { Row, Col, Card, Tag, Tooltip, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { publishList } from '@/src/api'
import dayjs from 'dayjs'
import { GithubOutlined, MailOutlined, } from '@ant-design/icons'

function Home (props) {
    const [data, setData] = useState(props.list.rows)
    const [count, setCount] = useState(props.list.count)
    const [loading, setLoading] = useState(false)
    const size = 10;
    const [page, setPage] = useState(2)
    async function plist () {
        try {

            if (count && data.length >= count) {
                return
            }
            if (loading) {
                return
            }

            setLoading(() => true)
            console.log('data', data)
            console.log('count', count)
            console.log('loading', loading)
            let res = await publishList({ page, size, })
            if (res.rows) {
                setCount(res.count);
                let temp = data.slice().concat(res.rows)
                console.log('temp', temp)
                setData(temp)
                setPage(page + 1)
            }
            console.log('res', res)
        } catch (error) {

        } finally {
            setLoading(false)

        }

    }
    useEffect(() => {
        console.log('useEffect')
        //  plist()
    }, [])
    const LiDate = useCallback((item) => {
        return (
            <li className='article-li' key={item.id}>
                { item.covery_img && <img src={item.covery_img} alt="" className="ldd-img" />}
                <div className="p-box">
                    <div className="tit">{item.title}</div>
                    <div className="dis">{item.summary}</div>
                    <div className="tag">前端</div>
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
                            <InfiniteScroll
                                pageStart={1}
                                loadMore={plist}
                                hasMore={count && (data.length < count)}
                                loader={
                                    <div className="tc">
                                        <Spin />
                                    </div>
                                }
                            >
                                <ul className='article-ul clearfix'>
                                    {
                                        count ? data.map((item, index) => LiDate(item))
                                            : <div>没有数据</div>
                                    }
                                </ul>
                                {data.length >= count && count && <div>已经加载全部</div>}

                            </InfiniteScroll>
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
                                    <Tooltip title="lianxiaozhuang@126.com" color={'#bbb'}  >
                                        <MailOutlined style={{ fontSize: '20px', color: '#666' }} />
                                    </Tooltip>
                                </div>
                            </Card>
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

// Home.getInitialProps = async () => {
//     let list = await publishList({ page: 1, size: 10 });
//     console.log('list', list)
//     return {
//         list: list,
//     }
// };

export default Home