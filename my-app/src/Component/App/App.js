import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Search from '../Search/search.jsx';
import Detail from '../Detail/detail.jsx';
import history from '../History/history.jsx'; 
import Gallery from '../Gallery/gallery.jsx';

class App extends Component {
  render() {
    return (
      <Router history = { history }>
        <Switch>
          <Route exact path = '/CS498RK_mp2' component={ Search }/>
          <Route exact path = '/Pokemon' component = { Gallery}/>
          <Route exact path = '/Pokemon/:id' component = { Detail }/>
        </Switch>
      </Router>
    );
  }
}

export default App;