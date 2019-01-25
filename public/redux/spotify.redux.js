
import axios from 'axios'
import { getUrlVars, doCookieSetup, getCookie } from '../component/getKKboxAPI'
const GET_SPOTIFY_API_SUCCESS = 'GET_SPOTIFY_API_SUCCESS'
const GET_SPOTIFY_API_ERR = 'GET_SPOTIFY_API_ERR'
const GET_SPOTIFY_NEXT = 'GET_SPOTIFY_NEXT'


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
        case GET_SPOTIFY_NEXT:
            action.data.data.items.map(i => {
                state.data.items.push(i)
            })
            state.data.next = action.data.data.next
            return state = { ...state }
        default:
            return state
    }
}


function get_Spotify_API_Success(data) {
    return { type: GET_SPOTIFY_API_SUCCESS, data: data }
}

function get_Spotify_Next_Success(data) {
    return { type: GET_SPOTIFY_NEXT, data: data }
}

function get_Spotify_API_Err() {
    return { type: GET_SPOTIFY_API_ERR }
}


export function get_Spotify_API() {
    return dispatch => {
        axios.post('/post/loggin_spotify_callback', { code: getUrlVars() })
            .then(res => {
                doCookieSetup('sp_refresh_token', res.data.refresh_token)
                let access_token = res.data.access_token
                let config = {
                    method: "GET",
                    market: 'TW',
                    headers: { 'Authorization': 'Bearer ' + access_token }
                }
                axios.get('	https://api.spotify.com/v1/me/tracks?offset=0&limit=20&market=TW', config)
                    .then(res => {
                        if (res.status === 200) {
                            console.log(res.data);
                            dispatch(get_Spotify_API_Success({ data: res.data }))
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
    }
}


export function get_Spotify_Next(url) {
    return dispatch => {
        if (url) {
            axios.post('/post/refresh_spotify', { refresh_token: getCookie('sp_refresh_token') })
                .then(res => {
                    console.log(res.data);
                    let access_token = res.data.access_token
                    let config = {
                        method: "GET",
                        market: 'TW',
                        headers: { 'Authorization': 'Bearer ' + access_token }
                    }
                    axios.get(url, config)
                        .then(res => {
                            if (res.status === 200) {
                                dispatch(get_Spotify_Next_Success({ data: res.data }))
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })

        }
    }
}


export function search_Spotify_Track_and_Put(name) {

    axios.post('/post/refresh_spotify', { refresh_token: getCookie('sp_refresh_token') })
        .then(res => {
            let url = 'https://api.spotify.com/v1/search?q=' + name + '&type=track&market=TW&limit=2'
            let access_token = res.data.access_token
            let config = {
                headers: { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/json' }
            }
            axios.get(url, config)
                .then(res => {
                    let id = res.data.tracks.items[0].id
                    if (res.status === 200) {
                        axios.post('/post/refresh_spotify', { refresh_token: getCookie('sp_refresh_token') })
                            .then(res => {
                                axios.post('/post/put_spotify_track', { access_token: access_token, id: id })
                                    .then(res => {
                                        console.log(res);
                                        refresh_Spotify_List()
                                    })
                            })

                    }
                })
        })
}


export function refresh_Spotify_List() {
    return dispatch => {
        axios.post('/post/refresh_spotify', { refresh_token: getCookie('sp_refresh_token') })
            .then(res => {
                let access_token = res.data.access_token
                let config = {
                    method: "GET",
                    market: 'TW',
                    headers: { 'Authorization': 'Bearer ' + access_token }
                }
                axios.get('	https://api.spotify.com/v1/me/tracks?offset=0&limit=20&market=TW', config)
                    .then(res => {
                        if (res.status === 200) {
                            console.log(res.data);
                            dispatch(get_Spotify_API_Success({ data: res.data }))
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
    }

}