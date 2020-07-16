import React, { Component, Suspense, lazy } from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import store from './store';
import history from './services/history';
//import 'bootstrap/dist/css/bootstrap.min.css';

const GlobalStyle = lazy(() => import('./styles/GlobalStyles'));
const Header = lazy(() => import('./components/Header'));
const Routes = lazy(() => import('./routes'));

class App extends Component {
  render() {
    return (
        <Suspense fallback={<div style={{height: '100vh'}}><div className="d-flex h-100 justify-content-center align-items-center"><h3>Carregando...</h3></div></div>}>
            <Provider store={store}>
                <Router history={history}>
                    <Header />
                    <Routes />
                    <GlobalStyle />
                    {/* TODO: alterar para 3 ou 4 segundos */}
                    <ToastContainer
                    autoClose={4000}
                    position="top-center"
                    className="toast-container"
                    />
                </Router>
            </Provider>
        </Suspense>

    );
  }
}

export default App;