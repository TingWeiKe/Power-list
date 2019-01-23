
import axios from 'axios'
const GET_SPOTIFY_API_SUCCESS = 'GET_SPOTIFY_API_SUCCESS'
const GET_SPOTIFY_API_ERR = 'GET_SPOTIFY_API_ERR'
import { getUrlVars } from '../component/getKKboxAPI'
const init = {
    msg: '',
    data: {},
    bool: true
}

export function spotify(state = init, action) {
    switch (action.type) {
        case GET_SPOTIFY_API_SUCCESS:
            return state = { ...state, bool: false, msg: "success", ...action.data }
        case GET_SPOTIFY_API_ERR:
            return state = { ...state, msg: '伺服器錯誤', bool: false }
        default:
            return state
    }
}


function get_Spotify_API_Success(data) {
    return { type: GET_SPOTIFY_API_SUCCESS, data: data }
}

function get_Spotify_API_Err() {
    return { type: GET_SPOTIFY_API_ERR }
}


export function get_Spotify_API() {
    return dispatch => {
        axios.post('/post/loggin_spotify_callback', { code: getUrlVars() })
            .then(res => {
                console.log(res.data.access_token);
                let access_token = res.data.access_token
                let config = {
                    method: "GET",
                    market: 'TW',
                    headers: { 'Authorization': 'Bearer ' + access_token }
                }
                axios.get('	https://api.spotify.com/v1/me/tracks?offset=0&limit=40&market=TW', config)
                    .then(res => {
                        if(res.status===200){
                            dispatch(get_Spotify_API_Success({data:res.data}))
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
    }
}

