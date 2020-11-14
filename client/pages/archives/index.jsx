import React from 'react'
import './index.less'
import Layout from '@/components/layout'
import './index.less'
import { EditOutlined } from '@ant-design/icons';

import { Row, Col, Card, Tag } from 'antd';
import { useCallback } from 'react';

const Archives = () => {
    return (
        <Layout
            className='Archives-c'
            goTop
        >
            <div className="ww">
                <>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={18}>
                            <div className="gui-box">
                                <div className="top border-bottom-1px tc">
                                    <EditOutlined style={{ fontSize: '30px', color: '#666', paddingTop: '26px' }} />
                                    <h2>归档</h2>
                                    <p>共计 <span>100</span> 篇</p>
                                </div>
                                <ul className='ul-1 clearfix'>
                                    {
                                        ['2020', '2019'].map((item, index) => {
                                            return (
                                                <li className='li-1'>
                                                    <div className="year">{item}</div>
                                                    <ul className="ul-2">
                                                        {
                                                            ['1', '2', '3', '4'].map((item2, index2) => {
                                                                return (
                                                                    <li className='li-2'>
                                                                        <div className="month">{item2}月</div>
                                                                        {
                                                                            <ul className="ul-3">
                                                                                <li className="li-3">
                                                                                    <span className='date'>5-10</span>
                                                                                    <span className='ti'>浏览器缓存</span>
                                                                                </li>
                                                                                <li className="li-3">
                                                                                    <span className='date'>5-10</span>
                                                                                    <span className='ti'>浏览器缓存</span>
                                                                                </li>
                                                                                <li className="li-3">
                                                                                    <span className='date'>5-10</span>
                                                                                    <span className='ti'>浏览器缓存</span>
                                                                                </li>
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


                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Card
                                size="small" title="推荐"
                                extra={<a href="#">More</a>}
                                style={{ height: 300, }}
                            >
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>

                        </Col>

                    </Row>
                </>
            </div>
        </Layout>
    )
}

export default Archives