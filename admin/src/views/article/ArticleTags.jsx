import React, { useState, useEffect } from 'react'
import { Table, Modal, Space, Input, Button, message, Form, Popconfirm, Spin } from 'antd';
import CustomLayout from '@/components/CustomLayout'
import InputColor from 'react-input-color';
import { tagAdd, tagDel, tagList, tagUpadata } from '@/api'
const initCate = {
    name: "",
    color: ''
}
const ArticleTags = () => {
    const [form] = Form.useForm()
    const [cate, setCate] = useState(initCate)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const updata = async (record) => {
        let res = await tagUpadata(record);
        if (res.isOk) {
            message.success('更新成功')

        }
        list()
    }
    const del = async (record) => {
        let res = await tagDel({ id: record.key })
        if (res.isOk) {
            message.success('删除成功！')
        }
        list()
    }
    const columns = [
        {
            title: '分类名',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return (
                    <Input value={text} style={{ width: '150px' }} onChange={(e) => {
                        let v = e.target.value
                        let temp = data.slice();
                        let f = temp.find(d => d.id === record.key);
                        if (f) {
                            f.name = v
                        }
                        setData(temp)
                    }} />
                )
            }
        },
        {
            title: '颜色',
            dataIndex: 'color',
            key: 'color',
            render: (text, record) => {
                console.log('text', text)
                return (
                    <>
                        <InputColor
                            initialValue={text || ''}
                            onChange={(value) => {
                                let v = value.hex
                                let temp = data.slice();
                                let f = temp.find(d => d.id === record.key);
                                if (f) {
                                    f.color = v
                                }
                                setData(temp)
                            }}
                            placement="right"
                        />

                    </>
                )
            }
        },

        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        updata(record)
                    }}>更新</a>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => del(record)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a style={{ color: '#ff4d4f' }}>删除</a>
                    </Popconfirm>

                </Space>
            ),
        },
    ];
    async function list () {
        setLoading(true)
        try {
            let res = await tagList();
            if (res) {
                setData(res.rows)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }

    }
    const add = async () => {
        if (!cate.name) {
            message.error("类名不能为空！")
            return
        }
        try {
            let res = await tagAdd(cate)
            if (res.isOk) {
                message.success('创建成功')
                list()
                setVisible(false)
            }
        } catch (err) {

        }
    }
    useEffect(() => {
        list()
    }, [])
    return (
        <CustomLayout>
            <Modal
                title="新建Tag"
                visible={visible}
                onOk={add}
                onCancel={() => {
                    setCate(initCate)
                    setVisible(false)
                }}
            >
                <Form
                    layout={{
                        labelCol: { span: 8 },
                        wrapperCol: { span: 16 },
                    }}
                    name="basic"
                    form={form}
                >
                    <Form.Item
                        label="Tag名"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input value={cate.name} defaultValue='' onChange={e => {
                            setCate(() => {
                                return {
                                    ...cate,
                                    name: e.target.value
                                }
                            })
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="颜色"
                        name="weight"
                        style={{ textAlign: 'left' }}
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >

                        <InputColor
                            initialValue="#5e72e4"
                            defaultValue={'#5e72e4'}
                            value={cate.color}
                            onChange={(value) => {
                                setCate(() => {
                                    return {
                                        ...cate,
                                        color: value.hex
                                    }
                                })

                            }}
                            placement="right"
                        />

                    </Form.Item>
                </Form>
            </Modal>
            <div style={{ paddingBottom: '10px', textAlign: 'left' }}>
                <Button type='primary'
                    onClick={() => {
                        setVisible(true)
                        setCate(initCate)
                        form.resetFields()
                    }}>新建Tag</Button>
            </div>
            <Spin tip="Loading..." spinning={loading}>
                <Table columns={columns} dataSource={
                    data.map((item) => {
                        return {
                            key: item.id,
                            name: item.name,
                            color: item.color
                        }
                    })} />
            </Spin>
        </CustomLayout>
    )

}
export default ArticleTags