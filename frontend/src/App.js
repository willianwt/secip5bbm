import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import GlobalStyle from './styles/GlobalStyles';
import * as Colors from './config/colors';
import Header from './components/Header';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Routes />
        <GlobalStyle />
      </>
    );
  }
}

export default App;
