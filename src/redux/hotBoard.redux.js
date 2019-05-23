
import { getKKBoxAPI, getCookie } from '../utils/getKKBoxAPI'
const HOT_BOARD_API_SUCCESS = 'HOT_BOARD_API_SUCCESS'
const HOT_BOARD_API_ERROR_MSG = 'HOT_BOARD_API_ERROR_MSG'

const init = {
    hot_board_data: {},
    msg: '',
    bool: true,
}


export function hot_board(state = init, action) {
    switch (action.type) {
        case HOT_BOARD_API_SUCCESS:
            return state = { ...state, bool: false, msg: "success", ...action.payload }
        case HOT_BOARD_API_ERROR_MSG:
            return state = { ...state, msg: '伺服器錯誤', bool: false }
        default:
            return state
    }
}

function get_Hotboard_Api_Success(data) {
    return { type: HOT_BOARD_API_SUCCESS, payload: data }
}

function get_Hotboard_Api_ApiError() {
    return { type: HOT_BOARD_API_ERROR_MSG }
}


export function get_Hotboard_Api(url) {
    return dispatch => {

        getKKBoxAPI(getCookie('token'), url)
            .then(res => {
                if (res && res.status === 200) {
                    dispatch(get_Hotboard_Api_Success({ hot_board_data: res.data }))

                } else {
                    dispatch(get_Hotboard_Api_ApiError())
                    console.log('err') 
                }
            })
    }
}

