/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';

import Background from '../../img/logo.webp';

export default function Home() {
  const [show, setShow] = useState(false);
  const [modalProtocol, setModalProtocol] = useState([]);


  const handleClose = () => setShow(false);
  const handleShow = (selectedProtocol) => {
    setShow(true);
    setModalProtocol(selectedProtocol);
  };

  const styles = {
    header: {
      backgroundImage: `url(${Background})`,
      height: '93vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      margin: '0',
      padding: '0',
      flexDirection: 'column',
    },

    content: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      minHeight: '93vh',

    },
  };
  // html da página
  return (
    <div
      className="container-fluid"
      style={styles.header}
    >
      <div style={styles.content} className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-center">Atenção!</h1>

        <div className="px-3 m-2" style={{ maxWidth: '800px' }}>
          <p>
            Todo conteúdo informado neste site foi baseado nas Normas Técnicas do CBMGO, Leis e Manuais, e experiência de uso do Siapi.
          </p>
          <p>
            O informado aqui não substitui o que está descrito nas  Normas Técnicas do CBMGO, e em caso de divergências,
            {' '}
            <b>sempre prevalecerá o descrito nas normas técnicas.</b>
          </p>
          <p>Ao utilizar este site, você está concorda que:</p>
          <ul className="ml-4" style={{ listStyleType: 'upper-roman', listStylePosition: 'inside' }}>
            <li>O criador deste site não será responsabilizado em caso de erros por divergências entre o informado aqui e o informado por normas técnicas, em nenhuma hipótese.</li>
            <li>Em caso de dúvidas, você deve sempre conferir as Normas Técnicas do CBMGO.</li>
            <li>Caso encontre algum erro aqui, você comunicará ao criador deste site ou sua chefia imediata para que o erro seja sanado o quanto antes.</li>
          </ul>
          <p>Este serviço foi feito com intuito de ajudar aqueles que, por qualquer motivo, tenham alguma dificuldade em procedimentos da seção. </p>
          <p>Críticas construtivas e sugestões são sempre bem vindas.</p>
          <p>Em caso de problemas, este site poderá ser tirado do ar sem aviso prévio.</p>
          <p>Você pode começar a utilizar clicando nos botões na barra de navegação acima. </p>
          <p className="text-right">- Cabo Willian</p>
        </div>

      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {/* a ser feito */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{/* corpo do modal */}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Não
          </Button>
          <Button variant="primary">
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
