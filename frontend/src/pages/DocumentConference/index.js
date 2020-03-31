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


export default function DocumentConference() {
  const [show, setShow] = useState(false);
  const [modalProtocol, setModalProtocol] = useState([]);


  const handleClose = () => setShow(false);
  const handleShow = (selectedProtocol) => {
    setShow(true);
    setModalProtocol(selectedProtocol);
  };

  const scrollDiv = createRef();


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
      <div style={styles.content} className="d-flex flex-column  align-items-center ">
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

        <h1 className="text-center">Como conferir documentos no SIAPI</h1>

        <div className="p-3 m-2 border rounded" style={{ maxWidth: '90%' }}>
          <p>
            Vamos mostrar aqui dois métodos para conferência de documentos no SIAPI, que surtirão os mesmos efeitos e cabe a você decidir qual utilizar, de acordo com sua necessidade.
          </p>
          <p>
            Os métodos foram baseados na experiência de uso e no
            {' '}
            <a href="https://www.bombeiros.go.gov.br/wp-content/uploads/2014/10/Solicita%c3%a7%c3%a3o-de-Inspe%c3%a7%c3%a3o_PROTOCOLISTA_V1.0.pdf" target="_blank" rel="noopener noreferrer">Manual do SIAPI.</a>
          </p>
          <ScrollLink to="metodo1" smooth offset={-70} className="btn btn-small btn-info mx-2">Método 1</ScrollLink>
          <ScrollLink to="metodo2" smooth offset={-70} className="btn btn-small btn-info mx-2">Método 2</ScrollLink>
          <hr />
          <section id="metodo1">
            <h2>Método 1 - Conforme Manual do Siapi</h2>
            <div className="alert alert-danger" role="alert">
              Este método é baseado no descrito no manual, em conjunto com as peculariadades da secão. O manual pode ser encontrado
              {' '}
              <a href="https://www.bombeiros.go.gov.br/wp-content/uploads/2014/10/Solicita%c3%a7%c3%a3o-de-Inspe%c3%a7%c3%a3o_PROTOCOLISTA_V1.0.pdf" target="_blank" rel="noopener noreferrer">
                aqui.
                <FaCloudDownloadAlt />
              </a>
            </div>
            <div className="alert alert-warning" role="alert">
              Caso o protocolo
              {' '}
              <b>seja MEI e ainda não tenha sido isento</b>
              , é obrigatório seguir este método para poder isentar.
            </div>
            <div>
              <h4>1.1- Listando os protocolos</h4>
              <Image className="img-fluid rounded" src={menuInspecoes} />
              {' '}

              <li className="my-2">Clique em Conferência de Inspeção (para vistoria para funcionamento) ou Conf. de Certificação prévia, de acordo com o tipo de serviço que deseja verificar.</li>
              <Image className="img-fluid rounded" src={filtros} />
              {' '}
              <li className="my-2">Aplique os filtros da maneira que desejar e clique em PESQUISAR para listar os protocolos.</li>
              <div className="alert alert-warning" role="alert">
                Os filtros são auto-explicativos e exclusivos: Se você marcar "SIM" para MEI, ele vai listar somente os protocolos que estão como MEI. Caso marque SIM em "Todas", vai listar todos os protocolos, mas essa opção é mais demorada.
              </div>

            </div>
            <div>
              <h4>1.2- Escolha o Protocolo da lista</h4>
              <Image className="img-fluid rounded" src={listaProtocolos} />
              <li className="my-2">Procure na lista o protocolo, e clique em cima dele (do número).</li>

              <Image className="img-fluid rounded" src={distribuir} />
              <li className="my-2">Esta tela aparecerá, informando o protocolo na barra. Clique na lupa para distribuir o protocolo para você.</li>
            </div>
            <div>
              <h4>1.3- Verificando os documentos</h4>

              <li className="my-2">Após distribuir, será mostrada esta tela:</li>

              <Image className="img-fluid rounded" src={telaDocumentos} />
              {' '}
              <li className="my-2">Nela ira listar todos os documentos anexados ao protocolo. Você pode clicar em Visualizar ou Download para verificar o documento (recomendo o download, pois a visualização é melhor).</li>
              <li className="my-2">Caso o protocolo já possua exigência de documentação, verifique o documento. Se estiver OK, baixe a exigência. Caso contrário, clique em "Observações" ao lado do documento que está verificando e informe o motivo da não aceitação.</li>
              <Image className="img-fluid rounded" src={campoObservacao} />
              <div className="alert alert-warning my-2" role="alert">
                É importante mencionar em cada documento se o mesmo está OK ou por qual motivo não foi aceito, assim o solicitante tem como saber o que foi analisado.
              </div>

              <div className="alert alert-danger my-2" role="alert">
                Caso apareça o botão 'ISENTAR MEI', a verificação e isenção devem ser feitos nesta tela. Isto é importante pois caso não seja feito aqui, e você saia desta tela será necessário cancelar a distribuição e distribuir novamente para poder isentar.

                <Image className="img-fluid rounded" src={isentarMEI} />
              </div>
              <li className="my-2">Na tela de exigência é possível baixar, editar, excluir e lançar novas exigências:</li>
              <Image className="img-fluid rounded" src={telaExigencias} />

              <li className="my-2">Para lançar exigência, basta preencher o formulário e clicar em Incluir Exigência. Para baixar, clice no V na coluna STATUS. A data e o seu nome aparecerão nas colunas Data Aprovação e Aprovado por, indicando que você aprovou aquela exigência.</li>
              <Image className="img-fluid rounded" src={lancarExigencia} />

              <li className="my-2">Caso todas as exigências tenham sido sanadas, clique em Aprovar Inspeção na aba Documentos. Caso ainda existam exigências, clique em Finalizar Conferência.</li>

              <Image className="img-fluid rounded" src={finalizarConferencia} />
              <div className="alert alert-success my-2" role="alert">
                Esta é a maneira indicada pelo Manual, resumidamente. No Manual tem mais detalhes, não deixe de conferí-lo.
              </div>
            </div>
          </section>
          <hr />
          <section id="metodo2">
            <h2>Método 2 - Direto pelo Protocolo</h2>
            <div className="alert alert-info my-2" role="alert">
              Este é um método alternativo, indicado para quando não é MEI ou quando a taxa já foi isenta. Ele é um pouco mais rápido e simples.
            </div>
            <div>
              <h4>2.1 Distribua o protocolo </h4>
              <li className="my-2">
                Entre no protocolo, clique em Distribuir e nesta tela escolha seu nome na lista. Atentar para o
                {' '}
                <b>
                  Distribuir para Conferência de Documentação
                </b>

              </li>
              <Image className="img-fluid rounded" src={distribuirConferencista} />

              <li className="my-2">Após distribuido, verifique as exigências (anote, salve em pdf e abra, ou imprima para facilitar), e clique em "Mais" e em seguida em "Enviar Arquivo".</li>
              <div className="alert alert-info" role="alert">
                Dica: salve as exigências em PDF e abra o documento em uma nova janela, podendo assim ver o que está pendente e analisar os documentos.
              </div>
              <Image className="img-fluid rounded" src={enviarArquivo} />
              <li className="my-2">Será aberta uma nova tela, onde poderá fazer download dos documentos e incluir observações em cada um, conforme no método acima.</li>
              <Image className="img-fluid rounded" src={telaEnviarArquivo} />
              <li className="my-2">Preencha uma observação para cada documento, facilitando assim a tarefa do próximo conferencista e também do solicitante.</li>
              <Image className="img-fluid rounded" src={campoObservacao} />
              <div className="alert alert-warning my-2" role="alert">
                É importante mencionar em cada documento se o mesmo está OK ou por qual motivo não foi aceito, assim o solicitante tem como saber o que foi analisado.
              </div>
              <li className="my-2">Após conferir todos os documentos, clique em 'FECHAR' e depois clique em "Exigências" para poder lançar, aprovar ou incluir novas exigências.</li>
              <Image className="img-fluid rounded" src={telaListaExigencias} />
              <li className="my-2">Caso ainda reste exigências, clique em "Finalizar com exigências", caso negativo, aprove o protocolo clicando em "APROVAR".</li>

            </div>
            <div className="alert alert-secondary" role="alert">
              Caso encontre erros ou tenha dúvidas, entre em contato!
            </div>
          </section>

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
