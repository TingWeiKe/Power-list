
import axios from 'axios'
const GET_YOUTUBE_API_SUCCESS = 'GET_YOUTUBE_API_SUCCESS'
const GET_YOUTUBE_API_ERR = 'GET_YOUTUBE_API_ERR'
let ROOT_URL = 'https://www.googleapis.com/youtube/v3/search'

const init = {
    youtube_video: {}
}

export function youtube(state = init, action) {
    switch (action.type) {
        case GET_YOUTUBE_API_SUCCESS:
            return state = { ...state, bool: false, msg: "success", ...action.youtube_video }
        case GET_YOUTUBE_API_ERR:
            return state = { ...state, msg: '伺服器錯誤', bool: false }
        default:
            return state
    }
}
function get_Youtube_API_Success(video) {
    return { type: GET_YOUTUBE_API_SUCCESS, youtube_video: video }
}

function get_Youtube_API_Err() {
    return { type: GET_YOUTUBE_API_ERR }
}

export function searchYouTube(params) {

    if (!params.key) {
        throw new Error('Please provide a API key parameter');
    }

    if (!params.part) {
        params.part = 'snippet';
    }

    if (!params.maxResults) {
        params.maxResults = 5;
    }

    if (!params.type) {
        params.type = 'video';
    }
    return dispatch => {
        axios.get(ROOT_URL, { params: params })
            .then(function (res) {
                dispatch(get_Youtube_API_Success({ youtube_video: res.data.items }))
            })
            .catch(function (error) {
                console.error(error);
            });
    }

};

export function searchYoutubeByUrl(name) {
    return dispatch => {
        axios.post('http://localhost:3000/post/youtube', { name: name })
            .then(res => {
                dispatch(get_Youtube_API_Success({ youtube_url_id: res.data }))
            })
    }
}
