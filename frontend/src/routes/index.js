import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Page404 from '../pages/Page404';
import AddProtocol from '../pages/AddProtocol';
import EditProtocol from '../pages/EditProtocol';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Users from '../pages/Users';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/adicionarProtocolo" component={AddProtocol} />
      <Route path="/editarProtocolo" render={(props) => <EditProtocol {...props} />} />
      <Route path="/cadastro" component={Register} />
      <Route path="/perfil" component={Profile} />
      <Route path="/usuarios" component={Users} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}
