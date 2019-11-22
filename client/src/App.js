import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//components
import Header from './components/Header';
import Main from './components/Main';
import User from './components/User';
import Games from './components/Games';
import NewGame from './components/NewGame';
import Teams from './components/Teams';

//redux
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Router>
      <Provider store = {store}>
        <Header/>
          <div className="container">
            <Switch>
              <Route exact path= '/' component={Main}/>
              <Route exact path= '/user' component={User}/>
              <Route exact path= '/games' component={Games}/>
              <Route exact path= '/new_game' component={NewGame}/>
              <Route exact path= '/teams' component={Teams}/>
            </Switch>
          </div>
      </Provider> 
    </Router>
  );
}

export default App;
