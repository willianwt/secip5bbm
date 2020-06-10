import React, { useState } from 'react';
import dateformat from 'dateformat';
import { toast } from 'react-toastify';

import './style.css';


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
  const [iconeAtendido, setIconeAtendido] = useState(String.fromCodePoint(128100));
  const [atendido, setAtendido] = useState('');
  const [atendidos, setAtendidos] = useState([]);
  const [iconeMilitar, setIconeMilitar] = useState(String.fromCodePoint(128104, 8205, 128658));
  const [militar, setMilitar] = useState('');
  const [militares, setMilitares] = useState([]);
  const [cobista, setCobista] = useState('');
  const [iconeApoio, setIconeApoio] = useState(String.fromCodePoint(128658));
  const [apoiadores, setApoiadores] = useState([]);
  const [apoio, setApoio] = useState('');
  const [hashtags, setHashtags] = useState('#5ºBatalhão #CorpoDeBombeirosMilitar #VidaPorVidas #Bombeiros #Resgate #EMS #Acidente #FireRescue #Trânsito #Firefighter #Salvamento #Operações #Incêndio #DefesaCivil #FireDept #Firemen #CoisaDeBombeiro #Militar #Luziânia #Valparaíso #NovoGama #CidadeOcidental #EntornoSul #Goiás #CBMGO #Operacionais #BombeirosLuziânia');

  function addAtendido() {
    setAtendidos([...atendidos, `${iconeAtendido} ${atendido}`]);
    setAtendido('');
  }

  function removeAtendido(e, index) {
    const novosAtendidos = [...atendidos];
    novosAtendidos.splice(index, 1);
    setAtendidos(novosAtendidos);
  }

  function addMilitar() {
    console.log(cobista);
    if (cobista) {
      setMilitares([...militares, `${iconeMilitar} ${militar} ${String.fromCodePoint(128276)}`]);
    } else {
      setMilitares([...militares, `${iconeMilitar} ${militar}`]);
    }
    setMilitar('');
    setCobista(false);
  }
  function removeMilitar(e, index) {
    const novosMilitares = [...militares];
    novosMilitares.splice(index, 1);
    setMilitares(novosMilitares);
  }

  function addApoio() {
    setApoiadores([...apoiadores, `${iconeApoio} ${apoio}`]);
    setApoio('');
  }
  function removeApoio(e, index) {
    const novosApoiadores = [...apoiadores];
    novosApoiadores.splice(index, 1);
    setApoiadores(novosApoiadores);
  }

  function changeCobistaStatus(e) {
    setCobista(e);
    console.log(e);
  }

  function CopyToClipboard(containerid) {
    // Create a new textarea element and give it id='temp_element'
    const textarea = document.createElement('textarea');
    textarea.id = 'temp_element';
    // Optional step to make less noise on the page, if any!
    textarea.style.height = 0;
    // Now append it to your page somewhere, I chose <body>
    document.body.appendChild(textarea);
    // Give our textarea a value of whatever inside the div of id=containerid
    textarea.value = document.getElementById(containerid).innerText;
    // Now copy whatever inside the textarea to clipboard
    const selector = document.querySelector('#temp_element');
    selector.select();
    document.execCommand('copy');
    // Remove the textarea
    document.body.removeChild(textarea);
    toast.success('Resultado Copiado!');
  }
  return (
    <div className="row">
      <div className="col-md-6">
        <h2 className="col-6__titulo">Formatador Para Instagram</h2>
        <form className="main-esquerdo">

          <div className="main-esquerdo-informações">
            <label className="main-esquedo-informações-titulo" htmlFor="titulo">
              Natureza
            </label>
            <input
              className="main-esquedo-informações-titulo-input"
              type="text"
              name="titulo"
              id="titulo"
              onChange={(e) => setTitulo(e.target.value)}
            />

          </div>
          <div className="main-esquerdo-informações">
            <label className="main-esquedo-informações-data" htmlFor="data">
              Data
            </label>
            <input className="main-esquedo-informações-data-numero" type="date" name="data" id="data" max="2999-12-31" value={data} onChange={(e) => setData(e.target.value)} />
            <input className="main-esquedo-informações-data-hora" type="time" name="hora" id="hora" value={hora} onChange={(e) => setHora(e.target.value)} />
          </div>
          <div className="main-esquerdo-informações">
            <label className="main-esquedo-informações-localizacao" htmlFor="localizacao">
              Localização
            </label>
            <input className="main-esquedo-informações-localizacao-input" type="text" name="localizacao" id="localizacao" onChange={(e) => setLocalizacao(e.target.value)} />
          </div>
          <div className="atendidos">
            <h4 className="col-6__subtitulo">Atendidos:</h4>
            <label className="label" htmlFor="atendidos">
              <select
                className="custom-select atendidos-select"
                name="atendidos"
                id="atendidos"
                onChange={(e) => setIconeAtendido(e.target.value)}
              >
                <optgroup className="vitimas" label="Vitimas">
                  <option value={String.fromCodePoint(128100)}>
                    {String.fromCodePoint(128100)}
                    {' '}
                    Uma Vitima
                  </option>
                  <option value={String.fromCodePoint(128101)}>
                    {String.fromCodePoint(128101)}
                    {' '}
                    Várias Vítimas

                  </option>
                  <option value={String.fromCodePoint(10013)}>
                    {String.fromCodePoint(10013)}
                    {' '}
                    Óbito
                  </option>
                </optgroup>
                <optgroup label="Ações">
                  <option value={String.fromCodePoint(128166)}>
                    {String.fromCodePoint(128166)}
                    {' '}
                    Incêndio
                  </option>
                  <option value={String.fromCodePoint(9888)}>
                    {String.fromCodePoint(9888)}
                    {' '}
                    Defesa Civil
                  </option>
                  <option value={String.fromCodePoint(9989)}>
                    {String.fromCodePoint(9989)}
                    {' '}
                    Missões Diversas

                  </option>
                </optgroup>
                <optgroup label="Animais">
                  <option value={String.fromCodePoint(128021)}>
                    {String.fromCodePoint(128021)}
                    {' '}
                    Cachorro
                  </option>
                  <option value={String.fromCodePoint(128008)}>
                    {String.fromCodePoint(128008)}
                    {' '}
                    Gato
                  </option>
                  <option value={String.fromCodePoint(128014)}>
                    {String.fromCodePoint(128014)}
                    {' '}
                    Cavalo
                  </option>
                  <option value={String.fromCodePoint(128002)}>
                    {String.fromCodePoint(128002)}
                    {' '}
                    Gado
                  </option>
                  <option value={String.fromCodePoint(128013)}>
                    {String.fromCodePoint(128013)}
                    {' '}
                    Cobra
                  </option>
                  <option value={String.fromCodePoint(128029)}>
                    {String.fromCodePoint(128029)}
                    {' '}
                    Abelha
                  </option>
                  <option value={String.fromCodePoint(129413)}>
                    {String.fromCodePoint(129413)}
                    {' '}
                    Aves
                  </option>
                  <option value={String.fromCodePoint(128028)}>
                    {String.fromCodePoint(128028)}
                    {' '}
                    Insetos
                  </option>
                  <option value={String.fromCodePoint(128000)}>
                    {String.fromCodePoint(128000)}
                    {' '}
                    Roedor
                  </option>
                  <option value={String.fromCodePoint(129422)}>
                    {String.fromCodePoint(129422)}
                    {' '}
                    Réptil
                  </option>
                  <option value={String.fromCodePoint(128062)}>
                    {String.fromCodePoint(128062)}
                    {' '}
                    Animais Diversos
                  </option>
                </optgroup>
              </select>
              <input
                className="input-atendidos"
                type="text"
                name="atendidos"
                id="atendidos"
                onChange={(e) => setAtendido(e.target.value)}
                value={atendido}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value !== '') {
                    addAtendido();
                  }
                }}
              />
              <button
                className="vitima-button"
                type="button"
                onClick={() => {
                  if (atendido !== '') { addAtendido(); }
                }}
              >
                Adicionar
              </button>
            </label>
            <p className="lista">
              {atendidos.map((val, index) => (
                <li
                  key={index}
                >
                  {val}
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={(e) => removeAtendido(e, index)}
                  >
                    X
                  </button>
                </li>
              ))}

            </p>
          </div>
          <div>

            <label htmlFor="militares" className="label">
              <h4 className="col-6__subtitulo">Militares:</h4>
              <select
                className="custom-select select-militares"
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
                id="input-militares"
                type="text"
                name="militares"
                className="input-militares"
                onChange={(e) => setMilitar(e.target.value)}
                value={militar}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value !== '') {
                    addMilitar();
                  }
                }}
              />
              <label className="form-check-label ml-4" htmlFor="cobista">
                <input className="form-check-input" checked={!!cobista} type="checkbox" onChange={(e) => changeCobistaStatus(e.target.checked)} />
                {String.fromCodePoint(128276)}
              </label>
              <button
                className="button-militares"
                type="button"
                onClick={() => {
                  if (militar !== '') { addMilitar(); }
                }}
              >
                Adicionar
              </button>
            </label>
            <p className="lista">
              {militares.map((val, index) => (
                <li
                  key={index}
                >
                  {val}
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={(e) => removeMilitar(e, index)}
                  >
                    X
                  </button>
                </li>
              ))}

            </p>
          </div>
          <div>

            <label htmlFor="apoio" className="label">
              <h4 className="col-6__subtitulo">Apoio:</h4>
              <select
                className="custom-select select-apoio"
                name="iconeApoio"
                id="iconeApoio"
                onChange={(e) => setIconeApoio(e.target.value)}
                defaultValue={String.fromCodePoint(128658)}
              >
                <option value={String.fromCodePoint(128658)}>
                  {String.fromCodePoint(128658)}
                  {' '}
                  CBM
                </option>
                <option value={String.fromCodePoint(128657)}>
                  {String.fromCodePoint(128657)}
                  {' '}
                  Ambulância
                </option>
                <option value={String.fromCodePoint(128659)}>
                  {String.fromCodePoint(128659)}
                  {' '}
                  Polícia
                </option>
                <option value={String.fromCodePoint(128641)}>
                  {String.fromCodePoint(128641)}
                  {' '}
                  Helicóptero
                </option>
                <option value={String.fromCodePoint(128663)}>
                  {String.fromCodePoint(128663)}
                  {' '}
                  Outros
                </option>
              </select>
              <input
                className="input-apoio"
                type="text"
                name="apoio"
                placeholder="CBMGO já adicionado"
                onChange={(e) => setApoio(e.target.value)}
                value={apoio}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value !== '') {
                    addApoio();
                  }
                }}
              />
              <button
                className="button-apoio"
                type="button"
                name="btnApoio"
                onClick={() => {
                  if (apoio !== '') { addApoio(); }
                }}
              >
                Adicionar

              </button>
            </label>
            <p className="lista">
              {apoiadores.map((val, index) => (
                <li
                  key={index}
                >
                  {val}
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={(e) => removeApoio(e, index)}
                  >
                    X
                  </button>
                </li>
              ))}

            </p>
          </div>
          <div>
            <h3 className="col-6__subtitulo_hashtags">Hashtags:</h3>
            <textarea
              className="textarea-hashtags"
              name=""
              id=""
              cols="30"
              rows="6"
              onChange={(e) => setHashtags(e.target.value)}
              value={hashtags}

            />
          </div>
        </form>
      </div>
      <div className="col-md-6">
        <h2 className="resultado">
          Resultado:
        </h2>


        <div id="resultado" className="texto_resultado">
          <div>
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
          <div>.</div>
          <div>
            {atendidos.map((val, index) => (
              <div
                key={index}
              >
                {val}
              </div>
            ))}
          </div>
          <div>.</div>
          <div>
            {militares.map((val, index) => (
              <div
                key={index}
              >
                {val}
              </div>
            ))}
          </div>
          <div>.</div>
          <div>
            {String.fromCodePoint(128658)}
            {' #Bombeiros193'}
            {apoiadores.map((val, index) => (
              <div
                key={index}
              >
                {val}
              </div>
            ))}
          </div>
          <div>.</div>
          <div>{hashtags}</div>
        </div>
        <div className="caixa-copiar"><button className="button-copiar" type="button" onClick={(e) => CopyToClipboard('resultado')}>COPIAR</button></div>

      </div>


    </div>
  );
}
