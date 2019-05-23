
import { getKKboxAPI, getCookie } from '../utils/getKKboxAPI'
const SEARCH_DATA_SUCCESS = 'SEARCH_DATA_SUCCESS'
const GET_SEARCH_NEXT_SUCCESS = 'GET_SEARCH_NEXT_SUCCESS'
const INIT_SEARCH_DATA ='INIT_SEARCH_DATA'
const initState = {
    bool: true,
    data: {}
}

export function search(state = initState, action) {
    switch (action.type) {
        case SEARCH_DATA_SUCCESS:
            return state = { ...action.payload }
        case INIT_SEARCH_DATA:
        return state = initState
        case GET_SEARCH_NEXT_SUCCESS:
            action.payload.playlists.data.map(i=>{
                state.data.playlists.data.push(i)
            })
            state.data.paging.next = action.payload.paging.next
        return state = {...state}

            
        default:
            return state
    }
}
function get_Search_Next_Success(data){
    return {type:GET_SEARCH_NEXT_SUCCESS , payload: data }
}

function search_Data_Success(data) {
    return { type: SEARCH_DATA_SUCCESS, payload: data }
}


export function init_Search_Data(){
    return dispatch =>{
        dispatch({type:INIT_SEARCH_DATA})
    }
}


export function search_Data(value, callback) {
    return dispatch => {
        let url = 'https://api.kkbox.com/v1.1/search?q=' + value + '&type=playlist&territory=' + localStorage.getItem('language') + '&limit=50'
        getKKboxAPI(getCookie('token'), url)
            .then(res => {
                dispatch(search_Data_Success({ data: res.data }))
                callback()
            })
    }


}

export function get_Search_Next(url) {
    return dispatch => {
        if (url) {
            getKKboxAPI(getCookie('token'), url)
                .then(res => {
                    if(res.status===200){
                        dispatch(get_Search_Next_Success(res.data))
                    }
                })
        }



    }
}