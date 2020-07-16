import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Page404 from '../pages/Page404';
/*
import Login from '../pages/Login';

import Escaninho from '../pages/Escaninho';

import AddProtocol from '../pages/AddProtocol';
import EditProtocol from '../pages/EditProtocol';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Users from '../pages/Users';
*/
import DocumentConference from '../pages/DocumentConference';
import SEI from '../pages/SEI';
import Instagram from '../pages/Instagram';
import Nt012020 from '../pages/NT012020';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/escaninho" component={Escaninho} /> */}
      <Route exact path="/conferenciadedocumentos" component={DocumentConference} />
      <Route exact path="/SEI" component={SEI} />
      {/* <Route path="/login" component={Login} /> */}
      {/* <Route path="/adicionarProtocolo" component={AddProtocol} /> */}
      {/* <Route path="/editarProtocolo" render={(props) => <EditProtocol {...props} />} /> */}
      {/* <Route path="/cadastro" component={Register} /> */}
      {/* <Route path="/perfil" component={Profile} /> */}
      {/* <Route path="/usuarios" component={Users} /> */}
      <Route path="/instagram" component={Instagram} />
      <Route path="/nt012020" component={Nt012020} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}
