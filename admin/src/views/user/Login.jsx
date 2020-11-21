import React, { useCallback, useState } from 'react'
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { login } from '@/api'
import '@/assets/style/user.scss'
import { setInfo } from '@/utils/auth'
import { Link } from 'react-router-dom';
const reg = /^[0-9a-zA-Z]{4,16}$/;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const Login = ({ history }) => {
    async function toLogin (values) {
        let res = await login(values)
        if (res) {
            if (res.code) {
                message.error(res.msg)
            } else {
                if (res.token) {
                    setInfo(JSON.stringify(res))
                    message.success('登录成功！', 1, () => {
                        history.push('/article/category')
                    })

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

        toLogin(values)

    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const [username, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [isU, setIsU] = useState(true)
    const [isPa, setIsPa] = useState(true)
    return (
        <div className='regist-c'>
            <Card className='content' title="用户登录" bordered={false}  >
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
                    <Button type="primary" htmlType="submit">  登录 </Button>
                </Form>
                <br />
                <br />
                <Link to='/user/regist'>去注册</Link>
            </Card>

        </div >
    )
}

export default Login