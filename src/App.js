import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Nav from './components/Nav'
import Login from './components/Login'
function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/" component={()=><Login/>}/>
          <Route exact path="/home" component={()=><Nav/>}/>
      </Switch>
    </div>
  );
}

export default App;
