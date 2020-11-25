import React, { useState, useEffect } from 'react'
import { Table, Modal, Space, Input, Button, message, Form, Popconfirm, Spin } from 'antd';
import { InputNumber } from 'antd';
import CustomLayout from '@/components/CustomLayout'
import { categoryAdd, categoryDel, categoryList, categoryUpadata } from '@/api'
const initCate = {
    name: "",
    wight: ''
}
const ArticleList = () => {
    const [form] = Form.useForm()
    const [cate, setCate] = useState(initCate)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const updata = async (record) => {
        let res = await categoryUpadata(record);
        if (res.isOk) {
            message.success('更新成功')
        } else {
            message.error(res.msg || '')
        }
        list()
    }
    const del = async (record) => {
        let res = await categoryDel({ id: record.key })
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
            title: 'label',
            dataIndex: 'label',
            key: 'label',
            render: (text, record) => {
                return (
                    <Input value={text} style={{ width: '150px' }} onChange={(e) => {
                        let v = e.target.value
                        let temp = data.slice();
                        let f = temp.find(d => d.id === record.key);
                        if (f) {
                            f.label = v
                        }
                        setData(temp)
                    }} />
                )
            }
        },
        {
            title: '权重',
            dataIndex: 'weight',
            key: 'weight',
            render: (text, record) => {
                return (
                    <InputNumber min={1}
                        style={{ width: '90px' }}
                        value={text}
                        onChange={(value) => {
                            let v = value
                            let temp = data.slice();
                            let f = temp.find(d => d.id === record.key);
                            if (f) {
                                f.weight = v
                            }
                            setData(temp)
                        }} />
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
            let res = await categoryList();
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
            let res = await categoryAdd(cate)
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
                title="新建分类"
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
                        label="类名"
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
                        label="label"
                        name="label"
                        rules={[{ required: true, message: 'Please input your label!' }]}
                    >
                        <Input value={cate.label} defaultValue='' onChange={e => {
                            setCate(() => {
                                return {
                                    ...cate,
                                    label: e.target.value
                                }
                            })
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="权重"
                        name="weight"
                        style={{ textAlign: 'left' }}
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <InputNumber min={1}
                            style={{ width: '90px' }}
                            defaultValue={1}
                            value={cate.weight}
                            onChange={(value) => {
                                setCate(() => {
                                    return {
                                        ...cate,
                                        weight: value
                                    }
                                })
                            }} />
                    </Form.Item>
                </Form>
            </Modal>
            <div style={{ paddingBottom: '10px', textAlign: 'left' }}>
                <Button type='primary'
                    onClick={() => {
                        setVisible(true)
                        setCate(initCate)
                        form.resetFields()
                    }}>新建分类</Button>
            </div>
            <Spin tip="Loading..." spinning={loading}>
                <Table columns={columns} dataSource={
                    data.map((item) => {
                        return {
                            key: item.id,
                            name: item.name,
                            weight: item.weight,
                            label: item.label
                        }
                    })} />
            </Spin>
        </CustomLayout>
    )

}
export default ArticleList