//合併所有reducer並返回
import { combineReducers } from 'redux'
import { box } from '../redux/box.redux'
import { playlist } from '../redux/playlist.redux'
import { playlist_category } from '../redux/playlist_category.redux'
import { hot_board } from '../redux/hotBoard.redux'
import { category } from '../redux/category.redux'
import { setting } from '../redux/setting.redux'
import { categoryBox } from '../redux/categoryBox.redux'
import { youtube } from '../redux/youtube.redux'
import { kkbox } from '../redux/kkbox_redux'
import { spotify } from '../redux/spotify.redux'
import { search } from '../redux/search.redux'

export default combineReducers({
  box,
  playlist,
  playlist_category,
  hot_board,
  category,
  setting,
  categoryBox,
  youtube,
  kkbox,
  spotify,
  search,
})
