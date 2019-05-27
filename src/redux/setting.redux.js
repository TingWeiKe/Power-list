const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

const initState = {
	language: window.localStorage.getItem('language') ? window.localStorage.getItem('language') : 'TW'
}

export function setting(state = initState, action){
	switch (action.type) {
		case CHANGE_LANGUAGE:
			return (state = { ...action.payload })
		default:
			return state
	}
}

export function changeLanguage(language){
	return { type: CHANGE_LANGUAGE, payload: language }
}
export function handleChangeLanguage(language){
	return dispatch => dispatch(changeLanguage({ language: language }))
}
