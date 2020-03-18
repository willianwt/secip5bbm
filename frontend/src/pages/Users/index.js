/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

export default function Users() {
  const [protocols, setProtocols] = useState([]);
  const [show, setShow] = useState(false);
  const [modalProtocol, setModalProtocol] = useState([]);
  const [deletedProtocol, setDeletedProtocol] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (selectedProtocol) => {
    setShow(true);
    setModalProtocol(selectedProtocol);
  };

  async function deleteProtocol(id) {
    try {
      await api.delete(`/protocol/deleteProtocol/${id}`);
      toast.success('Protocolo excluido com sucesso!');
      setShow(false);
      setDeletedProtocol(!deletedProtocol);
    } catch (error) {
      console.log(error);
      setShow(false);
    }
  }

  useEffect(() => {
    async function listProtocols() {
      try {
        const response = await api.get('/protocol/listProtocols');

        setProtocols(response.data);
      } catch (error) {
        toast.error('Problema na conexão! Entre em contato com o Suporte.');
      }
    }
    listProtocols();
  }, [deletedProtocol]);


  // checa se o usuário está logado e redireciona para o login caso negativo.
  // TODO: é necessário?

  if (sessionStorage.secip === undefined) {
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
              Usuários
            </h2>
            <Link to="/adicionarUsuário" className="btn btn-block btn-primary my-1">Adicionar Usuário </Link>
          </div>
          <div className="container-fluid">
            <input type="text" id="busca_escaninho" placeholder="Busca" className="form-control my-1" />
          </div>
        </div>
        {/* incluir esta coluna em um componente */}

        <div className="col-sm-9" style={{ height: '94vh', overflow: 'scroll' }}>
          <table id="escaninho" className="table table-bordered table-responsive-sm table-striped" aria-describedby="escaninho_info" role="grid">
            <thead>
              <tr className="text-center">
                <th>RG</th>
                <th>Graduação</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Permissão</th>
                <th>Editar</th>
                <th>Excluir</th>
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
                      <Button onClick={() => handleShow(protocol)} variant="danger" size="sm" className="ml-1">Excluir</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Tem certeza que deseja EXCLUIR o Prot.
            {modalProtocol.protocol}
            ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Essa ação não pode ser desfeita. Use com responsabilidade!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Não
          </Button>
          <Button variant="primary" onClick={() => deleteProtocol(modalProtocol._id)}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
