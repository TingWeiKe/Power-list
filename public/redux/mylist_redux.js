
import {
    get_Access_Token_From_urlParam,
    get_KKbox_API,
    doCookieSetup,
    getCookie
} from '../component/getKKboxAPI'

const GET_MYLIST_API_SUCCESS = 'GET_MYLIST_API_SUCCESS'
const GET_MYLIST_API_ERR = 'GET_MYLIST_API_ERR'
const GET_MY_INFO_SUCCESS = 'GET_MY_INFO_SUCCESS'


const init = {
    msg: '',
    bool: true,
    mylist: {}
}

export function mylist(state = init, action) {
    switch (action.type) {
        case GET_MYLIST_API_SUCCESS:
            return state = { ...state, bool: false, msg: "success", ...action.mylist }
        case GET_MYLIST_API_ERR:
            return state = { ...state, msg: '伺服器錯誤', bool: false }
        case GET_MY_INFO_SUCCESS:
            return state = { ...state, ...action.my_info }
        default:
            return state
    }
}
function get_My_Info_Success(data) {
    return { type: GET_MY_INFO_SUCCESS, my_info: data }
}

function get_Mylist_API_Success(data) {
    return { type: GET_MYLIST_API_SUCCESS, mylist: data }
}

export function getMylist(url) {
    return dispatch => {

        get_Access_Token_From_urlParam()
            .then(res => {
                if (res.access_token != undefined) {
                    console.log(res);
                    doCookieSetup('token', res.access_token, res.expires_in)
                    get_KKbox_API(res.access_token, url)
                        .then(res => {
                            dispatch(get_My_Info_Success({ my_info: res.data }))
                        })
                    get_KKbox_API(res.access_token, url + '/favorite?limit=40')
                        .then(res => {
                            if (res.status === 200)
                                dispatch(get_Mylist_API_Success({ mylist: res.data }))
                        })
                }
            })
    }
}


