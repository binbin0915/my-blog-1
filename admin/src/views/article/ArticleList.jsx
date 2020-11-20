import React, { useEffect, useState, useCallback } from 'react'
import { Table, Tag, Space, Input, message } from 'antd';
import { Drawer, Button, Form, Checkbox, Pagination, Popconfirm, Spin } from 'antd';
import CustomLayout from '@/components/CustomLayout'
import MonacoEditor from 'react-monaco-editor';
import './article.scss'
import { articleList, articleAdd, articleDel, tagList, categoryList, articleUpdata } from '@/api'
import dayjs from 'dayjs'
import { Select, Switch } from 'antd';
const cloneDeep = require('lodash.clonedeep');

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

const set = new Set();
const ArticleList = () => {
    const [form] = Form.useForm()
    const [data, setData] = useState([]);
    const [tag, setTagList] = useState([])
    const [ca, setCa] = useState([])
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [article, setArticleFn] = useState(initArticle)
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const size = 10;
    const onClose = useCallback(() => {
        console.log('onClose')
        form.resetFields()
        setArticleFn(initArticle)
        setVisible(false);
        setIsAdd(true)
    }, [])
    const getArticle = useCallback(
        async (page, size) => {
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

        }, [article, page, size])
    const save = useCallback(
        async () => {
            if (!article.title) {
                message.error('标题不能为空')
                return
            }
            let res = await articleAdd(article)
            if (res?.code === '0000') {
                getArticle(page, size)
                message.success('创建成功！', 1, onClose)
            }
        }, [article, page, size])
    const updata = useCallback(
        async (article, source) => {
            if (source === 'detail') {
                setLoading2(true)
            }
            let res = await articleUpdata(article)
            if (res.isOk) {
                message.success('更新成功', 1, onClose);
                getArticle(page, size)
            }
            setLoading2(false)
        }, [article, page, size])
    const del = useCallback(
        async (id) => {
            let res = await articleDel({ id })
            if (res.isOk) {
                message.success('删除成功', 1);
                getArticle(page, size)
            } else {
                message.error(res.msg || '未知错误')
            }
        }, [])
    const taglist = useCallback(
        async () => {
            let res = await tagList();
            if (res) {
                setTagList(res.rows)
            }
        }, [])
    const caList = useCallback(
        async () => {
            let res = await categoryList();
            if (res) {
                setCa(res.rows)
            }
        }, [])
    const showDrawer = useCallback(() => {
        setVisible(true);
    }, [])

    const editorDidMount = useCallback((editor, monaco) => {
        editor.focus();
    }, [])
    const setArticle = useCallback((article, obj) => {
        setArticleFn(() => {
            return {
                ...article,
                ...obj
            }
        })
    }, [])
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
            render: (status, record) => {
                return (
                    <Switch
                        checked={status === '0' ? false : true}
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        onChange={(checked) => {
                            let temp = data.slice()
                            let f = temp.find(d => d.id == record.key);
                            f.published = checked ? '1' : '0'
                            setData(temp)
                        }}
                    />
                )
            }
        },
        {
            title: '类别',
            dataIndex: 'category',
            key: 'category',
            render: (cate, record) => {
                const f = ca.find(d => d.id == cate)
                return (
                    <Select
                        value={f ? f.name : ""}
                        style={{ width: 120 }}
                        onChange={(e) => {
                            let temp = data.slice()
                            let f = temp.find(d => d.id == record.key);
                            f.category_id = e
                            setData(temp)
                        }}>
                        { ca.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>)}
                    </Select>
                )
            }
        },
        {
            title: 'Tags',
            key: 'tag_ids',
            dataIndex: 'tag_ids',
            render: (tags, record) => {
                return (
                    <Select
                        mode="multiple"
                        style={{ width: '100%', minWidth: "50px" }}
                        placeholder="select one tag"
                        value={tags.filter(Boolean)}
                        onChange={(e) => {
                            let temp = data.slice()
                            let f = temp.find(d => d.id == record.key);
                            f.tag_ids = e
                            setData(temp)
                        }}
                        optionLabelProp="label"
                    >
                        {
                            tag.map(d => (
                                <Option key={d.id} value={d.id + ''} label={d.name}>
                                    <div className="demo-option-label-item">
                                        <span role="img" aria-label="China">
                                            {d.name}
                                        </span>
                                    </div>
                                </Option>
                            ))
                        }
                    </Select>
                )
            },
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
                    <Button type='primary' onClick={() => {
                        let article = data.find(d => d.id == record.key)
                        updata(article, 'list')
                    }}>更新</Button>
                    <Button type="dashed" onClick={() => {
                        const f = data.find(d => d.id == record.key);
                        let temp = cloneDeep(f);
                        console.log('temp', temp)
                        setIsAdd(false);
                        setArticleFn(temp)
                        form.setFieldsValue(temp)
                        setVisible(true)

                    }}>编辑</Button>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => del(record.key)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>删除</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    useEffect(() => {
        getArticle(page, size)
        taglist();
        caList()
    }, [])

    return (
        <CustomLayout className='article-list-c'>
            <Drawer
                className='article-Drawer'
                title={isAdd ? '新建文章' : '编辑文章'}
                footer={
                    <div>
                        <Button type="primary" onClick={() => { isAdd ? save() : updata(article, 'detail') }}>
                            {isAdd ? "保存" : "更新"}
                        </Button>
                    </div>
                }
                placement="right"
                closable={false}
                onClose={onClose}
                width={1030}
                visible={visible}
            >
                <Spin tip="Loading..." spinning={loading2}>
                    <Form
                        layout={{ labelCol: { span: 2 }, wrapperCol: { span: 20 } }}
                        form={form}
                        name="basic"
                        style={{ paddingLeft: '30px' }}
                    >
                        <Form.Item
                            label="标题"
                            name="title"
                            style={{ textAlign: 'left' }}
                        >
                            <Input
                                value={article.title}
                                style={{ width: '300px' }}
                                onChange={(e) => setArticle(article, { title: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item
                            label="摘要"
                            name="summary"
                            style={{ textAlign: 'left' }}
                        >
                            <TextArea
                                style={{ width: "600px" }}
                                rows={4}
                                value={article.summary}
                                onChange={(e) => setArticle(article, { summary: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item
                            label="分类"
                            name="category_id"
                            style={{ textAlign: 'left' }}
                        >
                            <Select
                                value={article.category_id + ""}
                                style={{ width: 120 }}
                                onChange={(value) => { setArticle(article, { category_id: value + '' }) }}>
                                {ca.map(d => <Option key={d.id} value={d.id + ""}>{d.name}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="标签"
                            name="tag_ids"
                            style={{ textAlign: 'left' }}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '300px' }}
                                placeholder="select one tag"
                                optionLabelProp="label"
                                value={article.tag_ids.filter(Boolean)}
                                onChange={(v) => { console.log('v', v); setArticle(article, { tag_ids: v }) }}
                            >
                                {
                                    tag.map(d => (
                                        <Option key={d.id} value={d.id + ""} label={d.name}>
                                            <div className="demo-option-label-item" >
                                                <span role="img" aria-label="China">
                                                    {d.name}
                                                </span>
                                            </div>
                                        </Option>
                                    ))
                                }
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
                                onChange={(checked) => { setArticle(article, { published: checked ? '1' : '0' }) }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="封面"
                            name="covery_img"
                            style={{ textAlign: 'left' }}
                        >
                            <div>
                                <Input
                                    style={{ width: "600px" }}
                                    value={article.covery_img}
                                    onChange={(e) => setArticle(article, { covery_img: e.target.value })}
                                />
                                <div style={{ textAlign: 'left', padding: '10px 0' }}>
                                    <img style={{ maxWidth: "600px" }} src={article.covery_img} alt="" />
                                </div>
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="内容"
                            name="content"
                        >
                            <div className="article-box">
                                <MonacoEditor
                                    width="890"
                                    height={(document.documentElement.clientHeight || 800) - 200}
                                    language="javascript"
                                    style={{ height: '900px' }}
                                    //  theme="vs-dark"
                                    value={article.content}
                                    options={{ selectOnLineNumbers: true }}
                                    onChange={(value) => { setArticle(article, { content: value }) }}
                                    editorDidMount={editorDidMount}
                                />
                            </div>
                        </Form.Item>
                    </Form>
                </Spin>
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
                            category: item.category_id,
                            tag_ids: item.tag_ids,
                            publish_time: item.publish_time,
                        }
                    })}
                    pagination={false}
                />
                <div style={{ padding: '10px' }}>
                    <Pagination
                        current={page}
                        total={count}
                        onChange={(page) => {
                            setPage(page);
                            getArticle(page, size)
                        }}
                    />
                </div>
            </Spin>
        </CustomLayout >
    )

}
export default ArticleList