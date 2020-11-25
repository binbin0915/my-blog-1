import React, { useEffect, useState } from 'react'
import { Button, Input, Form, Card, message } from 'antd';
import CustomLayout from '@/components/CustomLayout'
import { sysInfo, updataSysInfo } from '@/api'
const SysSet = (props) => {
    const [form] = Form.useForm();
    const [info, setInfo] = useState({})

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 },
    }
    async function updata () {
        let res = await updataSysInfo(info)
        if (res) {
            message.success('更新成功！')
        }
        infolist()

    }
    async function infolist () {

        let res = await sysInfo()
        if (res) {
            setInfo(res[0] || {})
        }
    }

    useEffect(() => {
        infolist()
    }, [])
    return (
        <CustomLayout>
            <Card title="基本设置" style={{ width: '80%', maxWidth: "800px", margin: '0 auto' }}>
                <Form
                    {...formItemLayout}
                    form={form}
                >
                    <Form.Item label="logo">
                        <Input value={info.logo}
                            onChange={(e) => {
                                setInfo((info) => {
                                    return {
                                        ...info,
                                        logo: e.target.value
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="favicon">
                        <Input value={info.ico}
                            onChange={(e) => {
                                setInfo((info) => {
                                    return {
                                        ...info,
                                        ico: e.target.value
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="meta_keyword">
                        <Input value={info.meta_keyword}
                            onChange={(e) => {
                                setInfo((info) => {
                                    return {
                                        ...info,
                                        meta_keyword: e.target.value
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="meta_description">
                        <Input value={info.meta_description}
                            onChange={(e) => {
                                setInfo((info) => {
                                    return {
                                        ...info,
                                        meta_description: e.target.value
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="主页头像">
                        <Input value={info.av}
                            onChange={(e) => {
                                setInfo((info) => {
                                    return {
                                        ...info,
                                        av: e.target.value
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="主页name">
                        <Input value={info.name}
                            onChange={(e) => {
                                setInfo((info) => {
                                    return {
                                        ...info,
                                        name: e.target.value
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="主页描述">
                        <Input value={info.discribe}
                            onChange={(e) => {
                                setInfo((info) => {
                                    return {
                                        ...info,
                                        discribe: e.target.value
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="主页github地址">
                        <Input value={info.github}
                            onChange={(e) => {
                                setInfo((info) => {
                                    return {
                                        ...info,
                                        github: e.target.value
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="主页email地址">
                        <Input value={info.email}
                            onChange={(e) => {
                                setInfo((info) => {
                                    return {
                                        ...info,
                                        email: e.target.value
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="底部footer信息">
                        <Input.TextArea value={info.footer}
                            style={{ height: '80px' }}
                            onChange={(e) => {
                                setInfo((info) => {
                                    return {
                                        ...info,
                                        footer: e.target.value
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="关于页面描述">
                        <Input.TextArea value={info.aboutme}
                            style={{ height: '200px' }}
                            onChange={(e) => {
                                setInfo((info) => {
                                    return {
                                        ...info,
                                        aboutme: e.target.value
                                    }
                                })
                            }}
                        />
                    </Form.Item>
                    <Button type="primary" onClick={() => updata()}>更新</Button>

                </Form>
            </Card>
        </CustomLayout>
    )

}
export default SysSet