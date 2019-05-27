import axios from 'axios'
import { onYouTubeIframeAPIReady, init_youtube } from '../utils/youtubeAPI'
const GET_YOUTUBE_DATA_SUCCESS = 'GET_YOUTUBE_DATA_SUCCESS'
const GET_YOUTUBE_DATA_ERR = 'GET_YOUTUBE_DATA_ERR'
const ROOT_URL = 'https://www.googleDatas.com/youtube/v3/search'
let x
const init = {
	msg: '',
	youtube_video: {},
	youtube_url_id: '',
	youtube_url_title: ''
}

export function youtube(state = init, action){
	switch (action.type) {
		case GET_YOUTUBE_DATA_SUCCESS:
			return (state = { ...state, bool: false, msg: 'success', ...action.youtube_video })
		case GET_YOUTUBE_DATA_ERR:
			return (state = { ...state, msg: '伺服器錯誤', bool: false })
		default:
			return state
	}
}

function getYoutubeDataSuccess(video){
	return { type: GET_YOUTUBE_DATA_SUCCESS, youtube_video: video }
}

function getYoutubeDataErr(){
	return { type: GET_YOUTUBE_DATA_ERR }
}

export function scrapeYoutubeData(name){
	return dispatch => {
		//和後端爬蟲拿 Video_ID
		axios
			.post('/post/youtube', { name: name })
			.then(res => {
				dispatch(getYoutubeDataSuccess({ youtube_url_id: res.data.id, youtube_url_title: res.data.title }))
				if (x != 1) {
					onYouTubeIframeAPIReady()
					x = 1
				}
			})
			.catch(error => {
				dispatch(getYoutubeDataErr())
			})
	}
}
