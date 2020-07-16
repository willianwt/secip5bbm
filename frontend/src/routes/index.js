import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

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
const Home = lazy(() => import('../pages/Home'));
const DocumentConference = lazy(() => import('../pages/DocumentConference'));
const SEI = lazy(() => import('../pages/SEI'));
const Instagram = lazy(() => import('../pages/Instagram'));
const Nt012020 = lazy(() => import('../pages/NT012020'));

export default function Routes() {
  return (
    <Suspense fallback={<div style={{ height: '100vh' }}><div className="d-flex h-100 justify-content-center align-items-center"><h3>Carregando...</h3></div></div>}>
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
    </Suspense>
  );
}
