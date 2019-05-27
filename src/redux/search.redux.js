import { getKKBoxAPI, getCookie } from '../utils/kkboxAPI'
const SEARCH_DATA_SUCCESS = 'SEARCH_DATA_SUCCESS'
const GET_SEARCH_NEXT_SUCCESS = 'GET_SEARCH_NEXT_SUCCESS'
const INIT_SEARCH_DATA = 'INIT_SEARCH_DATA'
const initState = {
	bool: true,
	data: {}
}

export function search(state = initState, action){
	switch (action.type) {
		case SEARCH_DATA_SUCCESS:
			return (state = { ...action.payload })
		case INIT_SEARCH_DATA:
			return (state = initState)
		case GET_SEARCH_NEXT_SUCCESS:
			action.payload.playlists.data.map(i => {
				state.data.playlists.data.push(i)
			})
			state.data.paging.next = action.payload.paging.next
			return (state = { ...state })

		default:
			return state
	}
}
function getSearchNextSuccess(data){
	return { type: GET_SEARCH_NEXT_SUCCESS, payload: data }
}

function searchDataSuccess(data){
	return { type: SEARCH_DATA_SUCCESS, payload: data }
}

export function initSearchData(){
	return dispatch => {
		dispatch({ type: INIT_SEARCH_DATA })
	}
}

export function search_Data(value, callback){
	return dispatch => {
		let url = 'https://api.kkbox.com/v1.1/search?q=' + value + '&type=playlist&territory=' + localStorage.getItem('language') + '&limit=50'
		getKKBoxAPI(getCookie('token'), url).then(res => {
			dispatch(searchDataSuccess({ data: res.data }))
			callback()
		})
	}
}

export function getSearchNext(url){
	return dispatch => {
		if (url) {
			getKKBoxAPI(getCookie('token'), url).then(res => {
				if (res.status === 200) dispatch(getSearchNextSuccess(res.data))
			})
		}
	}
}
