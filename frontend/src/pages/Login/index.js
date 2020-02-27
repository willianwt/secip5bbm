/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { Form } from './styled';

export default function Login() {
  return (
    <div className="d-flex justify-content-around align-items-center h-75 p-0 m-0">
      <div id="form" className="col-12">
        <Form className="border rounded mx-auto p-1" method="POST" action="login.php">
          <row className="text-center"><h1>Login</h1></row>
          <div className="form-group">
            <label htmlFor="login">RG</label>
            <input type="text" className="form-control" id="login" placeholder="Digite o RG" name="login" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="Digite a Senha" />
          </div>

          <div className="col m-2">

            <button type="submit" className="btn btn-primary m-2" name="entrar" value="entrar">Entrar</button>
            <button id="cadastro" type="button" className="btn btn-warning m-2">Cadastrar</button>
            <button id="esqueceu" type="button" className="btn btn-danger m-2">Esqueceu a senha?</button>

          </div>
          <div className="d-flex" />
          <div className="d-flex" />


        </Form>
      </div>

    </div>
  );
}
