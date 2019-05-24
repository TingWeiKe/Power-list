import axios from 'axios'
import { getUrlVars, doCookieSetup, getCookie } from '../utils/getKKBoxAPI'
const GET_SPOTIFY_API_SUCCESS = 'GET_SPOTIFY_API_SUCCESS'
const GET_SPOTIFY_API_ERR = 'GET_SPOTIFY_API_ERR'
const GET_SPOTIFY_NEXT = 'GET_SPOTIFY_NEXT'
const PUT_TRACK_SUCCESS = 'PUT_TRACK_SUCCESS'
const PUT_TRACK_FAIL = 'PUT_TRACK_FAIL'
const INIT_PUT_TRACK = 'INIT_PUT_TRACK'
const init = {
	put_track_negative: false,
	put_track_success: false,
	put_track_msg: '歌曲搜尋中．．．',
	msg: '',
	data: {},
	bool: false,
}

export function spotify(state = init, action){
	switch (action.type) {
		case GET_SPOTIFY_API_SUCCESS:
			return (state = { ...state, bool: true, msg: 'success', ...action.data })
		case GET_SPOTIFY_API_ERR:
			return (state = { ...state, msg: '伺服器錯誤', bool: false })
		case PUT_TRACK_SUCCESS:
			return (state = { ...state, put_track_msg: '匯入歌曲成功', put_track_success: true })
		case PUT_TRACK_FAIL:
			return (state = { ...state, put_track_msg: 'Spotify上找不到歌曲', put_track_negative: true })
		case INIT_PUT_TRACK:
			return (state = { ...state, put_track_msg: '歌曲搜尋中．．．', put_track_success: false, put_track_negative: false })
		case GET_SPOTIFY_NEXT:
			action.data.data.items.map((i) => {
				state.data.items.push(i)
			})
			state.data.next = action.data.data.next
			return (state = { ...state })
		default:
			return state
	}
}

function getUserSpotifyListSuccess(data){
	return { type: GET_SPOTIFY_API_SUCCESS, data: data }
}

function getSpotifyNextSuccess(data){
	return { type: GET_SPOTIFY_NEXT, data: data }
}

function getUserSpotifyListError(){
	return { type: GET_SPOTIFY_API_ERR }
}

export function getUserSpotifyList(){
	return (dispatch) => {
		axios.post('/post/loggin_spotify_callback', { code: getUrlVars() }).then((res) => {
			doCookieSetup('sp_refresh_token', res.data.refresh_token)
			let access_token = res.data.access_token
			let config = {
				method: 'GET',
				market: 'TW',
				headers: { Authorization: 'Bearer ' + access_token },
			}
			axios
				.get('	https://api.spotify.com/v1/me/tracks?offset=0&limit=20&market=TW', config)
				.then((res) => {
					if (res.status === 200) {
						dispatch(getUserSpotifyListSuccess({ data: res.data }))
					}
				})
				.catch((err) => {
					console.log(err)
				})
		})
	}
}

export function getSpotifyNext(url){
	return (dispatch) => {
		if (url) {
			axios
				.post('/post/refresh_spotify', { refresh_token: getCookie('sp_refresh_token') })
				.then((res) => {
					let access_token = res.data.access_token
					let config = {
						method: 'GET',
						market: 'TW',
						headers: { Authorization: 'Bearer ' + access_token },
					}
					axios
						.get(url, config)
						.then((res) => {
							if (res.status === 200) {
								dispatch(getSpotifyNextSuccess({ data: res.data }))
							}
						})
						.catch((err) => {
							console.log(err)
						})
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}
}

export function putSpotifyTrack(track){
	return (dispatch) => {
		axios.post('/post/refresh_spotify', { refresh_token: getCookie('sp_refresh_token') }).then((res) => {
			// Regular Expression
			let name = track
			if (name.length < 35) {
				name = name.replace('||', '').replace(/[?\(].*[?\)]/, '').replace(/([?"].*[?"])+/, '')
			} else {
				name = name.split('||')[1].replace(/[?\(].*[?\)]/, '').replace(/([?"].*[?"])+/, '')
			}
			let url = 'https://api.spotify.com/v1/search?q=' + name + '&type=track&market=TW&limit=2'
			let access_token = res.data.access_token
			let config = {
				headers: { Authorization: 'Bearer ' + access_token, Accept: 'application/json' },
			}
			axios.get(url, config).then((res) => {
				if (res.status === 200 && res.data.tracks.total > 0) {
					let id = res.data.tracks.items[0].id
					axios.post('/post/refresh_spotify', { refresh_token: getCookie('sp_refresh_token') }).then((res) => {
						axios.post('/post/put_spotify_track', { access_token: access_token, id: id }).then((res) => {
							dispatch({ type: PUT_TRACK_SUCCESS })
						})
					})
				} else {
					dispatch({ type: PUT_TRACK_FAIL })
				}
			})
		})
	}
}

export function refreshSpotifyList(){
	return (dispatch) => {
		axios.post('/post/refresh_spotify', { refresh_token: getCookie('sp_refresh_token') }).then((res) => {
			let access_token = res.data.access_token
			let config = {
				method: 'GET',
				market: 'TW',
				headers: { Authorization: 'Bearer ' + access_token },
			}
			axios
				.get('	https://api.spotify.com/v1/me/tracks?offset=0&limit=20&market=TW', config)
				.then((res) => {
					if (res.status === 200) {
						console.log(res.data)
						dispatch(getUserSpotifyListSuccess({ data: res.data }))
					}
				})
				.catch((err) => {
					console.log(err)
				})
		})
	}
}

export function init_Put_Track(){
	return (dispatch) => {
		dispatch({ type: INIT_PUT_TRACK })
	}
}
