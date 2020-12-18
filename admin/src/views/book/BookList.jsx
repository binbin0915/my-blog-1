import React, { useState, useEffect } from 'react'
import { Table, Modal, Space, Input, Button, message, Form, Popconfirm, Spin } from 'antd';
import CustomLayout from '@/components/CustomLayout'
import { bookAdd, bookDel, bookList, bookUpdata } from '@/api'
const initCate = {
    name: "",
    url: '',
    img: ''
}
const BookList = () => {
    const [form] = Form.useForm()
    const [book, setBook] = useState(initCate)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const updata = async (record) => {
        let res = await bookUpdata(record);
        if (res.isOk) {
            message.success('更新成功')
        }
        list()
    }
    const del = async (record) => {
        let res = await bookDel({ id: record.key })
        if (res.isOk) {
            message.success('删除成功！')
        }
        list()
    }
    const columns = [
        {
            title: '书名',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                console.log(text)
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
            title: '地址',
            dataIndex: 'url',
            key: 'url',
            render: (text, record) => {
                return (
                    <Input value={text} style={{ width: '250px' }} onChange={(e) => {
                        let v = e.target.value
                        let temp = data.slice();
                        let f = temp.find(d => d.id === record.key);
                        if (f) {
                            f.url = v
                        }
                        setData(temp)
                    }} />
                )
            }
        },
        {
            title: '封面',
            dataIndex: 'img',
            key: 'img',
            render: (text, record) => {
                return (

                    <Input value={text} style={{ width: '250px' }} onChange={(e) => {
                        let v = e.target.value
                        let temp = data.slice();
                        let f = temp.find(d => d.id === record.key);
                        if (f) {
                            f.img = v
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
            let res = await bookList();
            if (res) {
                setData(res)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }

    }
    const add = async () => {
        if (!book.name) {
            message.error("书名不能为空！")
            return
        }
        try {
            let res = await bookAdd(book)
            if (res.isOk) {
                message.success('创建成功')
                list()

            }
            setVisible(false)
        } catch (err) {

        }


    }

    useEffect(() => {
        list()
    }, [])
    return (
        <CustomLayout>
            <Modal
                title="新增书籍"
                visible={visible}
                onOk={add}
                onCancel={() => {
                    setBook(initCate)
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
                        label="书名"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input value={book.name} defaultValue='' onChange={e => {
                            setBook(() => {
                                return {
                                    ...book,
                                    name: e.target.value
                                }
                            })
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="url"
                    >
                        <Input value={book.url} defaultValue='' onChange={e => {
                            setBook(() => {
                                return {
                                    ...book,
                                    url: e.target.value
                                }
                            })
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="封面"
                        name="img"
                    >
                        <Input value={book.img} defaultValue='' onChange={e => {
                            setBook(() => {
                                return {
                                    ...book,
                                    img: e.target.value
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
                        setBook(initCate)
                        form.resetFields()
                    }}>新增书籍</Button>
            </div>
            <Spin tip="Loading..." spinning={loading}>
                <Table columns={columns} dataSource={
                    data.map((item) => {
                        return {
                            key: item.id,
                            name: item.name,
                            url: item.url,
                            img: item.img
                        }
                    })} />
            </Spin>
        </CustomLayout>
    )

}
export default BookList