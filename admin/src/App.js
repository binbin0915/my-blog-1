import React from 'react';
import AllRoutes from './routes';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, NavLink } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Popover } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default (props) => (
    <Router>
        <Layout style={{ height: '100vh' }}>
            <Layout>

                <Sider width={260} className="site-layout-background" style={{ overflowY: 'auto', overflowX: 'hidden', }}>
                    <div style={{ height: '50px', color: '#ddd', fontSize: '20px', textAlign: 'center', lineHeight: '50px' }}>后台管理</div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: "calc(100vh - 50px)", borderRight: 0 }}
                    >
                        <SubMenu key="sub1" icon={<LaptopOutlined />} title="文章管理">
                            <Menu.Item key="1">
                                <NavLink className='nav-link' activeClassName='active' to='/article/list'>列表</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <NavLink className='nav-link' activeClassName='active' to='/article/classify'>分类</NavLink>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <NavLink className='nav-link' activeClassName='active' to='/article/tags'>标签</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<UserOutlined />} title="用户管理">
                            <Menu.Item key="15">用户列表</Menu.Item>
                            <Menu.Item key="16">用户权限</Menu.Item>
                        </SubMenu>

                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <div style={{ height: '50px' }}>

                        <div className="righ" style={{ float: 'right', margin: '8px' }}>
                            <Popover
                                placement="topLeft"
                                trigger="hover"
                                content={
                                    <div style={{ width: '100px' }}>
                                        <ul>
                                            <li> <NavLink className='nav-link' activeClassName='active' to='/article/list'>列表</NavLink></li>
                                            <li> <NavLink className='nav-link' activeClassName='active' to='/article/list'>列表</NavLink></li>
                                        </ul>
                                    </div>
                                }
                            >
                                <Avatar icon={<UserOutlined />} />
                                <span style={{ marginLeft: '10px' }}>lianxiaozhuang</span>
                            </Popover>

                        </div>
                    </div>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >

                        <Switch>
                            <Route exact path="/" render={() => <Redirect to="/article/list" push />} />
                            <Route path="/" render={() => <AllRoutes store={props.store} />} />
                        </Switch>

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </Router>


)