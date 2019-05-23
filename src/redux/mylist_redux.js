
import {
    getUserAccessToken,
    getKKBoxAPI,
    doCookieSetup,
    getCookie
} from '../utils/getKKBoxAPI'
import axios from 'axios'
const GET_MYLIST_API_SUCCESS = 'GET_MYLIST_API_SUCCESS'
const GET_MYLIST_API_ERR = 'GET_MYLIST_API_ERR'
const GET_MY_INFO_SUCCESS = 'GET_MY_INFO_SUCCESS'
const GET_KKBOX_NEXT_SUCCESS = 'GET_KKBOX_NEXT_SUCCESS'
const PUT_KKBOX_TRACK_SUCCESS = 'PUT_KKBOX_TRACK_SUCCESS'
const INIT_PUT_KKBOX = 'INIT_PUT_KKBOX'
const init = {
    put_kkbox_negative: false,
    put_kkbox_success: false,
    put_kkbox_msg: '歌曲搜尋中．．．',
    msg: '',
    bool: true,
    mylist: {}
}

export function mylist(state = init, action) {
    switch (action.type) {
        case INIT_PUT_KKBOX:
            return state = { ...state, put_kkbox_negative: false, put_kkbox_success: false, put_kkbox_msg: '歌曲搜尋中．．．', }
        case PUT_KKBOX_TRACK_SUCCESS:
            return state = { ...state, put_kkbox_msg: '匯入歌曲成功', put_kkbox_success: true }
        case GET_MYLIST_API_SUCCESS:
            action.mylist.mylist.data.reverse()
            return state = { ...state, bool: false, msg: "success", ...action.mylist }
        case GET_MYLIST_API_ERR:
            return state = { ...state, msg: '伺服器錯誤', bool: false }
        case GET_MY_INFO_SUCCESS:
            return state = { ...state, ...action.my_info }
        case GET_KKBOX_NEXT_SUCCESS:
            state.mylist.paging.next = action.mylist.paging.next
            action.mylist.data.map(i => {
                state.mylist.data.push(i)
            })
            return state = { ...state }
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

function get_Kkbox_Next_Success(data) {
    return { type: GET_KKBOX_NEXT_SUCCESS, mylist: data }
}

export function getMylist(url) {
    return dispatch => {

        getUserAccessToken()
            .then(res => {
                if (res.access_token != undefined) {
                    doCookieSetup('token', res.access_token, res.expires_in)
                    getKKBoxAPI(res.access_token, url)
                        .then(res => {
                            dispatch(get_My_Info_Success({ my_info: res.data }))
                        })
                    getKKBoxAPI(res.access_token, url + '/favorite?limit=500')
                        .then(res => {

                            if (res.status === 200)
                                dispatch(get_Mylist_API_Success({ mylist: res.data }))
                        })
                }
            })
    }
}


export function get_Kkbox_Next(url) {
    return dispatch => {
        if (url) {
            getKKBoxAPI(getCookie('token'), url)
                .then(res => {
                    if (res.status === 200) {
                        dispatch(get_Kkbox_Next_Success(res.data))
                    }
                })
        }
    }
}


export function put_Kkbox_Track(id) {
    return dispatch => {
        axios.post('/post/pushTracks', { id: id, access_token: getCookie('token') })
            .then(res => {
                dispatch({ type: PUT_KKBOX_TRACK_SUCCESS })

            })
    }
}

export function init_Put_Kkbox() {
    return dispatch => {
        let url = 'https://api.kkbox.com/v1.1/me'
        getKKBoxAPI(getCookie('token'), url + '/favorite?limit=500')
            .then(res => {
                if (res.status === 200)
                    dispatch(get_Mylist_API_Success({ mylist: res.data }))
            })
        dispatch({ type: INIT_PUT_KKBOX })
    }

}