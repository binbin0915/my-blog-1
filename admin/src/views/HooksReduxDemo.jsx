import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from '@/store/action';
import TopNav from '@/components/TopNav'
import { REMOVE_USER_INFO } from "@/store/actionTypes";
const HooksReduxDemo = () => {
    const info = useSelector(state => state.userInfoReducer.info);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('info', info)
    }, [info])
    return (
        <div>
            <TopNav />
            <div>
                <p>dispatch可以传type也可以是函数</p>
                <button onClick={() => {
                    dispatch(fetchUserInfo())
                }}>点击请求用户信息fetchUserInfo</button>
                <br />
                <br />
                <button onClick={() => {
                    dispatch({ type: REMOVE_USER_INFO })
                }}>点击清除用户信息</button>
                <p>name:  {info.name}</p>
                <p>token: {info.token}</p>
            </div>
        </div>
    )
}


export default HooksReduxDemo;
