import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Search from '../Search/search.jsx';
import Detail from '../Detail/detail.jsx';
import history from '../History/history.jsx'; 
import Gallery from '../Gallery/gallery.jsx';

class App extends Component {
  render() {
    return (
      <BrowserRouter history = {history} basename = '/CS498RK_mp2'>
        <Switch>
          <Route exact path = '/' component={ Search }/>
          <Route path = '/Pokemon' component = { Gallery }/>
          <Route path = '/Pokemon/:id' component = { Detail }/>
        </Switch>
       </BrowserRouter> 
    );
  }
}

export default App;