/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import history from '../../services/history';


import api from '../../services/api';

import { Form } from './styled';

export default function Login() {
  const [rgm, setRgm] = useState('');
  const [password, setPassword] = useState('');
  const logged = false;

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post('/users/login', {
      rgm,
      password,
    });
    if (response.data.error) {
      alert(JSON.stringify(response.data));

      return;
    }


    sessionStorage.setItem('secip', JSON.stringify(response.data.user));
    if (sessionStorage.secip) {
      const user = JSON.parse(sessionStorage.secip);
    }
    history.push('/');
  }
  // eslint-disable-next-line no-restricted-globals


  return (
    <div className="d-flex justify-content-around align-items-center h-75 p-0 m-0">
      <div id="form" className="col-12">
        <Form className="border rounded mx-auto p-4 m-2" onSubmit={handleSubmit}>
          <div className="text-center"><h1>Login</h1></div>
          <div className="form-group">
            <label htmlFor="login">RG</label>
            <input
              type="text"
              className="form-control"
              id="login"
              placeholder="Digite o RG"
              name="login"
              value={rgm}
              onChange={(e) => setRgm(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Digite a Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="col m-2">

            <button type="submit" className="btn btn-primary m-2" name="login">Entrar</button>
            <Link id="cadastro" type="button" className="btn btn-warning m-2" to="/cadastro">Cadastrar</Link>
            <button id="esqueceu" type="button" className="btn btn-danger m-2">Esqueceu a senha?</button>

          </div>
          <div className="d-flex" />
          <div className="d-flex" />


        </Form>
      </div>

    </div>
  );
}
