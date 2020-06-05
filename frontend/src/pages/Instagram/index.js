import React, { useEffect, useState } from 'react';
import dateformat from 'dateformat';

export default function Instagram() {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState(dateformat(new Date(), 'yyyy-mm-dd'));
  const novaData = data.split('-');
  const [localizacao, setLocalizacao] = useState('');
  const mes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const date = new Date();
  // eslint-disable-next-line no-extend-native
  Date.prototype.timeToInput = function () {
    return `${(`0${this.getHours()}`).substr(-2, 2)}:${(`0${this.getMinutes()}`).substr(-2, 2)}`;
  };
  const [hora, setHora] = useState(date.timeToInput());
  const novaHora = hora.split(':');
  const [iconeMilitar, setIconeMilitar] = useState(String.fromCodePoint(128104, 8205, 128658));
  const [militar, setMilitar] = useState('');
  const [militares, setMilitares] = useState([]);


  function addMilitares() {
    setMilitares([...militares, `${iconeMilitar} ${militar}`]);
    setMilitar('');
  }

  return (
    <div className="row">
      <div className="col-6">
        <h2>Formatador Para Instagram</h2>
        <form>
          <div>
            <label htmlFor="titulo">
              Natureza
              <input
                type="text"
                name="titulo"
                id="titulo"
                onChange={(e) => setTitulo(e.target.value)}
              />

            </label>
          </div>
          <div>
            <label htmlFor="data">
              Data
              <input type="date" name="data" id="data" max="2999-12-31" value={data} onChange={(e) => setData(e.target.value)} />
              <input type="time" name="hora" id="hora" value={hora} onChange={(e) => setHora(e.target.value)} />
            </label>
          </div>
          <div>
            <label htmlFor="localizacao">
              Localização
              <input type="text" name="localizacao" id="localizacao" onChange={(e) => setLocalizacao(e.target.value)} />
            </label>
          </div>
          <div>
            <label htmlFor="atendidos">
              Atendidos
              <input type="text" name="atendidos" id="atendidos" />
            </label>
          </div>
          <div>

            <label htmlFor="militares">
              <h4>Militares</h4>
              <select
                name="iconeMilitares"
                id="iconeMilitares"
                onChange={(e) => setIconeMilitar(e.target.value)}
                defaultValue={String.fromCodePoint(128104, 8205, 128658)}
              >
                <option value={String.fromCodePoint(128104, 8205, 128658)}>
                  {String.fromCodePoint(128104, 8205, 128658)}
                  {' '}
                  Homem
                </option>
                <option value={String.fromCodePoint(128105, 8205, 128658)}>
                  {String.fromCodePoint(128105, 8205, 128658)}
                  {' '}
                  Mulher
                </option>
              </select>
              <input
                type="text"
                name="militares"
                className="militares"
                onChange={(e) => setMilitar(e.target.value)}
                value={militar}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value !== '') {
                    addMilitares();
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (militar !== '') { addMilitares(); }
                }}
              >
                Adicionar

              </button>
            </label>
            <p>
              {militares.map((val, index) => (
                <li
                  key={index}
                >
                  {val}
                  <button
                    type="button"
                    className="btn btn-small btn-warning"
                    onClick={(e) => { militares.splice(index, 1); console.log(militares); }}


                  >
                    X

                  </button>
                </li>
              ))}

            </p>
          </div>
          <div>

            <label htmlFor="apoio">
              <h4>Apoio</h4>
              <input type="text" name="apoio" />
              <button type="button">Adicionar</button>

            </label>
          </div>
          <div>
            <h3>Hashtags</h3>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              defaultValue="#5ºBatalhão #CorpoDeBombeirosMilitar #VidaPorVidas #Bombeiros
            #Resgate #EMS #Acidente #FireRescue #Trânsito #Firefighte
            #Salvamento #Operações #Incêndio #DefesaCivil #FireDept
            #Firemen #CoisaDeBombeiro #Militar #Luziânia #Valparaíso
            #NovoGama #CidadeOcidental #EntornoSul #Goiás #CBMGO
            #Operacionais #BombeirosLuziânia"
            />
          </div>
        </form>
      </div>
      <div className="col-6">
        <h3>
          <p>
            {String.fromCodePoint(128104, 8205, 128658)}
            {String.fromCodePoint(128105, 8205, 128658)}
          </p>
          {' '}
          Resultado:
        </h3>

        <div>
          <div className="tituloFormatado">
            {String.fromCharCode(55357, 57000)}
            {' '}
            {titulo.toUpperCase()}
          </div>
          <div>.</div>
          <div>
            {String.fromCharCode(9200)}
            {' '}
            {novaData[2]}
            {' '}
            {novaHora[0]}
            h
            {novaHora[1]}
            {' '}
            {mes[(parseInt(novaData[1], 10) - 1)]}
            {' '}
            {novaData[0]}
          </div>
          <div>.</div>
          <div>
            {String.fromCharCode(55357, 56525)}
            {' '}
            {localizacao}
          </div>
        </div>
      </div>


    </div>
  );
}
