import React from 'react';
import { Row } from 'antd';
import Layout from '@/src/components/layout'
import { Card, Tooltip } from 'antd';
const { Meta } = Card;
import "./index.less"
import { booklist } from '@/src/api'
const Books = (props) => {
    return (
        <Layout
            goTop
            ca={props.ca}
            tags={props.tags}
            sysinfo={props.sysinfo || {}}
            className='Links-wrapper'>
            <Row className="ww clearfix book-c">
                {
                    props?.res.map((item, index) => {
                        return (
                            <a className='book-a' target='_blank' href={item.url}>
                                <Card
                                    hoverable
                                    style={{ width: 175 }}
                                    cover={<img alt="封面加载失败" src={item.img} />}
                                >
                                    <Meta title={
                                        <Tooltip placement="topLeft" title={`《 ${item.name} 》`}>
                                            <span>{item.name}</span>
                                        </Tooltip>
                                    } />
                                </Card>
                            </a>
                        )
                    })
                }
            </Row>
        </Layout>
    )
}
Books.getInitialProps = async () => {
    let res = await booklist()
    return {
        res,
    }
}
export default Books
