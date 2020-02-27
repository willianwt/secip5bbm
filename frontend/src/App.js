import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyle from './styles/GlobalStyles';
import * as Colors from './config/colors';
import Header from './components/Header';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    );
  }
}

export default App;
