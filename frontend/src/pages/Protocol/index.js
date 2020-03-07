/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import dateformat from 'dateformat';

import api from '../../services/api';


export default function Protocol() {
  const [protocolo, setProtocolo] = useState('');
  const [mei, setMei] = useState('nao');
  const [area, setArea] = useState('');
  const [tipo, setTipo] = useState('');
  const [bairro, setBairro] = useState('');
  const [situacao, setSituacao] = useState('');
  const [data, setData] = useState(dateformat(new Date(), 'yyyy-mm-dd'));
  const [vistoria, setVistoria] = useState('');
  const [divisao, setDivisao] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [tax, setTax] = useState('');
  const user = JSON.parse(sessionStorage.secip);

  useEffect(() => {
    function calculateTax(valor) {
      if (mei === 'sim' || area === '0.00' || area === '') {
        setTax('0.00');
      } else {
        if (parseFloat(valor) <= 100) {
          setTax('118.71');
        } else {
          setTax((((parseFloat(valor) - 100) * 0.17) + 118.71).toFixed(2));
        }
      }
    }
    calculateTax(area);
  }, [mei, area]);

  function formatProtocol(valor) {
    valor += '';
    valor = parseInt(valor.replace(/[\D]+/g, ''), 10);
    valor += '';
    valor = valor.replace(/([0-9]{2})$/g, '/$1');

    return valor;
  }

  async function handleAddProtocol(e) {
    e.preventDefault();

    const response = await api.post('/protocol/createProtocol', {
      protocol: protocolo,
      area,
      type: tipo,
      district: bairro,
      situation: situacao,
      date: data,
      inspection: vistoria,
      division: divisao,
      isention: mei,
      observations: observacoes,
      tax,
    });

    console.log(response.data);
  }
  return (
    <div className="container">
      <h1 className="text-center mb-3">Protocolo</h1>
      <form onSubmit={handleAddProtocol} autoComplete="off">
        <div className="form-row">
          <div className="col-md-3 mb-3">
            <label htmlFor="protocolo">Protocolo</label>
            <NumberFormat
              format={formatProtocol}
              maxLength="9"
              allowNegative="false"
              className="form-control"
              placeholder="Protocolo"
              name="protocolo"
              id="protocolo"
              value={protocolo}
              onChange={(e) => setProtocolo(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="area">Área</label>
            <NumberFormat
              decimalScale="2"
              fixedDecimalScale="true"
              allowNegative="false"
              type="text"
              className="form-control"
              placeholder="Área (m²)"
              name="area"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />

          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="tipo">Tipo</label>
            <select className="custom-select" id="tipo" name="tipo" onChange={(e) => setTipo(e.target.value)} required>
              <option value="" defaultValue>Escolha o tipo</option>
              <option value="funcionamento">Funcionamento</option>
              <option value="previa">Cert. Prévia</option>
              <option value="habitese">Habite-se</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="bairro">Bairro</label>
            <div className="input-group">
              <select className="custom-select" id="bairro" name="bairro" onChange={(e) => setBairro(e.target.value)} required>
                <option value="">Selecione o Bairro</option>
                <option value="Centro">Centro</option>
                <option value="Rosário">Rosário</option>
                <option value="Fumal">Fumal</option>
                <option value="Santa Luzia">Santa Luzia</option>
                <option value="São Caetano">São Caetano</option>
                <option value="Setor Leste">Setor Leste</option>
                <option value="PED">PED</option>
                <option value="PED I">PED I</option>
                <option value="PED II">PED II</option>
                <option value="PED III">PED III</option>
                <option value="PED IV">PED IV</option>
                <option value="PED V">PED V</option>
                <option value="PED VI">PED VI</option>
                <option value="PED VII">PED VII</option>
                <option value="PED VIII">PED VIII</option>
                <option value="Vila Juracy">Vila Juracy</option>
                <option value="Jofre Parada">Jofre Parada</option>
                <option value="Kennedy">Kennedy</option>
                <option value="St Norte">St Norte</option>
                <option value="St Norte Maravilha">St Norte Maravilha</option>
                <option value="St Serrinha">St Serrinha</option>
                <option value="Vila São José">Vila São José</option>
                <option value="Vila Portuguesa">Vila Portuguesa</option>
                <option value="Parque Alvorada">Parque Alvorada</option>
                <option value="Jardim São Paulo">Jardim São Paulo</option>
                <option value="Parque JK">Parque JK</option>
                <option value="Setor Aeroporto">Setor Aeroporto</option>
                <option value="Viegas">Viegas</option>
                <option value="Diogo Machado">Diogo Machado</option>
                <option value="Parque Santa Fé">Parque Santa Fé</option>
                <option value="Mandu II">Mandu II</option>
                <option value="Luzília">Luzília</option>
                <option value="Vila Guará">Vila Guará</option>
                <option value="SHIS">SHIS</option>
                <option value="Jardim Cerejeira">Jardim Cerejeira</option>
                <option value="Vila Roriz">Vila Roriz</option>
                <option value="Parque da Inspiração">Parque da Inspiração</option>
                <option value="Jardim Sion">Jardim Sion</option>
                <option value="Brasília Sul">Brasília Sul</option>
                <option value="Alto das Caraíbas">Alto das Caraíbas</option>
                <option value="Parque da Saudade">Parque da Saudade</option>
                <option value="Jardim Bandeirantes">Jardim Bandeirantes</option>
                <option value="Mansões de Recreio">Mansões de Recreio</option>
                <option value="Parque São Judas Tadeu">Parque São Judas Tadeu</option>
                <option value="Vila Esperança">Vila Esperança</option>
                <option value="Maniratuba">Maniratuba</option>
                <option value="Parque 3 Poderes">Parque 3 Poderes</option>
                <option value="Americanos">Americanos</option>
                <option value="Zona Rural">Zona Rural</option>
                <option value="" disabled>BAIRROS DO JD INGÁ</option>
                <option value="Jardim do Ingá">Jardim do Ingá</option>
                <option value="Zuleika - Ingá">Zuleika - Ingá</option>
                <option value="Jockey Clube - Ingá">Jockey Clube - Ingá</option>
                <option value="Mingone I - Ingá">Mingone I - Ingá</option>
                <option value="Mingone II - Ingá">Mingone II - Ingá</option>
                <option value="Sol Nascente - Ingá">Sol Nascente - Ingá</option>
                <option value="PED VIII Ingá - Ingá">PED VIII Ingá - Ingá</option>
                <option value="PED IX - Ingá">PED IX - Ingá</option>
                <option value="PED X - Ingá">PED X - Ingá</option>
                <option value="Osfaya - Ingá">Osfaya - Ingá</option>
                <option value="Cidade Industrial - Ingá">Cidade Industrial - Ingá</option>
                <option value="Chácara Vera Cruz - Ingá">Chácara Vera Cruz - Ingá</option>
                <option value="Chácara Marajoara - Ingá">Chácara Marajoara - Ingá</option>
                <option value="Francaroli - Ingá">Francaroli - Ingá</option>
                <option value="Jd América - Ingá">Jd América - Ingá</option>
                <option value="Jd Europa - Ingá">Jd Europa - Ingá</option>
                <option value="Jd Flamboyant - Ingá">Jd Flamboyant - Ingá</option>
                <option value="Jd Marília - Ingá">Jd Marília - Ingá</option>
                <option value="Jd Planalto - Ingá">Jd Planalto - Ingá</option>
                <option value="Pq Umuarama - Ingá">Pq Umuarama - Ingá</option>
                <option value="Parque Faro - Ingá">Parque Faro - Ingá</option>
                <option value="Pq Cruzeiro do Sul - Ingá">Pq Cruzeiro do Sul - Ingá</option>
                <option value="Santa Edwirgens - Ingá">Santa Edwirgens - Ingá</option>
                <option value="Zona Rural - Ingá">Zona Rural - Ingá</option>
                <option value="Bairro Não Identificado">Bairro Não Identificado</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-3 mb-3">
            <label htmlFor="situacao">Situação Atual</label>
            <select className="custom-select" id="situacao" name="situacao" onChange={(e) => setSituacao(e.target.value)} required>
              <option value="" defaultValue>Escolha a situação</option>
              <option value="urgente">1 - Urgente</option>
              <option value="retorno">2 - Solic. retorno</option>
              <option value="entrada">3 - Entrada</option>
              <option value="renovacao">4 - Renovação</option>
              <option value="proativa">5 - Proativa</option>
              <option value="exigencia">6 - Com Exigências</option>
              <option value="aprovada">7 - Aprovada</option>
              <option value="distribuida">8 - Distribuida</option>
              <option value="incorreto">9 - Prot. Incorreto</option>
              <option value="extinto">10 - Fechado Defnitivo</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="data">Data</label>
            <input type="date" className="form-control" name="data" id="data" value={data} onChange={(e) => setData(e.target.value)} required />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="vistoria">Vistoria</label>
            <select className="custom-select" id="vistoria" name="vistoria" onChange={(e) => setVistoria(e.target.value)} required>
              <option value="pendente">Pendente</option>
              <option value="1exigencia">1ª Exigência</option>
              <option value="2exigencia">2ª Exigência</option>
              <option value="3exigencia">3ª Exigência</option>
              <option value="aprovado">Aprovado</option>
              <option value="documentacao">Conf. Documentação</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="divisao">Divisão</label>
            <select className="form-control" name="divisao" id="divisao" onChange={(e) => setDivisao(e.target.value)} required>
              <option value="" defaultValue>Divisão</option>
              <option value="A-1">A-1</option>
              <option value="A-2">A-2</option>
              <option value="A-3">A-3</option>
              <option value="B-1">B-1</option>
              <option value="B-2">B-2</option>
              <option value="C-1">C-1</option>
              <option value="C-2">C-2</option>
              <option value="C-3">C-3</option>
              <option value="D-1">D-1</option>
              <option value="D-2">D-2</option>
              <option value="D-3">D-3</option>
              <option value="D-4">D-4</option>
              <option value="E-1">E-1</option>
              <option value="E-2">E-2</option>
              <option value="E-3">E-3</option>
              <option value="E-4">E-4</option>
              <option value="E-5">E-5</option>
              <option value="E-6">E-6</option>
              <option value="F-1">F-1</option>
              <option value="F-2">F-2</option>
              <option value="F-3">F-3</option>
              <option value="F-4">F-4</option>
              <option value="F-5">F-5</option>
              <option value="F-6">F-6</option>
              <option value="F-7">F-7</option>
              <option value="F-8">F-8</option>
              <option value="F-9">F-9</option>
              <option value="F-10">F-10</option>
              <option value="G-1">G-1</option>
              <option value="G-2">G-2</option>
              <option value="G-3">G-3</option>
              <option value="G-4">G-4</option>
              <option value="G-5">G-5</option>
              <option value="G-6">G-6</option>
              <option value="H-1">H-1</option>
              <option value="H-2">H-2</option>
              <option value="H-3">H-3</option>
              <option value="H-4">H-4</option>
              <option value="H-5">H-5</option>
              <option value="H-6">H-6</option>
              <option value="I-1">I-1</option>
              <option value="I-2">I-2</option>
              <option value="I-3">I-3</option>
              <option value="J-1">J-1</option>
              <option value="J-2">J-2</option>
              <option value="J-3">J-3</option>
              <option value="J-4">J-4</option>
              <option value="L-1">L-1</option>
              <option value="L-2">L-2</option>
              <option value="L-3">L-3</option>
              <option value="M-1">M-1</option>
              <option value="M-2">M-2</option>
              <option value="M-3">M-3</option>
              <option value="M-4">M-4</option>
              <option value="M-5">M-5</option>
              <option value="M-6">M-6</option>
              <option value="M-7">M-7</option>
              <option value="M-8">M-8</option>
              <option value="M-9">M-9</option>
              <option value="M-10">M-10</option>
              <option value="N-1">N-1</option>
              <option value="N-2">N-2</option>
              <option value="N-3">N-3</option>
            </select>
          </div>
        </div>
        <div className="px-0 form-inline">
          <div className="offset-md-3 col-md-3 px-0 form-inline">
            <label className="form-check-label mb-2" htmlFor="mei"><b>MEI / ISENTO?</b></label>
            <select className="form-control mx-2 mb-2" id="mei" name="mei" onChange={(e) => { setMei(e.target.value); }}>
              <option value="nao" defaultValue>NÃO</option>
              <option value="sim">SIM</option>
            </select>
          </div>
          <div className="col-md-3 pl-0 form-inline">
            <label className="form-check-label mb-2" htmlFor="tax"><b>TAXA</b></label>
            <NumberFormat
              decimalScale="2"
              fixedDecimalScale="true"
              allowNegative="false"
              type="text"
              className="form-control mx-2 mb-2"
              name="tax"
              id="tax"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              required
            />
          </div>


        </div>

        <div className="form-row">
          <div className="col-md-12 mb-3">
            <textarea type="textarea" className="form-control" placeholder="Observações" name="observacoes" id="observacoes" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} rows="3" />
          </div>
        </div>
        <input type="hidden" name="cidade" id="cidade" value="luziania" />
        <br />
        <div className="modal-footer">
          <Link to="/" className="btn btn-secondary">Cancelar</Link>
          <button className="btn btn-success" type="submit">Enviar</button>
        </div>

      </form>

    </div>

  );
}
