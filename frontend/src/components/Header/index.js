import React from 'react';
import { FaHome } from 'react-icons/fa';


export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark stick-top">
      <a className="navbar-brand" href="/">SECIP 5º BBM</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/index.php">Escaninho</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/escala.php">Escala</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/perfil.php">Meu Perfil</a>

          </li>
          <li className="nav-item">
            <a className="nav-link" href="/usuarios/usuarios.php">Usuarios</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/relatorio.php">Relatórios</a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <div className="text-white"> Seja bem vindo, Willian!</div>
          <button className="btn btn-outline-success my-2 my-sm-0 mx-1" type="button">SAIR</button>
        </form>
      </div>
    </nav>
  );
}
