
import { get_KKbox_API, getCookie } from '../component/getKKboxAPI'

const HOT_BOARD_API_SUCCESS = 'HOT_BOARD_API_SUCCESS'
const HOT_BOARD_API_ERROR_MSG = 'HOT_BOARD_API_ERROR_MSG'
// const INIT_STATE = 'INIT_STATE'
// const INIT_MSG = 'INIT_MSG'

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

// export function handle_Init_State(){
//     return {type:INIT_STATE}
// }


function get_Hotboard_Api_Success(data) {
    return { type: HOT_BOARD_API_SUCCESS, payload: data }
}

function get_Hotboard_Api_ApiError() {
    return { type: HOT_BOARD_API_ERROR_MSG }
}


export function get_Hotboard_Api(url) {
    return dispatch => {

        get_KKbox_API(getCookie('token'), url)
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

// export function hadndle_Init_State(){
//     return dispatch =>{
//         dispatch(handle_Init_State())
//     }
// }

