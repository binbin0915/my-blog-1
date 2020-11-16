
import * as type from '../actionTypes';
import { getUseInfo } from '@/api'
import { setInfo } from '@/utils/auth'

export const setUserInfo = (info) => {
    return {
        type: type.SET_USER_INFO,
        info,
    }
}

export const fetchUserInfo = () => async (dispatch) => {
    // dispatch(setUserInfo({}))
    let info = await getUseInfo();
    setInfo(JSON.stringify(info))
    dispatch(setUserInfo(info))
}

export const removeUserInfo = () => {
    return {
        type: type.REMOVE_USER_INFO,
        info: {}
    }
}
