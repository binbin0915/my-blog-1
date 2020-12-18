import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Layout from '@/src/components/layout'
import { EditOutlined } from '@ant-design/icons';
import { archives, recentArticle } from '@/src/api'
import { Card, Carousel } from 'antd';
import './index.less'
const Archives = (props) => {
    const [data, setData] = useState([])

    async function recentArticleFn () {
        let res = await recentArticle();
        if (res) {
            setData(res.slice(0, 6))
        }
    }
    useEffect(() => {
        // recentArticleFn()
    }, [])
    return (
        <Layout
            className='Archives-c'
            goTop
            ca={props.ca}
            sysinfo={props.sysinfo || {}}
            tags={props.tags}
        >
            <div className="ww clearfix">
                <div className="guidang-left" span={18}>
                    <div className="gui-box">
                        <div className="top border-bottom-1px tc">
                            <EditOutlined style={{ fontSize: '30px', color: '#666', paddingTop: '26px' }} />
                            <h2>归档</h2>
                            <p>共计 <span>{props?.res?.length}</span> 篇</p>
                        </div>
                        <ul className='ul-1 clearfix'>
                            {
                                props?.years?.map((item, index) => {
                                    return (
                                        <li className='li-1' key={index}>
                                            <div className="year">{item.year}</div>
                                            <ul className="ul-2">
                                                {
                                                    item.child.map((item2, index2) => {
                                                        return (
                                                            <li className='li-2' key={index2}>
                                                                <div className="month">{item2.month}月</div>
                                                                {
                                                                    <ul className="ul-3">
                                                                        {
                                                                            item2.child.map((item3, index3) => {
                                                                                return (
                                                                                    <li className="li-3" key={index3} onClick={() => Router.push(`/article/${item3.id}`)}>
                                                                                        <span className='date'>{`${item3.month}-${item3.day}`}</span>
                                                                                        <span className='ti'>{item3.title}</span>
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                }
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="guidang-right" span={6}>
                    <Card
                        size="small" title="如果帮到了您，欢迎打赏！🤩"
                        // extra={<a href="/">More</a>}
                        style={{ height: 'auto', }}
                    >
                        <div className='pay-img'>
                            <Carousel autoplay>
                                <div>
                                    <img src="https://lianxiaozhuang.oss-cn-beijing.aliyuncs.com/xz1024/img/common/zfbpaycode.jpg" alt="" />
                                </div>
                                <div>
                                    <img src="https://lianxiaozhuang.oss-cn-beijing.aliyuncs.com/xz1024/img/common/wxpaycode.jpg" alt="" />
                                </div>

                            </Carousel>


                        </div>
                        {/* <ul className="ul-1">
                            {
                                data.map((item, index) => {
                                    return (
                                        <li key={index} onClick={() => Router.push(`/article/${item.id}`)}>
                                            <span>{item.updated_at}</span>
                                            {item.title}
                                        </li>
                                    )
                                })
                            }

                        </ul> */}
                    </Card>
                </div>

            </div>
        </Layout>
    )
}
Archives.getInitialProps = async () => {
    let res = await archives()
    let years = [];
    // let temp = [
    //     {
    //         year: 2020,
    //         child: [
    //             {
    //                 month: 10,
    //                 child: []
    //             },
    //             {
    //                 month: 9,
    //                 child: []
    //             }
    //         ]
    //     }
    // ]
    res.forEach(d => {
        let findyear = years.find(m => {
            return d.year == m.year
        })
        if (!findyear) {
            let n = {
                year: [d.year],
                child: []
            }
            years.push(n)
            findyear = n
        }
        let findMonth = findyear.child.find(h => {
            return h.month == d.month
        })
        if (!findMonth) {
            let m = {
                month: [d.month],
                child: []
            }
            findyear.child.push(m)
            findMonth = m
        }
        findMonth.child.push(d)

    })
    return {
        res,
        years,
    }
}
export default Archives