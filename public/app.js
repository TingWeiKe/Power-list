import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import HeaderRoutre from './component/headerRoute'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'


import Today from './container/today/today'
import Playlist from './container/playlist/playlist'
import Recent from './container/recents/recents'
import Setting from './container/setting/setting'
import reducer from './reducer';
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
              <Route path='/today' component={Today} />
              <Route path='/playlist' component={Playlist} />
              <Route path='/recents' component={Recent} />
              <Route path='/setting' component={Setting} />
              <Redirect exact paht='/' to='/today'></Redirect>
            </Switch>
        
         
        </div>

    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('app')
);

