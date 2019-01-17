
import {
    get_Access_Token_From_urlParam,
    get_KKbox_API,
} from '../component/getKKboxAPI'

const GET_MYLIST_API_SUCCESS = 'GET_MYLIST_API_SUCCESS'
const GET_MYLIST_API_ERR = 'GET_MYLIST_API_ERR'
const GET_MY_INFO_SUCCESS = 'GET_MY_INFO_SUCCESS'
const key = 'AIzaSyDsa1h_sYYPTJ3LwizuBkyHNBEht2qUSJQ'

const init = {
    msg: '',
    bool: 'true',
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

function get_Mylist_API_Err() {
    return { type: GET_MYLIST_API_ERR }
}

export  function getMylist() {

    return dispatch => {
        const url = 'https://api.kkbox.com/v1.1/me'
        get_Access_Token_From_urlParam()
            .then(res => {

                get_KKbox_API(res.access_token, url)
                .then(res => {
                    dispatch(get_My_Info_Success({ my_info: res.data }))
             
                })
                get_KKbox_API(res.access_token, url + '/favorite?limit=400')
                    .then(res => {
                        if (res.status === 200)
                            dispatch(get_Mylist_API_Success({ mylist: res.data }))


                    })
              
            })
    }

}

