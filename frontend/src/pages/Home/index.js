import React from 'react';

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 my-5">
          <div className="container-fluid">
            <h1 className="text-center">
                    Escaninho
              <br />
              {' '}
                    Luziânia
            </h1>
            <button type="button" className="btn btn-block btn-primary my-1" data-toggle="modal" data-target="#addnew">Adicionar </button>
          </div>
          <div className="container-fluid">
            <input type="text" id="busca_escaninho" placeholder="Busca" className="form-control my-1" />
          </div>
          <div id="solicitarMaterial" className="container-fluid">
            <button type="button" className="btn btn-block btn-info" data-toggle="modal" data-target="#modalMaterial">
                        Solicitar Material
            </button>
          </div>
          <div id="escolheCidade" className="container-fluid">
            <a className="btn btn-block btn-warning" href="escolheCidade.php">Trocar Cidade</a>
          </div>
        </div>
      </div>
    </div>
  );
}
