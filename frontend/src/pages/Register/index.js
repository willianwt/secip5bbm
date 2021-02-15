/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bcryptjs from 'bcryptjs';
import { toast } from 'react-toastify';
import history from '../../services/history';


import api from '../../services/api';

import { Form } from './styled';

export default function Register() {
  const [grade, setGrade] = useState('');
  const [name, setName] = useState('');
  const [rgm, setRgm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [validPassword, setValidPassword] = useState(null);

  function checkPassword(val1, val2) {
    const salt = bcryptjs.genSaltSync();
    if (val1 === val2 && val1 !== '' && val2 !== '') {
      setValidPassword(bcryptjs.hashSync(val1, salt));
    } else {
      setValidPassword(null);
    }
  }

  useEffect(() => {
    checkPassword(password, password2);
  }, [password, password2]);
  //   console.log(password);
  //   console.log(password2);
  //   console.log(validPassword);
  async function handleAddUser(e) {
    e.preventDefault();
    try {
      const response = await api.post('/users/createUser', {
        grade,
        name,
        rgm,
        email,
        password: validPassword,
      });

      if (response) {
        history.push('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro. Tente novamente.');
    }
  }
  return (
    <div className="d-flex justify-content-around align-items-center p-0 my-5 ">
      <div className="col">
        <h1 className="text-center">
          CADASTRO
        </h1>
        <h2 className="text-muted text-center">
          Preencha o formulário com seus dados:
        </h2>
        <Form className="border rounded mx-auto p-3 m-3" onSubmit={handleAddUser}>
          <div className="form-row mx-3">
            <div className="col-md-3 mb-3">
              <label htmlFor="grade">Patente</label>
              <select className="custom-select" name="grade" id="grade" onChange={(e) => setGrade(e.target.value)} required>
                <option value="" defaultValue>Escolha a patente</option>
                <option value="sd">Soldado</option>
                <option value="cb">Cabo</option>
                <option value="sgt">Sargento</option>
                <option value="ten">Tenente</option>
                <option value="cap">Capitão</option>
                <option value="maj">Major</option>
                <option value="tc">Tenente-Coronel</option>
                <option value="cel">Coronel</option>
              </select>
              <div className="invalid-feedback">Escolha uma patente</div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="name">Nome</label>
              <input type="text" className="form-control" id="name" name="name" placeholder="Digite seu nome completo" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="rg">RG</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend">@</span>
                </div>
                <input type="text" className="form-control" id="rgm" name="rgm" placeholder="RG com 4 dígitos" value={rgm} onChange={(e) => setRgm(e.target.value)} pattern="[0-9].{2,}" required />
                <div className="invalid-feedback">Digite o RG com 4 dígitos</div>
              </div>
            </div>
          </div>

          <div className="form-row mx-3">
            <div className="col-md-4 mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder="Email" required />

            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="password">Senha</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Senha" name="password" required />

            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="confirmPassword">Repita a Senha</label>
              <input type="password" className="form-control" value={password2} onChange={(e) => setPassword2(e.target.value)} id="confirmPassword" placeholder="Senha" name="password" required />

            </div>
          </div>
          <div>
            <div className="row">
              <div className="col">
                <button className="btn btn-success btn-block" type="submit">Enviar</button>
              </div>
              <div className="col">
                <Link to="/login" className="btn btn-danger btn-block">Voltar</Link>
              </div>
            </div>
          </div>

        </Form>

      </div>

    </div>
  );
}
