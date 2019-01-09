
import { get_KKbox_API,getCookie } from '../component/getKKboxAPI'

const PLAYLIST_API_SUCCESS = 'PLAYLIST_API_SUCCESS'
const PLAYLIST_API_ERROR_MSG = 'PLAYLIST_API_SUCCESS'
const INIT_STATE = 'INIT_STATE'
// const INIT_MSG = 'INIT_MSG'

const init = {
    playlist_data: {},
    msg: '',
    bool: true,

}


export function playlist(state = init, action) {
    switch (action.type) {
        case PLAYLIST_API_SUCCESS:
            return state = { ...state, bool: false, msg: "success", ...action.payload }
        case PLAYLIST_API_ERROR_MSG:
            return state = { ...state, msg: '伺服器錯誤', bool: false }
        case INIT_STATE:
            return state = init
        default:
            return state
    }
}

export function handle_Init_State(){
    return {type:INIT_STATE}
}


export function get_Playlists_Id_Api_Success(data) {
    return { type: PLAYLIST_API_SUCCESS, payload: data }
}

export function get_Playlists_Id_Api_ApiError() {
    return { type: PLAYLIST_API_ERROR_MSG }
}


export function get_Playlists_Id_Api(id) {
    return dispatch => {
        let url = 'https://api.kkbox.com/v1.1/featured-playlists/' + id + '?territory=TW'    
             get_KKbox_API(getCookie('token'), url)
                .then(res => {
                    if (res && res.status === 200) {
                        dispatch(get_Playlists_Id_Api_Success({ playlist_data: res.data }))

                    } else {
                        dispatch(get_Playlists_Id_Api_ApiError())
                        console.log('err')
                    }
                })


    }
}

export function hadndle_Init_State(){
    return dispatch =>{
        dispatch(handle_Init_State())
    }
}

