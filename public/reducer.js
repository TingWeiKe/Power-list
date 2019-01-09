//合併所有reducer並返回
import { combineReducers } from 'redux'
import { box } from './redux/box.redux'
import { playlist } from './redux/playlist.redux'

export default combineReducers({box,playlist})