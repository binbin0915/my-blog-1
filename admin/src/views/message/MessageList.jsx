import React, { useState, useEffect } from 'react'
import { Table, Modal, Col, Row, Space, Input, Popover, message, Form, Popconfirm, Spin, Pagination } from 'antd';
import CustomLayout from '@/components/CustomLayout'
import dayjs from 'dayjs'
import { MessageUpdata, MessageList, MessageDel } from '@/api'
const { TextArea } = Input;
const initMessage = {
    name: "",
    email: '',
    content: ''
}
const MessageListComp = () => {
    const [targetMessage, setTargetMessage] = useState(initMessage)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0)
    const [reply, setReply] = useState('')
    const updata = async (record) => {
        if (!reply) message.error('回复信息不能为空！');
        try {
            let res = await MessageUpdata({ id: targetMessage.id, reply });
            if (res.isOk) {
                message.success('更新成功')
            }
            list(page)
        } catch (error) {

        } finally {
            setReply('')
            setVisible(false)

        }

    }
    const del = async (record) => {
        let res = await MessageDel({ id: record.key })
        if (res.isOk) {
            message.success('删除成功！')
        }
        list(page)
    }
    const columns = [
        {
            title: '昵称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return (
                    <Popover content={<div style={{ width: '2d00px' }} >
                        {text}
                    </div>} trigger="hover">
                        <span>{text && text.length > 10 ? text.slice(0, 10) + '...' : text}</span>
                    </Popover>
                )
            }
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            render: (text, record) => {
                return <span>{text}</span>
            }
        },
        {
            title: '留言',
            dataIndex: 'content',
            key: 'content',
            render: (text, record) => {
                return (
                    <Popover content={<div style={{ width: '500px' }} >
                        {text}
                    </div>} trigger="hover">
                        <span>{text && text.length > 10 ? text.slice(0, 10) + '...' : text}</span>
                    </Popover>
                )
            }
        },

        {
            title: '时间',
            dataIndex: 'created_time',
            key: 'created_time',
            render: (text, record) => {
                return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '--'
            }
        },
        {
            title: '回复内容',
            dataIndex: 'reply',
            key: 'reply',
            render: (text, record) => {
                return (
                    <Popover content={
                        <div style={{ width: '500px' }} >
                            {text}
                        </div>

                    } trigger="hover">
                        <span>{text && text.length > 10 ? text.slice(0, 10) + '...' : text}</span>
                    </Popover>
                )

            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {record.reply ?

                        <a style={{ color: '#999' }} onClick={() => {
                            setTargetMessage(record)
                            setVisible(true)
                            setReply(record.reply)
                        }}>修改回复</a>
                        :
                        <a onClick={() => {
                            setTargetMessage(record)
                            setVisible(true)
                        }}> 回复</a>
                    }

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
    async function list (page) {
        setLoading(true)
        try {
            let res = await MessageList({
                page,
                size: 10
            });
            if (res) {
                console.log(res)
                if (res.count) {
                    setData(res.rows)
                    setCount(res.count)
                }

            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        list(1)
    }, [])
    const style = { textAlign: 'left', padding: '8px 0' };
    return (
        <CustomLayout>
            <Modal
                title="回复"
                visible={visible}
                onOk={updata}
                onCancel={() => {
                    setReply('')
                    setVisible(false)
                }}
            >
                <Row gutter={[6, 4]}>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>昵称</div>
                    </Col>
                    <Col className="gutter-row" span={20}>
                        <div style={style}>{targetMessage.name}</div>
                    </Col>
                </Row>
                <Row gutter={[6, 4]}>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>邮箱</div>
                    </Col>
                    <Col className="gutter-row" span={20}>
                        <div style={style}>{targetMessage.email}</div>
                    </Col>
                </Row>
                <Row gutter={[6, 4]}>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>内容</div>
                    </Col>
                    <Col className="gutter-row" span={20}>
                        <div style={style}> {targetMessage.content}</div>
                    </Col>
                </Row>
                <Row gutter={[6, 4]}>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>回复</div>
                    </Col>
                    <Col className="gutter-row" span={20}>
                        <div style={style}> <TextArea value={reply} onChange={(e) => setReply(e.target.value)} rows={4} /></div>
                    </Col>
                </Row>
            </Modal>

            <Spin tip="Loading..." spinning={loading}>
                <Table
                    columns={columns}
                    pagination={false}
                    dataSource={
                        data.map((item) => {
                            return {
                                key: item.id,
                                ...item
                            }
                        })}
                />
                <div style={{ padding: '10px' }}>
                    <Pagination
                        defaultCurrent={1}
                        total={count}
                        current={page}
                        onChange={(page) => {
                            setPage(page);
                            list(page)
                        }}
                    />
                </div>
            </Spin>
        </CustomLayout>
    )

}
export default MessageListComp