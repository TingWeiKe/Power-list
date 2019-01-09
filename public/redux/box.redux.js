
import {
    get_Access_Token,
    get_KKbox_API,
    doCookieSetup,
    getCookie
} from '../component/getKKboxAPI'

const BOX_API_SUCCESS = 'BOX_API_SUCCESS'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const BOX_API_ERROR_MSG = 'BOX_API_ERROR_MSG'
// const INIT_MSG = 'INIT_MSG'

const initState = {
    box_data: [],
    msg: '',
    bool: true,
    access_token: ''
}


export function box(state = initState, action) {
    switch (action.type) {
        case BOX_API_SUCCESS:
            return state = { ...state, bool: false, msg: "success", ...action.payload }
        case BOX_API_SUCCESS:
            return state = { ...state, msg: '伺服器錯誤', bool: false }
        default:
            return state
    }
}



export function get_Featured_Playlists_Api_ApiSuccess(box_data) {
    return { type: BOX_API_SUCCESS, payload: box_data }
}

export function get_Featured_Playlists_Api_ApiError() {
    return { type: BOX_API_ERROR_MSG }
}



export function get_Featured_Playlists_Api() {
    return dispatch => {
        const url = 'https://api.kkbox.com//v1.1/featured-playlists?territory=TW'
        let access_token;
        !getCookie('token') ? get_Access_Token()
            .then(data => {
                doCookieSetup('token', data.access_token, data.expires_in)
                get_KKbox_API(data.access_token, url)
                    .then(res => {
                        if (res && res.status === 200) {
                            dispatch(get_Featured_Playlists_Api_ApiSuccess({ box_data: res.data.data }))
                            console.log('sucess')
                        } else {
                            dispatch(get_Featured_Playlists_Api_ApiError())
                            console.log('err')
                        }
                    })
            }) :

            get_KKbox_API(getCookie('token'), url)
                .then(res => {
                    if (res && res.status === 200) {
                        dispatch(get_Featured_Playlists_Api_ApiSuccess({ box_data: res.data.data }))
                        console.log('sucess')
                    } else {
                        dispatch(get_Featured_Playlists_Api_ApiError())
                        console.log('err')
                    }
                })


    }
}

export function get_Api(url) {
    return dispatch => {

    }
}



