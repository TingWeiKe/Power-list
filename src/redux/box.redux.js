import { getKKoxAccessToken, getKKBoxAPI, doCookieSetup, getCookie } from '../utils/kkboxAPI'

const BOX_API_SUCCESS = 'BOX_API_SUCCESS'
const BOX_API_ERROR_MSG = 'BOX_API_ERROR_MSG'
const INIT_STATE = 'INIT_STATE'

const initState = {
	box_data: {},
	msg: '',
	bool: true,
	access_token: '',
	title: '今日精選'
}

export function box(state = initState, action){
	switch (action.type) {
		case BOX_API_SUCCESS:
			return (state = { ...state, bool: false, msg: 'success', ...action.payload })
		case BOX_API_ERROR_MSG:
			return (state = { ...state, msg: '伺服器錯誤', bool: false })
		case INIT_STATE:
			return (state = initState)
		default:
			return state
	}
}

export function getFeaturedPlaylistsSuccess(box_data){
	return { type: BOX_API_SUCCESS, payload: box_data }
}

export function getFeaturedPlaylistsError(){
	return { type: BOX_API_ERROR_MSG }
}

export function getFeaturedPlaylists(url){
	return dispatch => {
		!getCookie('token')
			? getKKoxAccessToken()
					.then(data => {
						if (data.access_token !== undefined) doCookieSetup('token', data.access_token, data.expires_in)
						getKKBoxAPI(data.access_token, url).then(res => {
							if (res && res.status === 200) dispatch(getFeaturedPlaylistsSuccess({ box_data: res.data }))
							else dispatch(getFeaturedPlaylistsError())
						})
					})
					.catch(err => dispatch(getFeaturedPlaylistsError()))
			: getKKBoxAPI(getCookie('token'), url).then(res => {
					if (res && res.status === 200) dispatch(getFeaturedPlaylistsSuccess({ box_data: res.data }))
					else dispatch(getFeaturedPlaylistsError())
				})
	}
}

export function handleInitState(){
	return { type: INIT_STATE }
}
