import { getUserAccessToken, getKKBoxAPI, doCookieSetup, getCookie } from '../utils/kkboxAPI'
import axios from 'axios'
const GET_USER_KKBOX_LIST_SUCCESS = 'GET_USER_KKBOX_LIST_SUCCESS'
const GET_USER_KKBOX_LIST_ERROR = 'GET_MYLIST_API_ERR'
const GET_USER_KKBOX_INFO_SUCCESS = 'GET_USER_KKBOX_INFO_SUCCESS'
const GET_KKBOX_NEXT_SUCCESS = 'GET_KKBOX_NEXT_SUCCESS'
const PUT_KKBOX_TRACK_SUCCESS = 'PUT_KKBOX_TRACK_SUCCESS'
const INIT_PUT_KKBOX = 'INIT_PUT_KKBOX'
const init = {
	put_kkbox_negative: false,
	put_kkbox_success: false,
	put_kkbox_msg: '歌曲搜尋中．．．',
	msg: '',
	bool: false,
	mylist: {}
}

export function kkbox(state = init, action){
	switch (action.type) {
		case INIT_PUT_KKBOX:
			return (state = { ...state, put_kkbox_negative: false, put_kkbox_success: false, put_kkbox_msg: '歌曲搜尋中．．．' })
		case PUT_KKBOX_TRACK_SUCCESS:
			return (state = { ...state, put_kkbox_msg: '匯入歌曲成功', put_kkbox_success: true })
		case GET_USER_KKBOX_LIST_SUCCESS:
			action.mylist.mylist.data.reverse()
			return (state = { ...state, bool: true, msg: 'success', ...action.mylist })
		case GET_USER_KKBOX_LIST_ERROR:
			return (state = { ...state, msg: '伺服器錯誤', bool: false })
		case GET_USER_KKBOX_INFO_SUCCESS:
			return (state = { ...state, ...action.my_info })
		case GET_KKBOX_NEXT_SUCCESS:
			state.mylist.paging.next = action.mylist.paging.next
			action.mylist.data.map(i => {
				state.mylist.data.push(i)
			})
			return (state = { ...state })
		default:
			return state
	}
}

function getUserKKBoxInfoSuccess(data){
	return { type: GET_USER_KKBOX_INFO_SUCCESS, my_info: data }
}

function getUserKKBoxIListSuccess(data){
	return { type: GET_USER_KKBOX_LIST_SUCCESS, mylist: data }
}

function getKKBoxNextSuccess(data){
	return { type: GET_KKBOX_NEXT_SUCCESS, mylist: data }
}

export function getUserKKBoxList(url){
	return dispatch => {
		getUserAccessToken().then(res => {
			if (res.access_token != undefined) {
				doCookieSetup('token', res.access_token, res.expires_in)
				getKKBoxAPI(res.access_token, url).then(res => {
					dispatch(getUserKKBoxInfoSuccess({ my_info: res.data }))
				})
				getKKBoxAPI(res.access_token, url + '/favorite?limit=50').then(res => {
					if (res.status === 200) dispatch(getUserKKBoxIListSuccess({ mylist: res.data }))
				})
			}
		})
	}
}

export function getKKBoxNext(url){
	return dispatch => {
		if (url) {
			getKKBoxAPI(getCookie('token'), url).then(res => {
				if (res.status === 200) dispatch(getKKBoxNextSuccess(res.data))
			})
		}
	}
}

export function putKKBoxTrack(id){
	return dispatch => {
		axios.post('/post/pushTracks', { id: id, access_token: getCookie('token') }).then(res => {
			dispatch({ type: PUT_KKBOX_TRACK_SUCCESS })
		})
	}
}

export function initPutKKBox(){
	return dispatch => {
		dispatch({ type: INIT_PUT_KKBOX })
	}
}
