import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import HeaderRoutre from './component/headerRoute'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Search from './container/search/search'
import Category_box from './component/category_box/category_box'
import Today from './container/today/today'
import Playlist_category from './container/playlist_category/playlist_category'
import Recent from './container/recents/recents'
import Setting from './container/setting/setting'
import Playlist from './component/playlist/playlist'
import reducer from './reducer';
import Yotuber_player from './component/youtube/yotuber_player'


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(
  //處裡Async middleware
  applyMiddleware(thunk),
  //chrome redux extenion
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) : compose(applyMiddleware(thunk)))


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>

      <div>
        <HeaderRoutre />
        <Switch>
          <Route exact path='/' component={Today}></Route>
          <Route path='/today' component={Today} />
          <Route path='/recents' component={Recent} />
          <Route path='/playlist' component={Playlist} />
          <Route path='/playlist_category' component={Playlist_category} />
          <Route path='/category_box' component={Category_box} />
          <Route path='/setting' component={Setting} />
          <Route paht='/search' component={Search} />
        </Switch>
        <Yotuber_player/>
      </div>
    </BrowserRouter>
  </Provider>


  ,
  document.getElementById('app')
);
