import React from 'react';
import './style.css';

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <nav className="footer navbar-dark bg-dark fixed-bottom text-right mt-2 navbar-background">
      <a className="text-muted foot" style={{ fontSize: '0.9em' }} target="_blank" rel="noreferrer" href="https://www.github.com/willianwt">Desenvolvido por Cabo Willian Taiguara</a>

    </nav>
  );
}
