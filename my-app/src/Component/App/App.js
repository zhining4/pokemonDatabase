import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Search from '../Search/search.jsx';
import Detail from '../Detail/detail.jsx';
import Gallery from '../Gallery/gallery.jsx';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path = '/' component={ Search }/>
          <Route exact path = '/Pokemon' component = { Gallery }/>
          <Route exact path = '/Pokemon/:id' component = { Detail }/>
        </Switch>
       </HashRouter> 
    );
  }
}

export default App;