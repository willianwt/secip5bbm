/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, createRef } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FaAngleUp, FaCloudDownloadAlt } from 'react-icons/fa';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

import { Modal, Button, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';

// imagens
import Background from '../../img/logo.webp';
import iniciarProcesso from '../../img/iniciarProcesso.webp';
import tipoProcesso from '../../img/tipoProcesso.webp';
import dadosProcesso from '../../img/dadosProcesso.webp';
import interessados from '../../img/interessados.webp';
import telaProcesso from '../../img/telaProcesso.webp';
import gerarDocumento from '../../img/gerarDocumento.webp';
import dadosGerarDocumento from '../../img/dadosGerarDocumento.webp';
import editarConteudo from '../../img/editarConteudo.webp';
import documentoExterno from '../../img/documentoExterno.webp';
import atribuirProcesso from '../../img/atribuirProcesso.webp';

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

        <h1 className="text-center">Como criar um processo e um memorando no SEI!</h1>
        <div className="p-3 m-2 border rounded" style={{ maxWidth: '90%' }}>
          <section>
            <p>Abaixo vou mostrar como criar um processo e um documento no SEI!.</p>
            <p>Antes de tudo, saliento que existem MANUAIS e um CURSO que pode ser feito, sendo este incluso na lista de cursos pontuáveis, e é interessante que se faça para um conhecimento mais aprofundado da plataforma SEI!.</p>
            <div className="alert alert-danger" role="alert">
              <a href="https://www.escolavirtual.gov.br/curso/74" target="blank" rel="noopeneer norefereer">
                <button type="button" className="btn btn-small btn-info mx-2">Curso SEI!</button>
              </a>
              <a href="http://sei.goias.gov.br/material_para_treinamento.php" target="blank" rel="noopeneer norefereer">
                <button type="button" className="btn btn-small btn-secondary mx-2">Manuais SEI!</button>
              </a>
            </div>

            <h4>1. Após efetuar login, clique em "Iniciar Processo" na barra lateral</h4>
            <Image className="img-fluid rounded" src={iniciarProcesso} />
            <hr />
            <h4>2. Escolha o tipo de processo</h4>
            <p>Geralmente é utilizado o "Memorando" para os processos no quartel, mas isto pode mudar dependendo da sua necessidade.</p>
            <Image className="img-fluid rounded" src={tipoProcesso} />
            <hr />
            <h4>3. Nesta tela, preencha dados referente ao processo que está criando</h4>

            <Image className="img-fluid rounded" src={dadosProcesso} />
            <li className="my-2 ml-4">
              <b>3.1 - Especificação:</b>
              {' '}
              Informe aqui sobre o que é o processo.
            </li>
            <li className="my-2 ml-4">
              <b>3.2 - Interessados:</b>
              {' '}
              Aqui você informa quem é o interessado na conclusão do processo. Normalmente, você mesmo. Ao clicar abrirá uma janela onde você pode pesquisar a pessoa ou unidade, selecionar, incluir no processo (Transportar) e depois fechar.
            </li>
            <div className="alert alert-info" role="alert">
              <p>
                Para incluir uma pessoa ou unidade na lista de interessados, insira o nome no campo Palavras-chave, clique em pesquisar,
                marque a caixa ao lado do nome da pessoa e depois aperte o botão Pesquisar no canto superior direito da janela. Quando concluir, clique em FECHAR.
              </p>
            </div>
            <Image className="img-fluid rounded" src={interessados} />

            <li className="my-2 ml-4">
              <b>3.3 - Observações da unidade:</b>
              {' '}
              Este campo é opcional, e "onde devem ser inseridas informações adicionais que facilitem a  identificação  de  um  processo  e  a  sua  recuperação".
            </li>
            <li className="my-2 ml-4">
              <b>3.4 - Níveis de acesso:</b>
              {' '}
              Público qualquer pessoa tem acesso, Restrito somente a unidade tem acesso, Sigiloso somente você e a quem você atribuir o processo tem acesso. Recomendo o uso de público ou restrito, mas depende de cada situação.
            </li>
            <div className="alert alert-success ml-4" role="alert">
              <p>3.5 - Ao preencher os campos, clique no botão SALVAR.</p>
            </div>
            <p><b /></p>
            <hr />
            <h4>4. Após clicar em salvar, será mostrada esta tela</h4>
            <Image className="img-fluid rounded my-2" src={telaProcesso} />
            <div className="alert alert-warning" role="alert">
              <p>O circulado é o número do processo criado. Guarde esse número.</p>
            </div>
            <li className="my-2">
              <b>4.1 - Incluir documento (ícone de folha branca com o *)</b>
              {' '}
              Clique no ícone de incluir documento, para incluir um documento no seu processo.
            </li>
            <li className="my-2 ml-4">
              <b>4.2 - Escolha o tipo de documento:</b>
              {' '}
              Normalmente, memorando.
            </li>
            <Image className="img-fluid rounded my-2" src={gerarDocumento} />

            <li className="my-2 ml-4">
              <b>4.3 - Dados do documento:</b>
              {' '}
              Idêntico aos dados do processo, com a diferença do campo "Destinatário" na qual você deve informar para quem está enviando aquele documento. Normalmente sua chefia imediata, algum oficial ou o comandante da unidade.
            </li>
            <div className="alert alert-warning" role="alert">
              <p>O item "Documento Modelo" serve para copiar o texto de algum outro documento já criado. Caso tenha um, marque a caixa e informe o número SEI! dele no campo que aparecer.</p>
            </div>
            <Image className="img-fluid rounded my-2" src={dadosGerarDocumento} />
            <li className="my-2 ml-4">
              <b>4.4 - Na janela que abrir, preencha o texto conforme desejado:</b>
              {' '}
              Altere o texto com o que deseja informar no documento, depois clique em Salvar e em Assinar. Informe sua senha e clique em Assinar. A janela irá fechar e aparecerá um ícone de caneta ao lado do documento gerado.
            </li>
            <div className="alert alert-warning" role="alert">
              <p>Caso queira editar, procure pelo ícone Editar Conteúdo no documento que queira editar. A janela de edição será aberta, faça o necessário, clique em salvar e assinar. Sempre que editar um documento, será necessário assiná-lo novamente.</p>
            </div>
            <Image className="img-fluid rounded my-2" src={editarConteudo} />
            <hr />

            <h4>5. Adicionando anexos (opcional)</h4>
            <li className="my-2 ml-4">
              <b>5.1 - Clique no número do seu processo:</b>
              {' '}
              Em seguida, clique em Incluir Documento e no tipo selecione "EXTERNO".
            </li>
            <Image className="img-fluid rounded my-2" src={documentoExterno} />

            <div className="alert alert-info" role="alert">
              <p>Preencha os campos Tipo de Documento (ANEXO), Nome do documento, Formato, Nível de acesso.</p>
            </div>
            <li className="my-2 ml-4">
              <b>5.2 - Escolher Arquivo:</b>
              {' '}
              Clique no botão e escolha o arquivo no seu computador. Após isso ele deverá aparecer no campo abaixo do botão, com um botão X caso queira removê-lo.
              Após incluir o documento, clique em SALVAR.
              Você deve fazer isso para cada anexo que deseja incluir separadamente.
              Após concluir, clique em "CONFIRMAR DADOS".
            </li>
            <hr />
            <h4>6. Atribuindo o Processo</h4>
            <div className="alert alert-danger" role="alert">
              <p>Conforme o Memorando nº: 232/2020 - 5º BBM- 09871: "...sempre que houver uma solicitação formal no SEI! direcionada às Seções ou Comando deste Batalhão, o requerente deverá atribuir o processo ao destinatário e, sempre que possível, informá-lo do documento e o número SEI! correspondente, para que possa analisar o pleito e emitir o parecer na maior brevidade possível."</p>
            </div>
            <li className="my-2 ml-4">
              <b>6.1 - Clique no número do seu processo:</b>
              {' '}
              Em seguida, procure pelo botão "ATRIBUIR PROCESSO" (um botão com uma pasta amarela e um boneco preto na frente).
            </li>
            <Image className="img-fluid rounded my-2" src={telaProcesso} />
            <li className="my-2 ml-4">
              <b>6.2 - Selecione o destinatário:</b>
              {' '}
              Selecione o destinatário na lista e clique em Salvar. O processo será atribuído para aquele usuário.
            </li>
            <Image className="img-fluid rounded my-2" src={atribuirProcesso} />

            <div className="alert alert-success" role="alert">
              <b>6.3 - Finalizando:</b>
              Entre em contato com o usuário ao qual você atribuiu o processo informadno o número do processo para que ele possa dar andamento.
            </div>
            <hr />

            <h4>7. Conclusão</h4>
            <p>
              Estes são os procedimentos mais simples para iniciar um processo, criar e anexar um documento no mesmo.
              Caso precise somente incluir um documento em um processo já existente, siga os passos 4 ou 5, de acordo com a necessidade.
              Novamente, recomendo a leitura dos manuais e a realização do curso para melhor entendimento.
              Se forem encontrados erros ou divergências, por favor, entre em contato para que sejam sanados.
            </p>

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
