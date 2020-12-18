import Layout from '@/src/components/layout'
import "./index.less"
import { Pagination } from 'antd';
import { Form, Input, InputNumber, Button } from 'antd';
import { useState } from 'react';
const AboutUs = (props) => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const validateMessages = {
        required: '${label}不能为空!',
        types: {
            email: '${label}不是个有效的邮箱!',
        },
        string: {
            range: '${label}长度不能超过 ${max}',
        },
    };

    const onFinish = values => {
        console.log(values);
    };
    return (
        <Layout
            goTop
            ca={props.ca}
            tags={props.tags}
            sysinfo={props.sysinfo || {}}
            className='message-board-wrapper'>
            <div className="inn ww">
                <div className="top-f">
                    <div className="form-box tl">
                        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                            <Form.Item name={['name']} label="昵称" rules={[{ required: true, type: 'string', max: 20 }]}>
                                <Input style={{ width: 400 }} />
                            </Form.Item>
                            <Form.Item name={['email']} label="邮箱" rules={[{ required: true, type: 'email', max: 50 }]}>
                                <Input style={{ width: 400 }} />
                            </Form.Item>
                            <Form.Item name={['introduction']} label="内容" rules={[{ required: true, type: 'string', max: 200 }]}>
                                <Input.TextArea style={{ width: 400, height: 100 }} />
                            </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                    留言
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className="message-list-box">
                    {
                        Array(10).fill(0).map((item, index) => {
                            return (
                                <div className="person-1" key={index}>
                                    <div className="touxiang-box">
                                        <div className="touxiang flex-center">
                                            <span>s</span>
                                        </div>
                                    </div>

                                    <div className="dia-div">
                                        <div className="diabox">
                                            <p className="dialog-p"> 好的阿萨大厦  </p>
                                            <div className="jiao-left" />
                                            <div className="time-div">2020-10-3  10:40</div>

                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    {
                                        index % 2 ?
                                            <>
                                                <div className="reply-div">
                                                    <div className="diabox">
                                                        <div className="dog-div" >
                                                            <img className='dog' src={props.sysinfo.av || "/oss/xz1024/img/system/av.jpg"} alt="" />
                                                        </div>
                                                        <p className="dialog-p">
                                                            地分居案例大多数反抗撒旦打撒放假啊三十六的咖
                                                </p>
                                                        <div className="jiao-left" />
                                                        <div className="time-div">2020-10-3  10:40</div>
                                                    </div>
                                                </div>
                                                <div className="clearfix"></div>
                                            </>
                                            : null
                                    }

                                </div>
                            )
                        })
                    }
                    <div className="tc">
                        <Pagination defaultCurrent={1} total={50}></Pagination>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default AboutUs
