import env from '@/config/env'
import routesConfig, { whiteList } from './conf';
import queryString from 'query-string';
import AllComponents from '../views';
import React, { useEffect } from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import { getInfo, setInfo } from '@/utils/auth'
import { fetchUserInfo } from '@/store/action'
export default function ({ store }) {

    function componentPermissionFn (component, r) {
        function isLogin () {
            let info = getInfo();
            if (!info) return false;
            let obj = JSON.parse(info);
            if (obj && obj.token) {
                return true
            } else {
                return false
            }
        }
        if (!isLogin()) {
            if (whiteList.includes(r.name)) {
                return component;
            } else {

                return <Redirect to="/user/login" />
            }
        } else {
            let info = store.getState().userInfoReducer.info;
            if (!info.token) {
                store.dispatch(fetchUserInfo())
            }
        }
        return component;
    }
    useEffect(() => {
        let timer = null;
        document.addEventListener('click', () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setInfo(getInfo())
            }, 3000)
        })
    }, [])
    return (
        <>
            {
                env.runEnv === 'dev' && (
                    <Dropdown
                        overlay={
                            <Menu>
                                {
                                    routesConfig.map(r => {
                                        const route = r => <Menu.Item> <Link to={r.path} >{r.name}</Link> </Menu.Item>
                                        return r.component ? route(r) : r.subs.map(r => route(r))
                                    })
                                }
                            </Menu>
                        }
                        placement="bottomLeft">
                        <Button style={{ position: 'fixed', zIndex: '9999999', left: "200px" }}>测试</Button>
                    </Dropdown>
                )
            }
            <Switch>
                {
                    routesConfig.map(r => {
                        const route = r => {
                            const Component = AllComponents[r.component] || AllComponents['App404'];
                            const routeParams = {
                                exact: true,
                                path: r.route || r.path,
                                name: r.name || '',
                                render: (props) => {
                                    const reg = /\?\S*/g;
                                    const queryParams = window.location.href.match(reg);
                                    const { params } = props.match;
                                    Object.keys(params).forEach(key => {
                                        params[key] = params[key] && params[key].replace(reg, '')
                                    });
                                    props.match.params = { ...params };
                                    props.history = { ...props.history, config: r }
                                    const merge = {
                                        ...props,
                                        query: queryParams ? queryString.parse(queryParams[0]) : {},
                                        "$env": env,
                                        "$store": store,
                                    }
                                    document.title = r.title || ''
                                    const wrappedComponent = (
                                        <Component {...merge} />
                                    )
                                    window.reactOldHistory = window.reactHistory || null;
                                    window.reactHistory = props.history;
                                    return componentPermissionFn(wrappedComponent, r)

                                }
                            }
                            return <Route {...routeParams} />
                        }
                        return r.component ? route(r) : r.subs.map(r => route(r))
                    })
                }
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        </>
    )
}