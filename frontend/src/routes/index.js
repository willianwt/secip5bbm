import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Escaninho from '../pages/Escaninho';
import Page404 from '../pages/Page404';
import AddProtocol from '../pages/AddProtocol';
import EditProtocol from '../pages/EditProtocol';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Users from '../pages/Users';
import DocumentConference from '../pages/DocumentConference';
import SEI from '../pages/SEI';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/escaninho" component={Escaninho} />
      <Route exact path="/conferenciadedocumentos" component={DocumentConference} />
      <Route exact path="/SEI" component={SEI} />
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
