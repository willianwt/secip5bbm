/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, createRef } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FaAngleUp, FaCloudDownloadAlt } from 'react-icons/fa';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

import { Modal, Button, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../services/api';


// imagens
import Background from '../../img/logo.png';
import menuInspecoes from '../../img/menu_inspecoes.png';
import filtros from '../../img/filtros.png';
import campoObservacao from '../../img/campoObservacao.png';
import distribuir from '../../img/distribuir.png';
import finalizarConferencia from '../../img/finalizarConferencia.png';
import lancarExigencia from '../../img/lancarExigencia.png';
import listaProtocolos from '../../img/listaProtocolos.png';
import telaDocumentos from '../../img/telaDocumentos.png';
import telaExigencias from '../../img/telaExigencias.png';
import isentarMEI from '../../img/isentarMEI.png';
import distribuirConferencista from '../../img/distribuirConferencista.png';
import telaEnviarArquivo from '../../img/telaEnviarArquivo.png';
import enviarArquivo from '../../img/enviarArquivo.png';
import telaListaExigencias from '../../img/telaListaExigencias.png';


export default function SEI() {
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
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      margin: '0',
      padding: '0',
      flexDirection: 'column',

    },

    content: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',

    },
  };
    // html da página
  return (
    <div
      className="container-fluid"
      style={styles.header}
    >
      <div style={styles.content} className="d-flex flex-column  align-items-center">
        <FaAngleUp
          onClick={() => scroll.scrollToTop()}
          style={{
            position: 'fixed',
            right: 20,
            bottom: 20,
            borderRadius: '100px',
            width: '40px',
            height: '40px',
            cursor: 'pointer',

          }}
        />

        <h1 className="text-center">Como criar um processo e um memorando no SEI</h1>

        <div className="px-3 m-2" style={{ maxWidth: '90%' }} />

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
