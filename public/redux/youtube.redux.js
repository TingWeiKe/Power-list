
import axios from 'axios'
const GET_YOUTUBE_API_SUCCESS = 'GET_YOUTUBE_API_SUCCESS'
const GET_YOUTUBE_API_ERR = 'GET_YOUTUBE_API_ERR'
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search'
const key = 'AIzaSyDsa1h_sYYPTJ3LwizuBkyHNBEht2qUSJQ'

const init = {
    msg: '',
    youtube_video: {},
    youtube_url_id: '',
    youtube_url_title: '',
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

export function searchYouTube(dispatch, name) {

    axios.get(ROOT_URL, {
        params: {
            key: key, 'maxResults': '1',
            'part': 'snippet',
            'q': name,
            'type': '', maxResults: 1
        }
    })
        .then(function (res) {
            console.log(res)
            dispatch(get_Youtube_API_Success({ youtube_video: res.data.items }))
        })


};

export function searchYoutubeByUrl(name) {
    return dispatch => {
        //和後端爬蟲拿 Video_ID
        axios.post('http://localhost:3000/post/youtube', { name: name })
            .then(res => {
                dispatch(get_Youtube_API_Success({ youtube_url_id: res.data.id, youtube_url_title: res.data.title }))
            }).catch((error) => {
                
                alert('--------------------From Youtube DATA API v3--------------------')
                //   發request 向Youtube拿Video_ID
                searchYouTube(dispatch, name.name)

            })
    }
}

