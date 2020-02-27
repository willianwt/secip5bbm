import React from 'react';
// import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark stick-top">
      <Link className="navbar-brand" to="/">SECIP 5º BBM</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/escaninho">Escaninho</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
