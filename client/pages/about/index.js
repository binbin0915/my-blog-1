import { Card, Modal } from 'antd';
import Layout from '@/src/components/layout'
import "./index.less"
import { useState } from 'react';
const AboutUs = (props) => {
    const imgArr = [
        {
            cls: 'pic1',
            title: '努努岛',
            url: '/oss/pic/my/ca2e2ba6f1dcb7dfbc5aaccff4662bc.jpg'
        },
        {
            cls: 'pic4',
            title: '哈利法塔',

            url: '/oss/pic/my/259e6eaf90402cb9a0ac942ef41723f.jpg'
        }
        ,
        {
            cls: 'pic8',
            title: '沙漠',
            url: '/oss/pic/my/4eb20d9a9be88622697a16bd7dcdeb7.jpg'
        }
        ,
        {
            cls: 'pic10',
            title: 'DuBai博物馆',
            url: '/oss/pic/my/dda40d9ed2c112c366460f887aed6b3.jpg'
        }
    ]
    const [showImg, setshowImg] = useState(false)
    const [url, setUrl] = useState('')
    const [imgtitle, setIT] = useState('')
    return (
        <Layout
            goTop
            ca={props.ca}
            tags={props.tags}
            sysinfo={props.sysinfo || {}}
            className='about-us-wrapper'>
            <div className="inn ww">
                <Card
                    size="small" title="关于网站和我"
                    style={{ minHeight: 'calc(100vh - 250px)', padding: '10px' }}
                >
                    <div className='about-div' gutter={86}>
                        <div className="ab-ar" span={12} dangerouslySetInnerHTML={{ __html: props.sysinfo?.aboutme }}>
                            {/* <section>
                                <h2>Why</h2>
                                <p className='p-1'>
                                    一直想有机会搭建一个属于自己的网站，奈与时间和个人技术原因，直到今年终于完成。
                                    面对国内多数博客网站广告漫天飞，文章贴来贴去，只想找一片净土，安安静静的做笔记。
                                </p>
                            </section>
                            <section>
                                <h2>How</h2>
                                <p className='p-1'>前端：nextjs、antd (<a target="_blank" href='http://www.xz1024.top'>www.xz1024.top</a>)</p>
                                <p className='p-1'>后台：react、 antd (<a target="_blank" href='http://admin.xz1024.top'>admin.xz1024.top</a>)</p>
                                <p className='p-1'>服务：node、koa2、sequelize、 mysql、pm2</p>
                                <p className='p-1'>
                                    源码：<a target="_blank" href="https://github.com/xz1024/my-blog.git">https://github.com/xz1024/my-blog.git</a>
                                </p>
                            </section>
                            <section>
                                <h2>And</h2>
                                <p className='p-1'>
                                    本网站非商用，自由转载；如需联系，见首页邮箱。
                                </p>
                            </section>
                            <section>
                                <h2>Me</h2>
                                <p className='p-1'>本人前端菜狗一枚，正在疯狂赶火车中 ··· ···</p>
                            </section> */}
                        </div>
                        <div className="ab-pic-r" span={12}>
                            <div className="me-box container">
                                {
                                    imgArr.map((item, index) => {
                                        return (
                                            <img
                                                key={index}
                                                onClick={() => {
                                                    setUrl(item.url)
                                                    setIT(item.title)
                                                    setshowImg(true)
                                                }}
                                                className={item.cls}
                                                src={item.url}
                                                alt="加载失败"
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Card>
                <Modal
                    visible={showImg}
                    footer={null}
                    title={imgtitle}
                    className='img-model-c'
                    onCancel={() => {
                        setUrl('')
                        setIT('')
                        setshowImg(false)
                    }}
                > <img src={url} alt="" />
                </Modal>
            </div>
        </Layout>
    )
}

export default AboutUs
