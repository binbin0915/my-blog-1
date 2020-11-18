import React, { useState } from 'react'
import { Radio, Button, Input, Form, Card, message } from 'antd';
import CustomLayout from '@/components/CustomLayout'
import { useSelector, useDispatch } from 'react-redux'
import { updataInfo } from '@/api'
import { setUserInfo } from '@/store/action'
const PermissionMgt = ({ store }) => {

    return (
        <CustomLayout>
            <Card title="权限管理" style={{ width: '80%', maxWidth: "800px", margin: '0 auto' }}>
                <div>您无权查看！</div>
            </Card>
        </CustomLayout>
    )

}
export default PermissionMgt