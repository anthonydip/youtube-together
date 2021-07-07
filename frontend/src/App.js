import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

const App = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
      </Switch>
    </Router>
  );
};

export default App;