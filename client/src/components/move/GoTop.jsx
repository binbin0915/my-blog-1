import React, { useState, useEffect, useRef } from 'react';
import './gotop.less';
import { UpCircleOutlined } from '@ant-design/icons';
const GoTop = () => {
    const [show, setShow] = useState(true);
    const intervalRef = useRef()
    useEffect(() => {
        function fn () {
            let sh = document.documentElement.scrollTop;
            //setShow(sh > 500)
        }
        window.addEventListener('scroll', fn, false);
        return () => {
            clearInterval(intervalRef.current);
            window.removeEventListener('scroll', fn)
        }
    });
    function goTopFn () {
        let i = document.documentElement.scrollTop;
        let single = i / 5;
        intervalRef.current = setInterval(() => {
            i = i - single
            if (i <= 0) {
                i = 0;
                //  setShow(false)
                clearInterval(intervalRef.current)
            }
            document.documentElement.scrollTop = i;
        }, 5);
    }
    return (
        <>
            <UpCircleOutlined
                id='goTop'
                onClick={() => {
                    goTopFn()
                }}
                style={{
                    fontSize: '46px',
                    color: '#555'
                }}
                className='go-top-plugins cursor tc'
            />
        </>
    )
}


export default GoTop