/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import api from '../../services/api';

export default function Home() {
  const [protocols, setProtocols] = useState([]);


  useEffect(() => {
    async function listProtocols() {
      const response = await api.get('/protocol/listProtocols');

      setProtocols(response.data);
    }
    listProtocols();
  }, []);

  // checa se o usuário está logado e redireciona para o login caso negativo.
  // TODO: é necessário?

  let logged = true;
  if (sessionStorage.secip === undefined) {
    logged = false;
  }
  if (!logged) {
    return <Redirect to="/login" />;
  }

  // formata a data de 2020/10/31 para 31/10/2020

  function formatDate(date) {
    const oldData = date.split('-');
    const newData = `${oldData[2]}/${oldData[1]}/${oldData[0]}`;
    return newData.toString();
  }

  // html da página
  return (
    <div className="container-fluid" style={{ height: '94vh' }}>
      <div className="row" style={{ height: '94vh' }}>
        {/* incluir esta coluna em um componente */}
        <div className="col-sm-3 my-3">
          <div className="container-fluid">
            <h2 className="text-center">
              Escaninho
              <br />

              Luziânia
            </h2>
            <Link to="/adicionarProtocolo" className="btn btn-block btn-primary my-1">Adicionar </Link>
          </div>
          <div className="container-fluid">
            <input type="text" id="busca_escaninho" placeholder="Busca" className="form-control my-1" />
          </div>
          <div id="solicitarMaterial" className="container-fluid">
            <button type="button" className="btn btn-block btn-info" data-toggle="modal" data-target="#modalMaterial">
              Solicitar Material
            </button>
          </div>
          <div id="escolheCidade" className="container-fluid">
            <a className="btn btn-block btn-warning" href="escolheCidade.php">Trocar Cidade</a>
          </div>
        </div>
        {/* incluir esta coluna em um componente */}

        <div className="col-sm-9" style={{ height: '94vh', overflow: 'scroll' }}>
          <table id="escaninho" className="table table-bordered table-responsive-sm table-striped dataTable" aria-describedby="escaninho_info" role="grid">
            <thead>
              <tr className="text-center">
                <th>Protocolo</th>
                <th>Área</th>
                <th>Bairro</th>
                <th>Situação</th>
                <th>Data</th>
                <th>Vistoriador</th>
                <th>Ações</th>
              </tr>

            </thead>
            <tbody>
              { protocols.error === 'not logged'
                ? <Redirect to="/login" />
                : protocols.map((protocol) => (
                  <tr className="text-center" key={protocol._id}>
                    <td>{protocol.protocol}</td>
                    <td>{protocol.area}</td>
                    <td>{protocol.district}</td>
                    <td>{protocol.situation}</td>
                    <td>{formatDate(protocol.date)}</td>
                    <td />
                    <td>
                      <Link to={{ pathname: '/editarProtocolo', state: { protocol } }} className="btn btn-success btn-sm">
                        <i />
                        Editar/Dist.
                      </Link>
                      <button type="button" className="btn btn-danger btn-sm ml-1">Excluir</button>
                    </td>
                  </tr>
                ))}


            </tbody>
            <tfoot>
              <tr>
                <th rowSpan="1" colSpan="1">Protocolo</th>
                <th rowSpan="1" colSpan="1">Área</th>
                <th rowSpan="1" colSpan="1">
                  <select>
                    <option value="" aria-label="vazio" />
                    <option value="Centro">Centro</option>
                    <option value="Parque Nova Friburgo A">Parque Nova Friburgo A</option>
                    <option value="Parque Nova Friburgo B">Parque Nova Friburgo B</option>
                  </select>
                </th>
                <th rowSpan="1" colSpan="1">
                  <select>
                    <option value="" />
                    <option value="Aprovada">Aprovada</option>
                    <option value="Exigencia">Exigencia</option>
                    <option value="Incorreto">Incorreto</option>
                    <option value="Proativa">Proativa</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </th>
                <th rowSpan="1" colSpan="1">
                  <select>
                    <option value="" />
                    <option value="23-07-2018">23-07-2018</option>
                    <option value="24-07-2018">24-07-2018</option>
                    <option value="25-02-2018">25-02-2018</option>
                    <option value="26-07-2018">26-07-2018</option>
                    <option value="31-12-2019">31-12-2019</option>
                  </select>
                </th>
                <th rowSpan="1" colSpan="1">Vistoriador</th>
                <th rowSpan="1" colSpan="1">Ações</th>
              </tr>
              { console.log(protocols)}
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
