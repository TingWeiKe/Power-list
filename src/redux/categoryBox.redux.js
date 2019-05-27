import { getKKoxAccessToken, getKKBoxAPI, doCookieSetup, getCookie } from '../utils/kkboxAPI'

const categoryBox_API_SUCCESS = 'categoryBox_API_SUCCESS'
const categoryBox_API_ERROR_MSG = 'categoryBox_API_ERROR_MSG'
const INIT_CATEGORY_STATE = 'INIT_CATEGORY_STATE'

const initState = {
	categoryBox_data: {},
	msg: '',
	bool: true,
	access_token: '',
	title: ''
}

export function categoryBox(state = initState, action){
	switch (action.type) {
		case categoryBox_API_SUCCESS:
			return (state = { ...state, bool: false, msg: 'success', ...action.payload })
		case categoryBox_API_ERROR_MSG:
			return (state = { ...state, msg: '伺服器錯誤', bool: false })
		case INIT_CATEGORY_STATE:
			return (state = initState)
		default:
			return state
	}
}

export function get_categoryBox_api_Api_Success(categoryBox_data){
	return { type: categoryBox_API_SUCCESS, payload: categoryBox_data }
}

export function get_categoryBox_api_Api_Error(){
	return { type: categoryBox_API_ERROR_MSG }
}

function handleInitState_Success(){
	return { type: INIT_CATEGORY_STATE }
}

export function getCategoryBoxApi(url){
	return dispatch => {
		let access_token
		!getCookie('token')
			? getKKoxAccessToken().then(data => {
					doCookieSetup('token', data.access_token, data.expires_in)
					getKKBoxAPI(data.access_token, url).then(res => {
						if (res && res.status === 200) dispatch(get_categoryBox_api_Api_Success({ categoryBox_data: res.data }))
						else dispatch(get_categoryBox_api_Api_Error())
					})
				})
			: getKKBoxAPI(getCookie('token'), url).then(res => {
					if (res && res.status === 200) dispatch(get_categoryBox_api_Api_Success({ categoryBox_data: res.data }))
					else dispatch(get_categoryBox_api_Api_Error())
				})
	}
}

export function handleInitState(){
	return dispatch => dispatch(handleInitState_Success())
}
