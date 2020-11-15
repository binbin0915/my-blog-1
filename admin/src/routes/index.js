import env from '@/config/env'
import routesConfig from './conf';
import queryString from 'query-string';
import AllComponents from '../views';
import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
export default function (props2) {

    useEffect(() => {
        // console.log('useEffect')
    }, [])
    function componentPermissionFn (component, r) {

        if (r.name === 'permission') {
            return <Redirect to="/404" />
        }
        return component;
    }
    return (
        <CacheSwitch>
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
                                    "$store": props2.store,
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
                        return r.cache ?
                            <CacheRoute
                                {...routeParams}
                                className={`CacheRouteOuterBox ${r.name}`}
                                saveScrollPosition={true}
                            />
                            :
                            <Route {...routeParams} />
                    }
                    return r.component ? route(r) : r.subs.map(r => route(r))
                })

            }
            <Route render={() => <Redirect to="/404" />} />
        </CacheSwitch>
    )
}