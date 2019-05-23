
import { get_KKbox_API, getCookie } from '../component/getKKboxAPI'

const CATEGORY_API_SUCCESS = 'CATEGORY_API_SUCCESS'
const CATEGORY_API_ERROR_MSG = 'CATEGORY_API_ERROR_MSG'
// const INIT_STATE = 'INIT_STATE'
// const INIT_MSG = 'INIT_MSG'

const init = {
    category_data: {},
    msg: '',
    bool: true,
}


export function category(state = init, action) {
    switch (action.type) {
        case CATEGORY_API_SUCCESS:
            return state = { ...state, bool: false, msg: "success", ...action.payload }
        case CATEGORY_API_ERROR_MSG:
            return state = { ...state, msg: '伺服器錯誤', bool: false }
        default:
            return state
    }
}

// export function handle_Init_State(){
//     return {type:INIT_STATE}
// }


function get_Category_Api_Success(data) {
    return { type: CATEGORY_API_SUCCESS, payload: data }
}

function get_Category_Api_ApiError() {
    return { type: CATEGORY_API_ERROR_MSG }
}


export function get_Category_Api(url) {
    return dispatch => {

        get_KKbox_API(getCookie('token'), url)
            .then(res => {
                if (res && res.status === 200) {
                    dispatch(get_Category_Api_Success({ category_data: res.data }))

                } else {
                    dispatch(get_Category_Api_ApiError())
                    console.log('err') 
                }
            })
    }
}

