
import { Row, Card, Col } from 'antd';
import Layout from '@/src/components/layout'
import * as THREE from '@/src/assets/three/build/three.module.js'
import "./index.less"
import { useEffect } from 'react';

const AboutUs = () => {
    useEffect(() => {
        // Our Javascript will go here.
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, 474 / 400, 0.1, 474);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(474, 400);
        renderer.setClearColor('rgba(256,256,250,0.2)', 1.0);
        document.getElementById('three-div').appendChild(renderer.domElement);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        var render = function () {
            requestAnimationFrame(render);

            cube.rotation.x += 0.1;
            // cube.rotation.y += 0.1;

            renderer.render(scene, camera);
        };

        render();
    }, [])
    return (
        <Layout goTop className='about-us-wrapper'>
            <div className="inn ww">
                <Card
                    size="small" title="关于网站和我"
                    // extra={<a href="/">More</a>}
                    style={{ minHeight: 'calc(100vh - 250px)', padding: '10px' }}
                >
                    <Row gutter={86}>
                        <Col className="gutter-row" span={12}>
                            <section>
                                <h2>Why</h2>
                                <p className='p-1'>
                                    一直想有机会搭建一个属于自己的网站，奈与时间和个人技术原因，直到今年终于完成。
                                    面对国内多数博客网站广告漫天飞，文章贴来贴去，只想找一片净土，安安静静的做笔记。
                                </p>
                            </section>
                            <section>
                                <h2>How</h2>
                                <p className='p-1'>前端：nextjs、antd (<a target="_blank" href='www.xz1024.top'>www.xz1024.top</a>)</p>
                                <p className='p-1'>后台：react、 antd (<a target="_blank" href='admin.xz1024.top'>admin.xz1024.top</a>)</p>
                                <p className='p-1'>服务：node、koa2、sequelize、 mysql、pm2</p>
                                <p className='p-1'>
                                    源码：<a target="_blank" href="https://github.com/xz1024/my-blog.git">https://github.com/xz1024/my-blog.git</a>
                                </p>
                            </section>
                            <section>
                                <h2>And</h2>
                                <p className='p-1'></p>

                            </section>
                            <section>
                                <h2>Me</h2>
                                {/* <p className='p-1'>姓名：连小壮</p>
                                <p className='p-1'>性别：男</p>
                                <p className='p-1'>籍贯：河北</p>
                                <p className='p-1'>邮箱：lianxiaozhuang@126.com</p> */}
                                <p className='p-1'>本人前端菜狗一枚，正在疯狂赶火车中 ··· ···</p>

                            </section>
                        </Col>
                        <Col className="gutter-row" span={12}>

                            <div id="three-div">

                            </div>
                        </Col>

                    </Row>

                </Card>

            </div>
        </Layout>
    )
}

export default AboutUs
