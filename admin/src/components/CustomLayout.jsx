import React, { useState } from 'react';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { Layout, Menu, Popover, message } from 'antd';
import { UserOutlined, LaptopOutlined, FilePdfOutlined, FontSizeOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { removeInfo } from '@/utils/auth'
import { useEffect } from 'react';
const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const CustomLayout = (props) => {
    const info = useSelector(state => state.userInfoReducer.info);
    const dispatch = useDispatch();
    const [selectedKeys, setselectedKeys] = useState(['1'])
    const m = [
        {
            title: '文章管理',
            key: "sub1",
            icon: <LaptopOutlined />,
            sub: [
                { to: '/article/list', key: '1', text: "列表" },
                { to: '/article/category', key: '2', text: "分类" },
                { to: '/article/tags', key: '3', text: "标签" },
            ]
        },
        {
            title: '图书管理',
            key: "sub2",
            icon: <FilePdfOutlined />,
            sub: [
                { to: '/book/list', key: '21', text: "列表" },
            ]
        },
        {
            title: '留言管理',
            key: "sub5",
            icon: <FontSizeOutlined />,
            sub: [
                { to: '/message/list', key: '51', text: "留言列表" },
            ]
        },
        {
            title: '用户管理',
            key: "sub3",
            icon: <UserOutlined />,
            sub: [
                { to: '/user/info', key: '31', text: "个人中心" },
                { to: '/user/permissionMgt', key: '12', text: "权限管理" },
            ]
        },
        {
            title: '系统设置',
            key: "sub4",
            icon: <UserOutlined />,
            sub: [
                { to: '/sys/set', key: '41', text: "基本设置" },
            ]
        },
    ]
    useEffect(() => {
        const { path } = props.history.config;
        let f;
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m[i].sub.length; j++) {
                if (m[i].sub[j].to === path) {
                    f = m[i].sub[j]
                    break
                }
            }
        }
        if (f) {
            setselectedKeys([f.key])
        }
    }, [])
    return (

        <Layout style={{ height: '100vh' }}>
            <Layout>
                <Sider width={180} className="site-layout-background" style={{ overflowY: 'auto', overflowX: 'hidden', }}>
                    <div style={{ height: '50px', background: "#001529", color: '#ddd', fontSize: '20px', textAlign: 'center', lineHeight: '50px' }}>后台管理</div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={selectedKeys}
                        inlineCollapsed={false}
                        openKeys={['sub1', 'sub2', 'sub3', 'sub4', 'sub5']}
                        style={{ height: "calc(100vh - 50px)", borderRight: 0 }}
                    >
                        {
                            m.map((item, index) => {
                                return (
                                    <SubMenu key={item.key} icon={item.icon} title={<b>{item.title}</b>}>
                                        {
                                            item.sub && item.sub.map((item2, index2) => {
                                                return (
                                                    <Menu.Item key={item2.key}  >
                                                        <NavLink style={{ paddingLeft: '16px' }} className='nav-link' activeClassName='active' to={item2.to}>{item2.text}</NavLink>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            })
                        }
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <div style={{ height: '50px' }}>
                        <div className="righ" style={{ float: 'right', margin: '8px' }}>
                            <Popover
                                placement="topLeft"
                                trigger="hover"
                                content={
                                    <Menu>
                                        <Menu.Item key='1'>
                                            <Link to='/user/info'>个人中心</Link>
                                        </Menu.Item>
                                        <Menu.Item key='2'>
                                            <span onClick={() => {
                                                removeInfo();
                                                dispatch({ type: "REMOVE_USER_INFO" })
                                                message.success('退出成功！', 1, () => {
                                                    window.reactHistory.push('/user/login')
                                                })
                                            }}>退出登录</span>
                                        </Menu.Item>
                                    </Menu>
                                }
                            >
                                <Avatar icon={<UserOutlined />} />
                                <span style={{ marginLeft: '10px' }}>
                                    {info && info.username}
                                    {info && info.nickname ? `（${info.nickname}）` : ''}
                                </span>
                            </Popover>
                        </div>
                    </div>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            overflowY: "auto"
                        }}
                    >
                        <div className={`${props.className}`}>
                            {props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default withRouter(CustomLayout)