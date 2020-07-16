import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
//   const isLogged = useSelector((state) => state.isLogged);
  //   const dispatch = useDispatch();

  //   async function Logout() {
  //     try {
  //       await api.post('/users/logout');
  //       sessionStorage.clear();
  //       dispatch({
  //         type: 'LOGIN_STATUS',
  //       });
  //       toast.info('Até mais!');
  //       history.push('/login');
  //     } catch (error) {
  //       toast.error('Ocorreu um erro. Tente novamente.');
  //     }
  //   }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <Link className="navbar-brand" to="/">SECIP 5º BBM</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="dropdown show">
            <button className="btn btn-info dropdown-toggle m-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Tutoriais
            </button>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a className="dropdown-item" href="https://drive.google.com/file/d/1ndzXTXwxThzyURXyBbQIar9wiFK4skLW/view" target="_blank" rel="noopener noreferrer">Cadastrar Protocolo</a>
              <a className="dropdown-item" href="https://drive.google.com/file/d/1WbB94oYSnJVnjf2NoQzUcHqEaA94s3kr/view" target="_blank" rel="noopener noreferrer">Anexar Documentos</a>
              <a className="dropdown-item" href="https://drive.google.com/file/d/1f1Qt9cPjJMEnuIeTETAJ1ihqMP-Ei42k/view" target="_blank" rel="noopener noreferrer">Gerar Taxa</a>
              <a className="dropdown-item" href="https://drive.google.com/file/d/1BO4P91pBP4oHbFtSEjcpAAKIN-B3oHT1/view" target="_blank" rel="noopener noreferrer">Solicitar Retorno</a>
              <a className="dropdown-item" href="https://www.bombeiros.go.gov.br/wp-content/uploads/2020/06/NT-01_2020-Procedimentos-Administrativos-ANEXO-G.pdf" target="_blank" rel="noopener noreferrer">Anexo G</a>
            </div>
          </li>
          <li className="dropdown show">
            <button className="btn btn-secondary dropdown-toggle m-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dicas
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <Link className="dropdown-item" to="/sei">SEI</Link>
              <Link className="dropdown-item" to="/conferenciadedocumentos">Conferência de Documentos no Siapi</Link>
            </div>
          </li>
          {/* Removido a pedido do CMT Bráulio}
          <li className="nav-item">
            <Link className="btn btn-success m-1" to="/instagram">Instagram</Link>
          </li>
          { */}
          <li className="nav-item">
            <Link className="btn btn-outline-warning m-1" to="/nt012020">NT 01/2020</Link>
          </li>
          {/* <li className="nav-item">
            {isLogged ? <Link className="nav-link" to="/escaninho">Escaninho</Link> : ''}
          </li>
          <li className="nav-item">
            {isLogged ? <Link className="nav-link" to="/perfil">Meu Perfil</Link> : ''}
          </li>
          <li className="nav-item">
            {isLogged ? <Link className="nav-link" to="/usuarios">Usuários</Link> : ''}
          </li> */}
        </ul>
        {/* }
        {isLogged ? <button type="submit" onClick={Logout} className="btn btn-outline-danger my-2 my-sm-0">Sair</button>
          : <Link className="btn btn-outline-success my-2 my-sm-0" to="/login">Login</Link>}
        { */}
      </div>
    </nav>
  );
}
