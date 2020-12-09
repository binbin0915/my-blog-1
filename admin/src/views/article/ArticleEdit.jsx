import React, { useEffect, useState, useCallback } from 'react'
import { Affix, Input, message, Button, Form, Spin, Select, Switch } from 'antd';
import MonacoEditor from 'react-monaco-editor';
import { CloseCircleOutlined } from '@ant-design/icons';
import './article.scss'
import { tagList, categoryList, articleUpdata, getArticleDetail } from '@/api'
import Draggable from 'react-draggable';
import './markdown.scss'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

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

const ArticleList = (props) => {
    const [form] = Form.useForm()
    const [tag, setTagList] = useState([])
    const [ca, setCa] = useState([])
    const [article, setArticleFn] = useState(initArticle)
    const [loading, setLoading] = useState(false);
    const [showViewBox, setShowViewBox] = useState(false)
    const updata = useCallback(
        async (article, source) => {
            if (source === 'detail') {
                setLoading(true)
            }
            let res = await articleUpdata(article)
            if (res.isOk) {
                message.success('更新成功', 1);
                getArticleDetailFn()
            }
            setLoading(false)
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
    }, []);
    const getArticleDetailFn = useCallback(async () => {
        const { id } = props.query;
        let res = await getArticleDetail({ id })
        if (res.id) {
            setArticleFn(res)
            form.setFieldsValue({
                title: res.title,
                summary: res.summary,
                content: res.content,
                covery_img: res.covery_img,
                published: res.published,
                status: res.status,
                tag_ids: res.tag_ids,
                category_id: res.category_id

            })
            console.log(res)
        } else {
            message.error(res.msg || '未知错误!')
        }
    }, [])


    useEffect(() => {
        getArticleDetailFn()
        taglist();
        caList()

    }, [])
    console.log(article)
    return (
        <>

            <Spin tip="Loading..." spinning={loading}>
                <Affix offsetTop={10} style={{ zIndex: 9999 }}>
                    <Button type="primary" onClick={() => { updata(article, 'detail') }}>
                        {"更新"}
                    </Button>
                    &nbsp;
                    &nbsp;
                    <Button onClick={() => { setShowViewBox(true) }}>
                        {"预览"}
                    </Button>
                    {/*  setShowViewBox(false) */}
                </Affix>
                <div className='article-box'>
                    <Form
                        layout={{ labelCol: { span: 2 }, wrapperCol: { span: 20 } }}
                        form={form}
                        name="basic"
                        style={{ paddingLeft: '30px' }}
                    >
                        <Form.Item
                            label="标题"
                            name="title"
                            form={form}
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
                                checked={article.published == '1'}
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
                            <div className="article-edit-box">
                                <MonacoEditor
                                    width={
                                        document.documentElement.clientWidth ?
                                            document.documentElement.clientWidth * 0.8
                                            : 900
                                    }
                                    height='600'
                                    height={(document.documentElement.clientHeight || 800) - 200}
                                    language="javascript"
                                    value={article.content}
                                    options={{ selectOnLineNumbers: true }}
                                    onChange={(value) => { setArticle(article, { content: value }) }}
                                    editorDidMount={editorDidMount}
                                />
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
            {
                showViewBox ?
                    <Draggable
                        handle=".handle"
                        defaultPosition={{ x: 0, y: 0 }}
                        position={null}
                        grid={[25, 25]}
                        scale={1}
                        style={{ zIndex: '99999' }}
                    >
                        <div
                            className='markdown-views-box handle'
                            style={{ display: 'flex' }}
                        >
                            <div className='mv-ti'>
                                <p>
                                    文章内容预览（<span>本区域可以拖动</span>）
                                </p>
                                <div className="close" onClick={() => {
                                    setShowViewBox(false)
                                }}>
                                    <CloseCircleOutlined />
                                </div>
                            </div>
                            <div className="content-box">
                                <div className="markdown-body"
                                    dangerouslySetInnerHTML={{ __html: marked(article.content) }}>
                                </div>
                            </div>
                        </div>
                    </Draggable>
                    : null
            }
        </>
    )

}
export default ArticleList