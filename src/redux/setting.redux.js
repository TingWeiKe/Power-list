

const CHAGE_LANGUAGE = 'CHAGE_LANGUAGE'

const initState = {
    language:window.localStorage.getItem('language')?window.localStorage.getItem('language'):"TW",
}

export function setting(state = initState, action) {
    switch (action.type) {
        case CHAGE_LANGUAGE:
            return state = {...action.payload }
        default:
            return state
    }
}


export function change_Language(language){
    return{ type:CHAGE_LANGUAGE , payload:language}
}
export function hadndle_Change_Language(language){
    return dispatch =>
        dispatch(change_Language({language:language }))
    }

