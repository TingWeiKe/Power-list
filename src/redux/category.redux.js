import { getKKBoxAPI, getCookie } from '../utils/kkboxAPI'

const CATEGORY_API_SUCCESS = 'CATEGORY_API_SUCCESS'
const CATEGORY_API_ERROR_MSG = 'CATEGORY_API_ERROR_MSG'

const init = {
	category_data: {},
	msg: '',
	bool: true
}

export function category(state = init, action){
	switch (action.type) {
		case CATEGORY_API_SUCCESS:
			return (state = { ...state, bool: false, msg: 'success', ...action.payload })
		case CATEGORY_API_ERROR_MSG:
			return (state = { ...state, msg: '伺服器錯誤', bool: false })
		default:
			return state
	}
}

function getCategoryApiSuccess(data){
	return { type: CATEGORY_API_SUCCESS, payload: data }
}

function getCategoryApiError(){
	return { type: CATEGORY_API_ERROR_MSG }
}

export function getCategoryApi(url){
	return dispatch => {
		getKKBoxAPI(getCookie('token'), url).then(res => {
			if (res && res.status === 200) dispatch(getCategoryApiSuccess({ category_data: res.data }))
			else dispatch(getCategoryApiError())
		})
	}
}
