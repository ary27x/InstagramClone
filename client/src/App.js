import React from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./views/Signup";
import Signin from "./views/Signin";
import Profile from "./views/Profile";
import New from "./views/New";
import Add from "./views/Add";
import Main from "./views/Main";
import Settings from "./views/Settings";
import User from "./views/User";
import View from "./views/View";
import Explore from "./views/Explore";
import Followers from './views/Followers'
import Followings from './views/Followings'

function App() {
  return (
    <React.Fragment>
      
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/add">
          <Add />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/new">
          <New />
        </Route>
        <Route path="/user/:username">
          <User />
        </Route>
        <Route path="/explore">
          <Explore />
        </Route>
        <Route path="/view/:id">
          <View />
        </Route>
        <Route path='/followers/:username'>
          <Followers/>
        </Route>
        <Route path='/followings/:username'>
          <Followings/>
        </Route>
        
      </Switch>
    </React.Fragment>
  );
}
export default App;
