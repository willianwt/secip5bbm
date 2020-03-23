import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import history from '../../services/history';


export default function Header() {
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  async function Logout() {
    try {
      await api.post('/users/logout');
      sessionStorage.clear();
      dispatch({
        type: 'LOGIN_STATUS',
      });
      toast.info('Até mais!');
      history.push('/login');
    } catch (error) {
      toast.error('Ocorreu um erro. Tente novamente.');
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark stick-top">
      <Link className="navbar-brand" to="/">SECIP 5º BBM</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Escaninho</Link>
          </li>
          <li className="nav-item">
            {isLogged ? <Link className="nav-link" to="/perfil">Meu Perfil</Link> : ''}
          </li>
          <li className="nav-item">
            {isLogged ? <Link className="nav-link" to="/usuarios">Usuários</Link> : ''}
          </li>
        </ul>
        {isLogged ? <button type="submit" onClick={Logout} className="btn btn-outline-danger my-2 my-sm-0">Sair</button>
          : <Link className="btn btn-outline-success my-2 my-sm-0" to="/login">Login</Link>}
      </div>
    </nav>
  );
}
