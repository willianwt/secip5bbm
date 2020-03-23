/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [modalUser, setModalUser] = useState([]);
  const [deletedProtocol, setDeletedProtocol] = useState('');

  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
  };
  const handleShow = (selectedProtocol) => {
    setShow(true);
    setModalUser(selectedProtocol);
  };

  async function getUser(id) {
    const user = await api.post(`/users/listUser/${id}`);
    if (user) setModalUser(user.data);

    setShowEdit(true);
    setModalUser(user.data);
    console.log(modalUser);
  }

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
        const response = await api.get('/users/listUsers');

        setUsers(response.data);
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
              { users.error === 'not logged'
                ? <Redirect to="/login" />
                : users.map((user) => (
                  <tr className="text-center" key={user._id}>
                    <td>{user.rgm}</td>
                    <td>{user.grade}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td />
                    <td>
                      <Button onClick={() => getUser(user._id)} className="btn btn-success btn-sm">Editar</Button>
                    </td>
                    <td>

                      <Button onClick={() => handleShow(user)} variant="danger" size="sm" className="ml-1">Excluir</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal de Edição */}
      <Modal show={showEdit} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Usuário
            {' '}
            {modalUser.rgm}
            ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Essa ação não pode ser desfeita. Use com responsabilidade!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Não
          </Button>
          <Button variant="primary" onClick={() => deleteProtocol(modalUser._id)}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de exclusão */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Tem certeza que deseja EXCLUIR o Usuário
            {' '}
            {modalUser.rgm}
            ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Essa ação não pode ser desfeita. Use com responsabilidade!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Não
          </Button>
          <Button variant="primary" onClick={() => deleteProtocol(modalUser._id)}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
