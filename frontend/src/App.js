import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import store from './store';
import history from './services/history';
// import 'bootstrap/dist/css/bootstrap.min.css';

import GlobalStyle from './styles/GlobalStyles';
import Header from './components/Header';
import Routes from './routes';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
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
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
