import '@/styles/home.less'
import Router from 'next/router'
import axios from 'axios'
import Layout from '@/components/layout'
import { Row, Col, Card, Tag } from 'antd';
import { useCallback } from 'react';

const style = { background: '#0092ff', padding: '8px 0' };
function Home () {

    Router.events.on('routeChangeStart', (...args) => {
        console.log('1.routeChangeStart->路由开始变化,参数为:', ...args)
    })
    const LiDate = useCallback((index) => {
        return (
            <li className='article-li' key={index}>
                {
                    index % 2 === 0 ?
                        <img src="https://wipi.oss-cn-shanghai.aliyuncs.com/2020-07-12/search-engine-4.jpg" alt="" className="ldd-img" />
                        : null
                }
                <div className="p-box">
                    <div className="tit">这是标题阿迪斯发阿斯蒂芬</div>
                    <div className="dis">这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要这是摘要</div>
                    <div className="tag">前端</div>
                    <div className="times">2020-07-04 20:46:09</div>
                </div>
            </li>
        )
    })

    return (
        <Layout
            className='home-c'
            goTop
        >
            <div className="ww"  >
                <>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={18}>
                            <ul className='article-ul clearfix'>
                                {
                                    new Array(20).fill(0).map((item, index) => LiDate(index))
                                }
                            </ul>

                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Card
                                size="small" title="简介"
                                extra={<a href="#">More</a>}
                                style={{ height: 300, marginTop: '20px' }}
                            >
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                            <Card
                                size="small" title="标签"
                                // extra={<a href="#">More</a>}
                                className='fenlei'
                                id='fenlei'
                                style={{ height: 300, marginTop: '20px' }}
                            >
                                <Tag color="magenta">magenta</Tag>
                                <Tag color="red">red</Tag>
                                <Tag color="volcano">volcano</Tag>
                                <Tag color="orange">orange</Tag>
                                <Tag color="gold">gold</Tag>
                                <Tag color="lime">lime</Tag>
                                <Tag color="green">green</Tag>
                                <Tag color="cyan">cyan</Tag>
                                <Tag color="blue">blue</Tag>
                                <Tag color="geekblue">geekblue</Tag>
                                <Tag color="purple">purple</Tag>
                            </Card>
                        </Col>

                    </Row>
                </>
            </div>


        </Layout >
    )
}

// Home.getInitialProps = async () => {
//   let data = await axios.get("https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js");
//   return {
//     hero: data.data.hero.slice(0, 1)
//   }
// };

export default Home