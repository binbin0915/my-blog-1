import React, { useState } from 'react'
import { Radio, Button, Input, Form, Card, message } from 'antd';
import CustomLayout from '@/components/CustomLayout'
import { useSelector, useDispatch } from 'react-redux'
import { updataInfo } from '@/api'
import { setUserInfo } from '@/store/action'
const Info = ({ store }) => {
    const [form] = Form.useForm();
    const info = useSelector(state => state.userInfoReducer.info);
    const dispatch = useDispatch();
    const [nickname, setNickName] = useState(null)
    const [email, setEmail] = useState(null)

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
    }
    async function save () {
        if (nickname && nickname.length > 20) {
            message.error('昵称过长！')
            return
        }
        if (email && email.length > 50) {
            message.error('邮件格式过长！')
            return
        }
        let res = await updataInfo({
            nickname: nickname !== null ? nickname.trim() : info.nickname,
            email: email !== null ? email.trim() : info.email
        })
        if (res) {
            message.success('更新成功！')
            dispatch(setUserInfo(res))
        }
    }

    return (
        <CustomLayout>
            <Card title="个人中心" style={{ width: '80%', maxWidth: "800px", margin: '0 auto' }}>
                <Form
                    {...formItemLayout}
                    form={form}
                >

                    <Form.Item label="用户名">
                        <Input disabled value={info.username} />
                    </Form.Item>
                    <Form.Item label="昵称">
                        <Input value={nickname !== null ? nickname : info.nickname} onChange={(e) => {
                            let v = e.target.value;
                            setNickName(v)
                        }} />
                    </Form.Item>
                    <Form.Item label="邮箱">
                        <Input value={email !== null ? email : info.email} onChange={(e) => {
                            let v = e.target.value;
                            setEmail(v)
                        }} />
                    </Form.Item>

                    <Button type="primary" onClick={() => save()}>更新</Button>

                </Form>
            </Card>
        </CustomLayout>
    )

}
export default Info