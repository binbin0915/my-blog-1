import Layout from '@/src/components/layout'
import { message, Pagination, Form, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { MessageAdd, MessageList } from "@/src/api"
import { storageUtil } from '@/src/utils/tools'
import dayjs from 'dayjs'
import "./index.less"

const AboutUs = (props) => {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1)
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };
    const [form] = Form.useForm();
    const validateMessages = {
        required: '${label}不能为空!',
        types: {
            email: '${label}不是个有效的邮箱!',
        },
        string: {
            range: '${label}长度不能超过 ${max}',
        },
    };
    useEffect(() => {
        let head = document.head || document.getElementsByTagName('head')[0]
        let s = document.createElement('script');
        s.setAttribute('src', 'https://pv.sohu.com/cityjson?ie=utf-8');
        head.appendChild(s);
        MessageListFn(1)
    }, [])
    async function MessageListFn(page) {
        setPage(page)
        let res = await MessageList({
            page, size: 10,
        });
        if (res && res.rows) {
            setData(res.rows);
            setCount(res.count)
        }
    }
    const onFinish = async (values) => {
        if (storageUtil.get('m')) {
            message.error('每分钟只能留言一次！')
            return
        }
        let res = await MessageAdd({
            ip: JSON.stringify(window.returnCitySN || {}),
            ua: navigator.userAgent,
            ...values
        })
        if (res) {
            if (res.isOk) {
                message.success('留言成功！');
                storageUtil.set('m', 1);
                MessageListFn(1);
                form.setFieldsValue({ content: '' });
            } else {
                message.error(res.msg)
            }
        }
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
                        <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                            <Form.Item name={['name']} label="昵称" rules={[{ required: true, type: 'string', max: 20 }]}>
                                <Input style={{ width: 400, maxWidth: '90%' }} />
                            </Form.Item>
                            <Form.Item name={['email']} label="邮箱" rules={[{ required: true, type: 'email', max: 50 }]}>
                                <Input placeholder={"请填真实邮箱第一时间收到回复"} style={{ width: 400, maxWidth: '90%' }} />
                            </Form.Item>
                            <Form.Item name={['content']} label="内容" rules={[{ required: true, type: 'string', max: 200 }]}>
                                <Input.TextArea placeholder={"不要输入表情"} style={{ width: 400, height: 100, maxWidth: '90%' }} />
                            </Form.Item>
                            <div className="tc">
                                <Button type="primary" htmlType="submit">
                                    留言
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <img className='flower' src="https://lianxiaozhuang.oss-cn-beijing.aliyuncs.com/xz1024/img/common/flower.png" alt="" />
                </div>
                <div className="message-list-box">
                    {
                        data.map((item, index) => {
                            return (
                                <div className="person-1" key={index}>
                                    <div className="touxiang-box">
                                        <div className="touxiang flex-center">
                                            <span>{item.name && item.name.trim().slice(0, 1)}</span>
                                        </div>
                                    </div>
                                    <div className="dia-div">
                                        <div className="diabox">
                                            <p className="dialog-p">{item.content}</p>
                                            <div className="jiao-left" />
                                            <div className="time-div">{dayjs(item.created_time).format('YYYY-MM-DD HH:mm:ss')}</div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    {
                                        item.reply ?
                                            <>
                                                <div className="reply-div">
                                                    <div className="diabox">
                                                        <div className="dog-div" >
                                                            <img className='dog' src={props.sysinfo.av || "/oss/xz1024/img/system/av.jpg"} alt="" />
                                                        </div>
                                                        <p className="dialog-p">{item.reply} </p>
                                                        <div className="jiao-left" />
                                                        <div className="time-div">{dayjs(item.repay_at).format('YYYY-MM-DD HH:mm:ss')}</div>
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
                        <Pagination
                            defaultCurrent={1}
                            total={count}
                            current={page}
                            onChange={(page) => {

                                MessageListFn(page)
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default AboutUs
