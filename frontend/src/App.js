import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from './contexts/user/UserContext';

// Import pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

const App = () => {
  const [user, setUser] = React.useState
  ({
      uid: 0,
      username: '',
      email: '',
      logged: false,
  });

  return(
    <Router>
      <Switch>
        <UserContext.Provider value={{user, setUser}}>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
};

export default App;