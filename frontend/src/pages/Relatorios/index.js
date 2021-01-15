import React, { useState, useEffect } from "react";
import dateformat from "dateformat";
import { toast } from "react-toastify";
import {
    Form,
    Button,
    FormGroup,
    Row,
    Col,
    Tabs,
    Tab,
    InputGroup,
    FormControl,
    ListGroup,
} from "react-bootstrap";
import { VariableSizeList } from "react-window";
import "lodash";

import "./style.css";
import Instagram from "../Instagram";

function CopyToClipboard(containerid) {
    // Create a new textarea element and give it id='temp_element'
    const textarea = document.createElement("textarea");
    textarea.id = "temp_element";
    // Optional step to make less noise on the page, if any!
    textarea.style.height = 0;
    // Now append it to your page somewhere, I chose <body>
    document.body.appendChild(textarea);
    // Give our textarea a value of whatever inside the div of id=containerid
    textarea.value = document.getElementById(containerid).innerText;
    // Now copy whatever inside the textarea to clipboard
    const selector = document.querySelector("#temp_element");
    selector.select();
    document.execCommand("copy");
    // Remove the textarea
    document.body.removeChild(textarea);
    toast.success("Resultado Copiado!");
}

export default function Relatorios() {
    const [titulo, setTitulo] = useState("");
    const [data, setData] = useState(dateformat(new Date(), "yyyy-mm-dd"));
    const novaData = data.split("-");
    const [localizacao, setLocalizacao] = useState("");
    const mes = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
    ];
    const date = new Date();
    // eslint-disable-next-line no-extend-native
    Date.prototype.timeToInput = function () {
        return `${`0${this.getHours()}`.substr(
            -2,
            2
        )}:${`0${this.getMinutes()}`.substr(-2, 2)}`;
    };
    const [hora, setHora] = useState(date.timeToInput());
    const novaHora = hora.split(":");
    const [iconeAtendido, setIconeAtendido] = useState("");
    const [atendido, setAtendido] = useState("");
    const [atendidos, setAtendidos] = useState([]);
    const [vtrMilitar, setVtrMilitar] = useState("");
    const [militar, setMilitar] = useState("");
    const [militares, setMilitares] = useState([]);
    const [grupoMilitares, setGrupoMilitares] = useState([]);
    const [cobista, setCobista] = useState("");
    const [nomeCobista, setNomeCobista] = useState("");
    const [iconeApoio, setIconeApoio] = useState("");
    const [apoiadores, setApoiadores] = useState([]);
    const [grupoApoiadores, setGrupoApoiadores] = useState([]);
    const [vtrApoio, setVtrApoio] = useState("");
    const [apoio, setApoio] = useState("");
    const [infoCob, setInfoCob] = useState("");
    const [tempoResposta, setTempoResposta] = useState("");
    const [tipo, setTipo] = useState([]);
    const [incendio, setIncendio] = useState(Boolean);
    const [veiculo, setVeiculo] = useState("");
    const [veiculosEnvolvidos, setVeiculosEnvolvidos] = useState([]);
    const [relato, setRelato] = useState("");
    const [tipoRelato, setTipoRelato] = useState("");
    const [relatos, setRelatos] = useState([]);
    const [conclusao, setConclusao] = useState("");
    const [tipoConclusao, setTipoConclusao] = useState("");
    const [conclusoes, setConclusoes] = useState([]);
    let contador = 0;

    console.log(conclusoes);

    useEffect(() => {
        updateGrupos(militares, setGrupoMilitares);
    }, [militares]);

    useEffect(() => {
        updateGrupos(apoiadores, setGrupoApoiadores);
    }, [apoiadores]);

    useEffect(() => {
        setInfoCob(
            `Informações direto do Centro de Operações de Bombeiros - COB 193: ${nomeCobista}.`
        );
    }, [nomeCobista]);
    useEffect(() => {
        if (tipo.filter((valor) => valor == "Incêndio").length > 0) {
            setIncendio(true);
        } else {
            setIncendio(false);
        }
    }, [tipo]);

    function addTipo(e) {
        if (e.target.checked) {
            setTipo([...tipo, `${e.target.attributes.text.value}`]);
        } else {
            const novosTipos = [...tipo];
            setTipo(
                novosTipos.filter((valor) => {
                    return valor != e.target.attributes.text.value;
                })
            );
        }
    }

    function addAtendido() {
        setAtendidos([...atendidos, `${iconeAtendido} ${atendido}`]);
        setAtendido("");
    }

    function removeAtendido(e, index) {
        const novosAtendidos = [...atendidos];
        novosAtendidos.splice(index, 1);
        setAtendidos(novosAtendidos);
    }

    function addMilitar() {
        setMilitares([...militares, { vtr: vtrMilitar, nome: militar }]);
        setMilitar("");
    }

    function removeMilitar(e, index) {
        const novosMilitares = [...militares];
        novosMilitares.splice(index, 1);
        setMilitares(novosMilitares);
    }

    function updateGrupos(array, state) {
        var group_to_values = [...array];
        group_to_values = group_to_values.reduce(function (obj, item) {
            obj[item.vtr] = obj[item.vtr] || [];
            obj[item.vtr].push(item.nome);
            return obj;
        }, {});

        var grupos = Object.keys(group_to_values).map(function (key) {
            return { vtr: key, nome: group_to_values[key] };
        });

        state(grupos);
    }

    function addApoio() {
        setApoiadores([...apoiadores, { vtr: vtrApoio, nome: apoio }]);
        setApoio("");
    }
    function removeApoio(e, index) {
        const novosApoiadores = [...apoiadores];
        novosApoiadores.splice(index, 1);
        setApoiadores(novosApoiadores);
    }

    function addVeiculo() {
        setVeiculosEnvolvidos([...veiculosEnvolvidos, veiculo]);
        setVeiculo("");
    }
    function removeVeiculo(e, index) {
        const novos = [...veiculosEnvolvidos];
        novos.splice(index, 1);
        setVeiculosEnvolvidos(novos);
    }

    function addRelato() {
        setRelatos([...relatos, { tipo: tipoRelato, relato: relato }]);
        setRelato("");
    }

    function removeRelato(e, index) {
        const novos = [...relatos];
        novos.splice(index, 1);
        setRelatos(novos);
    }

    function addConclusao() {
        setConclusoes([
            ...conclusoes,
            { tipo: tipoConclusao, relato: conclusao },
        ]);
        setConclusao("");
    }

    function removeConclusao(e, index) {
        const novos = [...conclusoes];
        novos.splice(index, 1);
        setConclusoes(novos);
    }

    function changeCobistaStatus(e) {
        setCobista(e);
    }
    return (
        <Tabs justify defaultActiveKey="jornalistico" className="mt-2">
            <Tab eventKey="instagram" title="INSTAGRAM">
                <Instagram
                    titulo={titulo}
                    setTitulo={(e) => setTitulo(e.target.value)}
                    data={data}
                    setData={(e) => setData(e.target.value)}
                    hora={hora}
                    setHora={(e) => setHora(e.target.value)}
                    novaData={novaData}
                    novaHora={novaHora}
                    mes={mes}
                    localizacao={localizacao}
                    setLocalizacao={(e) => setLocalizacao(e.target.value)}
                />
            </Tab>
            <Tab eventKey="jornalistico" title="JORNALÍSTICO">
                <Row className="pb-3">
                    <div className="col-md-6 mt-2">
                        <h2 className="text-center">Formatador Jornalístico</h2>
                        <Form className=" mx-2">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Natureza</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="tituloJornalistico"
                                    type="text"
                                    placeholder="Natureza"
                                    aria-label="Natureza"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </InputGroup>

                            <InputGroup className="justify-content-between mb-3">
                                <InputGroup.Prepend className="mr-2 ">
                                    <InputGroup.Text sm={2}>
                                        Tipo
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Check
                                    as="input"
                                    inline
                                    label="Resgate"
                                    text="Resgate"
                                    type="checkbox"
                                    value="resgate"
                                    onChange={addTipo}
                                />
                                <Form.Check
                                    inline
                                    label="Salvamento"
                                    text="Salvamento"
                                    type="checkbox"
                                    value="salvamento"
                                    onChange={addTipo}
                                />
                                <Form.Check
                                    inline
                                    label="Incêndio"
                                    text="Incêndio"
                                    id="incendio"
                                    type="checkbox"
                                    value="incendio"
                                    onChange={addTipo}
                                />
                                <Form.Check
                                    inline
                                    label="Defesa Civil"
                                    text="Defesa Civil"
                                    type="checkbox"
                                    value="defesaCivil"
                                    onChange={addTipo}
                                />
                                <Form.Check
                                    inline
                                    label="Vistoria Técnica"
                                    text="Vistoria Técnica"
                                    type="checkbox"
                                    value="vistoriaTecnica"
                                    onChange={addTipo}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Data</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="data"
                                    type="date"
                                    max="2999-12-31"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                />
                                <FormControl
                                    type="time"
                                    name="hora"
                                    id="hora"
                                    value={hora}
                                    onChange={(e) => setHora(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        Localização
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    type="text"
                                    placeholder="Localização"
                                    id="localizacao"
                                    value={localizacao}
                                    onChange={(e) =>
                                        setLocalizacao(e.target.value)
                                    }
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        Tempo Resposta
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    type="text"
                                    placeholder="Tempo de Resposta"
                                    id="tempoResposta"
                                    onChange={(e) =>
                                        setTempoResposta(e.target.value)
                                    }
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Bombeiros</InputGroup.Text>
                                    <Form.Control
                                        as="select"
                                        custom
                                        onChange={(e) =>
                                            setVtrMilitar(e.target.value)
                                        }
                                    >
                                        <option value="">VTR</option>
                                        <option>Resgate</option>
                                        <option>Busca e Salvamento</option>
                                        <option>Combate a Incêndio</option>
                                        <option>Vistoria</option>
                                    </Form.Control>
                                </InputGroup.Prepend>
                                <FormControl
                                    type="text"
                                    placeholder="Patente e Nome"
                                    value={militar}
                                    onChange={(e) => setMilitar(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (
                                            e.key === "Enter" &&
                                            e.target.value !== "" &&
                                            vtrMilitar !== ""
                                        ) {
                                            addMilitar();
                                        }
                                    }}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-info"
                                        name="btnApoio"
                                        onClick={() => {
                                            if (
                                                militar !== "" &&
                                                vtrMilitar !== ""
                                            ) {
                                                addMilitar();
                                            }
                                        }}
                                    >
                                        Adicionar
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                            {/* <ListGroup className="lista">
                                 {grupoMilitares.map((el, index ) => (
                            <ListGroup.Item key={index}>
                                <div>{el.vtr}                           
                                
                                {el.nome.map( (n, i) => {
                                     return <div key={i} >
                                    {n}
                                  
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger ml-2"
                                        onClick={(e) => removeMilitar(e, i)}
                                        
                                    >
                                        X
                                    </button>
                                </div>
                                
                                })} 
                                
                                </div>
                               
                            </ListGroup.Item>
                        ))}
                    </ListGroup> */}

                            <ListGroup className="mb-3">
                                {militares.map((val, index) => (
                                    <ListGroup.Item key={index}>
                                        {val.nome} - {val.vtr}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger ml-2"
                                            onClick={(e) =>
                                                removeMilitar(e, index)
                                            }
                                        >
                                            X
                                        </button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <Form.Control
                                        as="select"
                                        custom
                                        onChange={(e) =>
                                            setVtrApoio(e.target.value)
                                        }
                                        id="outrasInstituicoes"
                                    >
                                        <option value="">
                                            Outras Instituições
                                        </option>
                                        <option
                                            value={`${String.fromCodePoint(
                                                128657
                                            )} SAMU`}
                                        >
                                            SAMU
                                        </option>
                                        <option
                                            value={`${String.fromCodePoint(
                                                128659
                                            )} PMGO`}
                                        >
                                            PMGO
                                        </option>
                                        <option
                                            value={`${String.fromCodePoint(
                                                128663
                                            )} Via-040`}
                                        >
                                            Via-040
                                        </option>
                                        <option
                                            value={`${String.fromCodePoint(
                                                128659
                                            )} GCM`}
                                        >
                                            GCM
                                        </option>
                                        <option
                                            value={`${String.fromCodePoint(
                                                128659
                                            )} PC`}
                                        >
                                            PC
                                        </option>
                                        <option
                                            value={`${String.fromCodePoint(
                                                128659
                                            )} PRF`}
                                        >
                                            PRF
                                        </option>
                                        <option
                                            value={`${String.fromCodePoint(
                                                128659
                                            )} PF`}
                                        >
                                            PF
                                        </option>
                                        <option
                                            value={`${String.fromCodePoint(
                                                128663
                                            )} Prefeitura`}
                                        >
                                            Prefeitura
                                        </option>
                                        <option
                                            value={`${String.fromCodePoint(
                                                128659
                                            )} PMDF`}
                                        >
                                            PMDF
                                        </option>
                                        <option
                                            value={`${String.fromCodePoint(
                                                128658
                                            )} CBMDF`}
                                        >
                                            CBMDF
                                        </option>
                                    </Form.Control>
                                </InputGroup.Prepend>
                                <FormControl
                                    type="text"
                                    placeholder="Nome"
                                    value={apoio}
                                    onChange={(e) => setApoio(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (
                                            e.key === "Enter" &&
                                            vtrApoio !== ""
                                        ) {
                                            addApoio();
                                        }
                                    }}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-info"
                                        name="btnApoio"
                                        onClick={() => {
                                            if (vtrApoio !== "") {
                                                addApoio();
                                            }
                                        }}
                                    >
                                        Adicionar
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <ListGroup className="mb-3">
                                {apoiadores.map((val, index) => (
                                    <ListGroup.Item key={index}>
                                        {val.nome}
                                        {val.nome == "" ? "" : " - "}
                                        {val.vtr}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger ml-2"
                                            onClick={(e) =>
                                                removeApoio(e, index)
                                            }
                                        >
                                            X
                                        </button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <Form.Control
                                            as="select"
                                            custom
                                            className="align-self-center"
                                            size="md"
                                            onChange={(e) =>
                                                setTipoRelato(e.target.value)
                                            }
                                        >
                                            <option value="">Relatos</option>
                                            <option>Solicitante</option>
                                            <option>Bombeiro</option>
                                            <option>Vítima</option>
                                            <option>Testemunha</option>
                                        </Form.Control>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    as="textarea"
                                    placeholder="Relato"
                                    value={relato}
                                    onChange={(e) => setRelato(e.target.value)}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-info"
                                        onClick={() => {
                                            if (
                                                relato !== "" &&
                                                tipoRelato !== ""
                                            ) {
                                                addRelato();
                                            }
                                        }}
                                    >
                                        Adicionar
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <ListGroup className="mb-3">
                                {relatos.map((val, index) => (
                                    <ListGroup.Item key={index}>
                                        Relato {val.tipo} : {val.relato}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger ml-2"
                                            onClick={(e) =>
                                                removeRelato(e, index)
                                            }
                                        >
                                            X
                                        </button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            {/* {incendio == true && (
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            Recursos Utilizados
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="text"
                                        placeholder="Produto e Quantidade"
                                    />
                                    <FormControl
                                        type="text"
                                        placeholder="Tempo de operação"
                                    />
                                    <InputGroup.Append>
                                        <Button
                                            variant="outline-info"
                                            onClick={() => {
                                                if (veiculo !== "") {
                                                    addVeiculo();
                                                }
                                            }}
                                        >
                                            Adicionar
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            )} */}

                            <InputGroup className="mb-1">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        Veículos Envolvidos
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="tituloJornalistico"
                                    type="text"
                                    value={veiculo}
                                    onChange={(e) => setVeiculo(e.target.value)}
                                    placeholder="Marca/Modelo, Placa, Ocupantes e condutor"
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-info"
                                        onClick={() => {
                                            if (veiculo !== "") {
                                                addVeiculo();
                                            }
                                        }}
                                    >
                                        Adicionar
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <ListGroup className="mb-3">
                                {veiculosEnvolvidos.map((val, index) => (
                                    <ListGroup.Item key={index}>
                                        Veículo Envolvido{" "}
                                        {veiculosEnvolvidos.length > 1
                                            ? index + 1
                                            : ""}
                                        : {val}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger ml-2"
                                            onClick={(e) =>
                                                removeVeiculo(e, index)
                                            }
                                        >
                                            X
                                        </button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            <InputGroup className="mb-1">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <Form.Control
                                            as="select"
                                            custom
                                            className="align-self-center"
                                            size="md"
                                            onChange={(e) =>
                                                setTipoConclusao(e.target.value)
                                            }
                                        >
                                            <option>Conclusão</option>
                                            <option value={String.fromCodePoint(127973)}>
                                                Encaminhado ao Hospital
                                            </option>
                                            <option value={String.fromCodePoint(128101)}>
                                                Atendido(s) no local
                                            </option>
                                            <option value={String.fromCodePoint(128062)}>Animal</option>
                                            <option value={String.fromCodePoint(10013)}>Óbito</option>
                                            <option value={String.fromCodePoint(128660)}>Custódia PM</option>
                                            <option value={String.fromCodePoint(128587)}>Custódia Civil</option>
                                        </Form.Control>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    as="textarea"
                                    placeholder="Conclusões"
                                    value={conclusao}
                                    onChange={(e) =>
                                        setConclusao(e.target.value)
                                    }
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-info"
                                        onClick={() => {
                                            if (
                                                conclusao !== "" &&
                                                tipoConclusao !== ""
                                            ) {
                                                addConclusao();
                                            }
                                        }}
                                    >
                                        Adicionar
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <ListGroup className="mb-3">
                                {conclusoes.map((val, index) => (
                                    <ListGroup.Item key={index}>
                                        {val.tipo} {val.relato}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger ml-2"
                                            onClick={(e) =>
                                                removeRelato(e, index)
                                            }
                                        >
                                            X
                                        </button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Cobista</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="tituloJornalistico"
                                    type="text"
                                    value={nomeCobista}
                                    onChange={(e) =>
                                        setNomeCobista(e.target.value)
                                    }
                                    placeholder="Patente e nome (aparecerá no final do relatório)"
                                />
                            </InputGroup>
                        </Form>
                    </div>

                    <div className="col-md-6">
                        <h2 className="resultado">Relatório Jornalístico:</h2>

                        <div
                            id="resultadoJornalistico"
                            className="texto_resultado"
                        >
                            <div>
                                {String.fromCharCode(55356, 56728)}{" "}
                                {titulo.toUpperCase()}{" "}
                                {String.fromCharCode(55356, 56728)}
                            </div>
                            <br />
                            <div>
                                #{tipo.join(", ").replace(/,(?!.*,)/gim, " e")}
                            </div>
                            <br />
                            <div>
                                {String.fromCharCode(55357, 56525)}
                                {" Local: "}
                                {localizacao}
                            </div>
                            <div>
                                {String.fromCharCode(9200)}
                                {" Data/hora: "} {novaData[2]} {novaHora[0]}h
                                {novaHora[1]}{" "}
                                {mes[parseInt(novaData[1], 10) - 1]}{" "}
                                {novaData[0]}
                            </div>
                            <div>
                                {String.fromCharCode(55357, 56667)}
                                {" Tempo-resposta: "}
                                {tempoResposta}
                            </div>
                            <br />
                            <div>
                                {relatos.map((relato, index) => {
                                    if (relato.tipo == "Solicitante") {
                                        return (
                                            <div
                                                key={index}
                                            >{`${String.fromCodePoint(
                                                128483
                                            )} ${relato.relato}`}</div>
                                        );
                                    }
                                })}
                            </div>
                            <br />
                            <div>
                                {veiculosEnvolvidos.map((v, i) => (
                                    <div key={i}>
                                        <p>
                                            {String.fromCodePoint(128663)}{" "}
                                            Veículo Envolvido{" "}
                                            {veiculosEnvolvidos.length > 1
                                                ? i + 1
                                                : ""}
                                            : {v}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div>
                                {atendidos.map((val, index) => (
                                    <div key={index}>{val}</div>
                                ))}
                            </div>

                            <div>
                                {String.fromCodePoint(9888)} Equipe Empenhada:
                                {grupoMilitares.map((el, index) => (
                                    <div key={index}>
                                        {`${String.fromCodePoint(128658)} ${
                                            el.vtr
                                        }`}
                                        {": "}
                                        {el.nome
                                            .join(", ")
                                            .replace(/,(?!.*,)/gim, " e")}
                                    </div>
                                ))}
                                {grupoApoiadores.map((el, index) => (
                                    <div key={index}>
                                        {`${el.vtr}`}
                                        {el.nome == "" ? "" : ": "}
                                        {el.nome
                                            .join(", ")
                                            .replace(/,(?!.*,)/gim, " e")}
                                    </div>
                                ))}
                            </div>
                            <div><br/>
                                {relatos.map((relato, index) => {
                                    if (relato.tipo == "Vítima") {
                                        contador++;
                                        return (
                                            <div
                                                key={index}
                                            >{`${String.fromCodePoint(
                                                129301
                                            )} Vítima ${contador}: ${
                                                relato.relato
                                            }`}</div>
                                        );
                                    }
                                })}
                            </div>
                            <div><br/>
                                <p>
                                    {String.fromCodePoint(128104, 8205, 128658)}
                                    Foi estabelecida a segurança do local e a
                                    estabilização do cenário para que outros
                                    acidentes não ocorressem, nem tampouco se
                                    agravasse a situação.
                                </p>
                            </div>
                            <div>
                                {relatos.map((relato, index) => {
                                    if (relato.tipo == "Bombeiro") {
                                        return (
                                            <p
                                                key={index}
                                            >{`${String.fromCodePoint(
                                                128104,
                                                8205,
                                                128658
                                            )} ${relato.relato}`}</p>
                                        );
                                    }
                                })}
                            </div>
                            <div>
                                {relatos.map((relato, index) => {
                                    if (relato.tipo == "Testemunha") {
                                        return (
                                            <p
                                                key={index}
                                            >{`${String.fromCodePoint(
                                                128100
                                            )} Testemunha: ${
                                                relato.relato
                                            }`}</p>
                                        );
                                    }
                                })}
                            </div>

                            <div>
                                {conclusoes.map((relato, index) => {
                                        return (
                                            <p
                                                key={index}
                                            >{`${relato.tipo} ${
                                                relato.relato
                                            }`}</p>
                                        );
                                    }
                                )}
                            </div>
                            <div>{infoCob}</div>
                        </div>
                        <Row className="justify-content-center mt-5">
                            <button
                                className="btn btn-lg btn-outline-success"
                                type="button"
                                onClick={(e) =>
                                    CopyToClipboard("resultadoJornalistico")
                                }
                            >
                                COPIAR
                            </button>
                        </Row>
                    </div>
                </Row>
            </Tab>
        </Tabs>
    );
}
