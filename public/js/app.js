import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Layout } from 'antd';
import HeaderRoutre from './component/headerRoute'
import { BrowserRouter, Route } from 'react-router-dom'


import Today from './container/today'
import Playlist from './container/playlist'
import Recent from './container/recents'
import Setting from './container/setting'
import Box from '../js/component/box'
import reducer from './reducer';

const { Header, Footer, Content, } = Layout
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(
  //處裡Async middleware
  applyMiddleware(thunk),
  //chrome redux extenion
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) : compose(applyMiddleware(thunk)))


ReactDOM.render(
  <BrowserRouter>
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <HeaderRoutre />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Route exact path='/today' component={Today}></Route>
          <Route path='/playlist' component={Playlist}></Route>
          <Route path='/recents' component={Recent}></Route>
          <Route path='/setting' component={Setting}></Route>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  </BrowserRouter>
  ,
  document.getElementById('app')
);

