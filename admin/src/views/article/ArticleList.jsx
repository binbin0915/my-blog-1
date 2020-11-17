import React, { useState } from 'react'
import { Table, Tag, Space, Input, message } from 'antd';
import { Drawer, Button } from 'antd';
import CustomLayout from '@/components/CustomLayout'
import MonacoEditor from 'react-monaco-editor';
import '@/assets/style/article.scss'
import { articleList, articleAdd, articlePublish } from '@/api'
import { useCallback } from 'react';
const ArticleList = () => {

    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: '状态',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '类别',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: '发布时间',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
            date: '2020-10-10'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    const [visible, setVisible] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')
    const showDrawer = () => {
        setVisible(true);
    };
    const clear = useCallback(() => {
        setTitle('')
        setContent('')
    })
    const onClose = () => {
        setVisible(false);
        setIsAdd(true)
        clear()
    };
    const save = async () => {
        if (!title) {
            message.error('标题不能为空')
            return
        }
        let res = await articleAdd({
            title,
            content
        })
        if (res?.code === '0000') {
            message.success('创建成功！')
        }


    };
    const publish = () => {

    };
    function editorDidMount (editor, monaco) {
        editor.focus();
    }

    return (
        <CustomLayout>
            <Drawer
                className='article-Drawer'
                title={isAdd ? '新建文章' : '编辑文章'}
                footer={
                    <div>
                        <Button onClick={save}>保存</Button>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <Button type="primary" onClick={publish}>发布</Button>
                    </div>
                }
                placement="right"
                closable={false}
                onClose={onClose}
                width={1000}
                visible={visible}
            >
                <div style={{ marginBottom: 16, width: '300px' }}>
                    <Input addonBefore="标题" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="article-box">
                    <MonacoEditor
                        width="800"
                        height="600"
                        language="javascript"
                        theme="vs-dark"
                        value={content}
                        options={
                            { selectOnLineNumbers: true }
                        }
                        onChange={(value) => {
                            setContent((content) => {
                                content = value;
                                return content;
                            });
                        }}
                        editorDidMount={editorDidMount}
                    />

                </div>
            </Drawer>
            <div>
                <Button type="primary" onClick={showDrawer}>
                    新建文章
                </Button>
                <br />
                <br />
            </div>

            <Table columns={columns} dataSource={data} />
        </CustomLayout >
    )

}
export default ArticleList