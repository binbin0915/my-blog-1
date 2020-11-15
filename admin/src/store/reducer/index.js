
import * as type from '../actionTypes';
const initialState = {
    info: {}
}

export const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_USER_INFO:
            return {
                ...state,
                info: action.info
            }

        case type.REMOVE_USER_INFO:
            return initialState

        default:
            return state
    }
}

