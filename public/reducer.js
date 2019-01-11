//合併所有reducer並返回
import { combineReducers } from 'redux'
import { box } from './redux/box.redux'
import { playlist } from './redux/playlist.redux'
import { playlist_category } from './redux/playlist_category.redux'
export default combineReducers({ box, playlist, playlist_category })