import React, { useCallback, useState } from 'react'
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { regist } from '@/api'
import '@/assets/style/user.scss'
import { Link } from 'react-router-dom';
const reg = /^[0-9a-zA-Z]{4,16}$/;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const Regist = () => {
    async function toRegist (values) {
        let res = await regist(values)
        if (res) {
            console.log('res', res)
            if (res.code) {
                message.error(res.msg)
            } else {
                if (res.isOk) {
                    message.success('注册成功！')
                }
            }
        }

    }
    const onFinish = values => {
        if (!values.username) {
            setIsU(false)
            return;
        }
        if (!values.password) {
            setIsPa(false)
            return;
        }
        if (!values.repassword) {
            setIsRePa(false)
            return;
        }
        toRegist(values)

    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const [username, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [repassword, setRePassWord] = useState('')
    const [isU, setIsU] = useState(true)
    const [isPa, setIsPa] = useState(true)
    const [isRePa, setIsRePa] = useState(true)
    return (
        <div className='regist-c'>
            <Card className='content' title="用户注册" bordered={false}  >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className='user-form'
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        validateStatus={!isU ? "error" : ""}
                        help={!isU ? "用户名必须4-16位的字母或者数字" : ""}
                    //rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input value={username} onChange={(e) => {
                            let v = e.target.value;
                            setIsU(reg.test(v))
                            setUserName(v)
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        validateStatus={!isPa ? "error" : ""}
                        help={!isPa ? "密码不为空必须4-16位的字母或者数字" : ""}
                    //rules={[{ required: true, message: '密码不为空切为4-16位的字母或者数字' }]}
                    >
                        <Input.Password
                            value={password} onChange={(e) => {
                                let v = e.target.value;
                                setIsPa(reg.test(v))
                                setPassWord(v)
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="再次确认密码"
                        name="repassword"
                        validateStatus={!isRePa ? "error" : ""}
                        help={!isRePa ? "和密码不一致" : ""}
                    //  rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            value={repassword} onChange={(e) => {
                                let v = e.target.value;
                                setIsRePa(v === password)
                                setRePassWord(v)
                            }}
                        />
                    </Form.Item>


                    <Button type="primary" htmlType="submit">  注册 </Button>
                    <br />
                    <br />
                    <Link to='/user/login'>去登录</Link>

                </Form>

            </Card>

        </div >
    )
}

export default Regist