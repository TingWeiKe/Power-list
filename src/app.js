import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import HeaderRouter from './components/headerRoute'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Search from './containers/search/search'
import categoryBox from './components/categoryBox/categoryBox'
import Today from './containers/today/today'
import PlaylistCategory from './containers/PlaylistCategory/playlistCategory'
import Recent from './containers/recents/recents'
import Setting from './containers/setting/setting'
import Mylist from './containers/mylist/mylist'
import Playlist from './components/playlist/playlist'
import { store } from './redux/store/index'
import Yotuber_player from './components/youtube/yotuber_player'

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<HeaderRouter />
				<Switch>
					<Route path='/today' component={Today} />
					<Route path='/recents' component={Recent} />
					<Route path='/playlist' component={Playlist} />
					<Route path='/playlist_category' component={PlaylistCategory} />
					<Route path='/categoryBox' component={categoryBox} />
					<Route path='/mylist' component={Mylist} />
					<Route path='/setting' component={Setting} />
					<Route paht='/search' component={Search} />
				</Switch>
				<Yotuber_player />
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('app')
)
