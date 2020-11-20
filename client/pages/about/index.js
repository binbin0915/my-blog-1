
import { Row, Card } from 'antd';
import Layout from '@/src/components/layout'
import * as THREE from '@/src/assets/three/build/three.module.js'
import "./index.less"
import { useEffect } from 'react';
const AboutUs = () => {
    useEffect(() => {

    }, [])
    return (
        <Layout goTop className='about-us-wrapper'>
            <div className="inn ww">
                <Card
                    size="small" title="关于网站和我"
                    // extra={<a href="/">More</a>}
                    style={{ minHeight: 'calc(100vh - 250px)', }}
                >
                    <section>
                        <h2>Why</h2>
                        <p className='p-1'>
                            一直想有机会搭建一个属于自己的网站，奈与时间和个人技术原因，直到今年终于完成。
                     面对国内多数博客网站广告漫天飞，文章贴来贴去，只想找一片净土，安安静静的做笔记。</p>
                    </section>

                    <section>
                        <h2>How</h2>
                        <p className='p-1'>前端：react、nextjs、antd</p>
                        <p className='p-1'>后台：react、 antd</p>
                        <p className='p-1'>服务：node、koa2、sequelize、 mysql、pm2</p>
                        <p className='p-1'>
                            GitHub 地址：<a target="_blank" href="https://github.com/xz1024/my-blog.git">https://github.com/xz1024/my-blog.git</a>
                        </p>
                    </section>
                    <section>
                        <h2>And</h2>
                        <p className='p-1'></p>

                    </section>
                    <section>
                        <h2>Me</h2>
                        <p className='p-1'>本人前端菜狗一枚，正在疯狂赶火车中 ··· ···</p>

                    </section>
                    <div id="div">

                    </div>
                </Card>

            </div>
        </Layout>
    )
}

export default AboutUs
