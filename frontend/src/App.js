import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import history from './services/history';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyle from './styles/GlobalStyles';
import * as Colors from './config/colors';
import Header from './components/Header';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} className="toast-container" />
      </Router>
    );
  }
}

export default App;
