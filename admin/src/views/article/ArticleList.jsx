import React, { useEffect, useState } from 'react'
import { Table, Tag, Space, Input, message } from 'antd';
import { Drawer, Button, Form, Checkbox, Pagination, Alert, Spin } from 'antd';
import CustomLayout from '@/components/CustomLayout'
import MonacoEditor from 'react-monaco-editor';
import './article.scss'
import { articleList, articleAdd, articlePublish } from '@/api'
import { useCallback } from 'react';
import dayjs from 'dayjs'
import { Select, Switch } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
const initArticle = {
    title: '',
    summary: '',
    content: '',
    covery_img: '',
    published: '1',
    status: '1',
    tag_ids: [],
    category_id: ''
}
const ArticleList = () => {

    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [article, setArticleFn] = useState(initArticle)
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const size = 10;
    const getArticle = async (page, size) => {
        try {
            setLoading(true)
            let res = await articleList({ page, size });
            if (res.rows) {
                setCount(res.count);
                setData(res.rows)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }

    }
    const handleChange = () => {

    }
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: text => <a className='title-ccc'>{text}</a>,
        },
        {
            title: '发布状态',
            dataIndex: 'published',
            key: 'published',
            render: (status) => {
                return (
                    <Switch
                        checked={status === '0' ? false : true}
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        onChange={(checked) => {

                        }}
                    />
                )
            }
        },
        {
            title: '类别',
            dataIndex: 'category',
            key: 'category',
            render: (cate) => {
                return (
                    <Select value="lucy" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                )
            }
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="select one country"
                        defaultValue={['china']}
                        onChange={handleChange}
                        optionLabelProp="label"
                    >
                        <Option value="china" label="China">
                            <div className="demo-option-label-item">
                                <span role="img" aria-label="China">
                                    🇨🇳
                                </span>
                                China (中国)
                            </div>
                        </Option>
                        <Option value="usa" label="USA">
                            <div className="demo-option-label-item">
                                <span role="img" aria-label="USA">
                                    🇺🇸
                            </span>
                            USA (美国)
                        </div>
                        </Option>
                    </Select>
                </>
            ),
        },
        {
            title: '发布时间',
            dataIndex: 'publish_time',
            key: 'publish_time',
            render: (text) => {
                return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '--'
            }
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="dashed" onClick={() => {
                        setIsAdd(false);
                        setVisible(true)
                        const {
                            title: title,
                            summary: summary,
                            content: content,
                            covery_img: covery_img,
                            published: published,
                            status: status,
                            tag_ids: tag_ids,
                            category_id: category_id
                        } = data.find(d => d.id === record.key);
                        console.log('title', title)
                        setArticleFn({
                            title,
                            summary,
                            content,
                            covery_img,
                            published,
                            status,
                            tag_ids,
                            category_id
                        })
                    }}>编辑</Button>
                    <Button danger>删除</Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getArticle(page, size)
    }, [])
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
        setIsAdd(true)
        setArticleFn(initArticle)
    };
    const save = async () => {
        if (!article.title) {
            message.error('标题不能为空')
            return
        }
        let res = await articleAdd(article)
        if (res?.code === '0000') {
            getArticle(page, size)
            message.success('创建成功！', 1, onClose)
        }
    };
    const updata = async () => {

    }
    const publish = () => {

    };
    function editorDidMount (editor, monaco) {
        editor.focus();
    }
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 20 }
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };


    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const setArticle = (obj) => {
        setArticleFn(() => {
            return {
                ...article,
                ...obj
            }
        })
    }
    return (
        <CustomLayout className='article-list-c'>
            <Drawer
                className='article-Drawer'
                title={isAdd ? '新建文章' : '编辑文章'}
                footer={
                    <div>
                        {
                            isAdd ?
                                <Button type="primary" onClick={save}>保存</Button>
                                :
                                <Button type="primary" onClick={updata}>更新</Button>
                        }

                    </div>
                }
                placement="right"
                closable={false}
                onClose={onClose}
                width={1000}
                visible={visible}
            //visible={true}
            >
                <Form
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        style={{ textAlign: 'left' }}
                        rules={[{ required: true, message: '标题必填!' }]}
                    >
                        <Input
                            value={article.title}
                            style={{ width: '280px' }}
                            onChange={(e) => setArticle({ title: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="摘要"
                        name="summary"
                    >
                        <TextArea
                            rows={4}
                            value={article.summary}
                            onChange={(e) => setArticle({ summary: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="分类"
                        name="category"
                        style={{ textAlign: 'left' }}
                    >
                        <Select value={article.category_id} style={{ width: 120 }} onChange={(value) => {
                            setArticle({ category_id: value })
                        }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="标签"
                        name="tags"
                        style={{ textAlign: 'left' }}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="select one country"
                            value={article.tag_ids}
                            onChange={(v) => {
                                setArticle({ tag_ids: v })
                            }}
                            optionLabelProp="label"
                        >
                            <Option value="china" label="China">
                                <div className="demo-option-label-item">
                                    <span role="img" aria-label="China">
                                        🇨🇳
                                </span>
                                China (中国)
                            </div>
                            </Option>
                            <Option value="usa" label="USA">
                                <div className="demo-option-label-item">
                                    <span role="img" aria-label="USA">
                                        🇺🇸
                            </span>
                            USA (美国)
                        </div>
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="发布"
                        name="published"
                        style={{ textAlign: 'left' }}
                    >
                        <Switch
                            checked={article.published}
                            checkedChildren="开启"
                            unCheckedChildren="关闭"
                            onChange={(checked) => {
                                setArticle({ published: checked ? '1' : '0' })
                            }}
                        />
                    </Form.Item>
                    {/*  covery_img   */}
                    <Form.Item
                        label="封面"
                        name="covery_img"
                        style={{ textAlign: 'left' }}
                    >
                        <Input
                            value={article.covery_img}
                            onChange={(e) => setArticle({ covery_img: e.target.value })}
                        />
                        <div>
                            <img style={{ maxWidth: "600px" }} src={article.covery_img} alt="" />
                        </div>

                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                    >
                        <div className="article-box">
                            <MonacoEditor
                                width="800"
                                height="600"
                                language="javascript"
                                theme="vs-dark"
                                value={article.content}
                                options={
                                    { selectOnLineNumbers: true }
                                }
                                onChange={(value) => {
                                    setArticle({ content: value })
                                }}
                                editorDidMount={editorDidMount}
                            />
                        </div>
                    </Form.Item>

                </Form>
            </Drawer>
            <div style={{ textAlign: 'left', paddingBottom: '10px' }}>
                <Button type="primary" onClick={showDrawer}>
                    新建文章
                </Button>
            </div>
            <Spin tip="Loading..." spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={data.map((item, index) => {
                        return {
                            key: item.id,
                            title: item.title,
                            published: item.published,
                            category: item.category,
                            tag_ids: item.tag_ids,
                            publish_time: item.publish_time,
                        }
                    })}
                    pagination={false}
                />
                <div style={{ padding: '10px' }}>
                    <Pagination
                        current={page} onChange={(page) => {
                            setPage(page);
                            getArticle(page, size)
                        }}
                        total={count}
                    />
                </div>
            </Spin>
        </CustomLayout>
    )

}
export default ArticleList