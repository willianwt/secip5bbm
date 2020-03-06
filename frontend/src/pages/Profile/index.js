/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import history from '../../services/history';


import api from '../../services/api';

import { Form } from './styled';

export default function Profile() {
  const user = JSON.parse(sessionStorage.secip);
  // eslint-disable-next-line no-underscore-dangle
  const id = user._id;

  const [grade, setGrade] = useState(user.grade);
  const [name, setName] = useState(user.name);
  const [rgm, setRgm] = useState(user.rgm);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');


  async function handdleUpdateUser(e) {
    e.preventDefault();
    try {
      const response = await api.post('/users/updateUser', {
        id,
        grade,
        name,
        rgm,
        email,
      });

      if (response) {
        sessionStorage.setItem('secip', JSON.stringify(response.data));
        toast.success('Perfil Atualizado com sucesso!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro. Tente novamente mais tarde.');
    }
  }


  return (
    <div className="d-flex justify-content-around align-items-center p-0 my-5 ">
      <div className="col">
        <h1 className="text-center">
          Meu Perfil
        </h1>
        <h2 className="text-muted text-center">
          Caso deseje atualizar, altere os campos desejados e clique em atualizar.
        </h2>
        <Form className="border rounded  p-3 m-3" onSubmit={handdleUpdateUser}>
          <div className="form-row mx-3">
            <div className="offset-md-2 col-md-4 mb-3">
              <label htmlFor="grade">Patente</label>
              <select className="custom-select" name="grade" id="grade" onChange={(e) => setGrade(e.target.value)} defaultValue={grade} required>
                <option value="">Escolha a patente</option>
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

            <div className="col-md-4 mb-3">
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
            <div className="offset-md-2 col-md-8 mb-3">
              <label htmlFor="name">Nome</label>
              <input type="text" className="form-control" id="name" name="name" placeholder="Digite seu nome completo" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>

          <div className="form-row mx-3">
            <div className="offset-md-2 col-md-8 mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder="Email" required />
            </div>
          </div>

          <div>
            <div className="offset-md-2 mt-3 col-md-8 d-flex">

              <button className="btn btn-success px-5 mr-auto" type="submit">Atualizar</button>
              <Link to="/login" className="btn btn-danger px-5 ml-auto text-right">Voltar</Link>
            </div>
          </div>

        </Form>

      </div>

    </div>
  );
}
