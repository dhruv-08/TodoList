import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Nav from './components/Nav'
import Login from './components/Login'
// import Inbox from './components/Inbox'
// import Today from './components/Today'
// import Upcoming from './components/Upcoming'
// import Project from './components/Project'
function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/" component={()=><Login/>}/>
          <Route exact path="/home" component={()=><Nav/>}/>
          <Route exact path="/inbox" component={()=><Nav/>}/>
          <Route exact path="/today" component={()=><Nav/>}/>
          <Route exact path="/upcoming" component={()=><Nav/>}/>
          <Route exact path="/project" component={()=><Nav/>}/>
      </Switch>
    </div>
  );
}

export default App;
