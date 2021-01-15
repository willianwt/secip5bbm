import React, { useState } from "react";
import dateformat from "dateformat";
import { toast } from "react-toastify";

//import './style.css';
import {
    Button,
    Form,
    Row,
    Col,
    FormGroup,
    FormControl,
    InputGroup,
    ListGroup,
} from "react-bootstrap";

export default function Instagram(props) {
    //const [titulo, setTitulo] = useState(props.titulo);
    //const [data, setData] = useState(dateformat(new Date(), "yyyy-mm-dd"));
    //const novaData = data.split("-");
    // const [localizacao, setLocalizacao] = useState("");
    // const mes = [
    //     "Jan",
    //     "Fev",
    //     "Mar",
    //     "Abr",
    //     "Mai",
    //     "Jun",
    //     "Jul",
    //     "Ago",
    //     "Set",
    //     "Out",
    //     "Nov",
    //     "Dez",
    // ];
    //const date = new Date();
    // eslint-disable-next-line no-extend-native
    // Date.prototype.timeToInput = function () {
    //     return `${`0${this.getHours()}`.substr(
    //         -2,
    //         2
    //     )}:${`0${this.getMinutes()}`.substr(-2, 2)}`;
    // };
    // const [hora, setHora] = useState(date.timeToInput());
    // const novaHora = hora.split(":");
    const [iconeAtendido, setIconeAtendido] = useState(
        String.fromCodePoint(128100)
    );
    const [atendido, setAtendido] = useState("");
    const [atendidos, setAtendidos] = useState([]);
    const [iconeMilitar, setIconeMilitar] = useState(
        String.fromCodePoint(128104, 8205, 128658)
    );
    const [militar, setMilitar] = useState("");
    const [militares, setMilitares] = useState([]);
    const [cobista, setCobista] = useState("");
    const [iconeApoio, setIconeApoio] = useState(String.fromCodePoint(128658));
    const [apoiadores, setApoiadores] = useState([]);
    const [apoio, setApoio] = useState("");
    const [hashtags, setHashtags] = useState(
        "#5ºBatalhão #CorpoDeBombeirosMilitar #VidaPorVidas #Bombeiros #Resgate #EMS #Acidente #FireRescue #Trânsito #Firefighter #Salvamento #Operações #Incêndio #DefesaCivil #FireDept #Firemen #CoisaDeBombeiro #Militar #Luziânia #Valparaíso #NovoGama #CidadeOcidental #EntornoSul #Goiás #CBMGO #Operacionais #BombeirosLuziânia"
    );

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
        if (cobista) {
            setMilitares([
                ...militares,
                `${iconeMilitar} ${militar} ${String.fromCodePoint(128276)}`,
            ]);
        } else {
            setMilitares([...militares, `${iconeMilitar} ${militar}`]);
        }
        setMilitar("");
        setCobista(false);
    }
    function removeMilitar(e, index) {
        const novosMilitares = [...militares];
        novosMilitares.splice(index, 1);
        setMilitares(novosMilitares);
    }

    function addApoio() {
        setApoiadores([...apoiadores, `${iconeApoio} ${apoio}`]);
        setApoio("");
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
    return (
        <Row>
            <div className="col-md-6 mt-2">
                <h2 className="text-center">Formatador Para Instagram</h2>
                <Form className="mx-2">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Natureza</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="text"
                            placeholder="Natureza"
                            aria-label="Natureza"
                            value={props.titulo}
                            onChange={props.setTitulo}
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
                            value={props.data}
                            onChange={props.setData}
                        />
                        <FormControl
                            type="time"
                            name="hora"
                            id="hora"
                            value={props.hora}
                            onChange={props.setHora}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Localização</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="text"
                            placeholder="Localização"
                            value={props.localizacao}
                            onChange={props.setLocalizacao}
                        />
                    </InputGroup>

                    <h4 className="col-6__subtitulo">Atendidos:</h4>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Form.Control
                                as="select"
                                custom
                                id="atendidos"
                                name="atendidos"
                                onChange={(e) =>
                                    setIconeAtendido(e.target.value)
                                }
                            >
                                <optgroup className="vitimas" label="Vitimas">
                                    <option
                                        value={String.fromCodePoint(128100)}
                                    >
                                        {String.fromCodePoint(128100)} Uma
                                        Vitima
                                    </option>
                                    <option
                                        value={String.fromCodePoint(128101)}
                                    >
                                        {String.fromCodePoint(128101)} Várias
                                        Vítimas
                                    </option>
                                    <option value={String.fromCodePoint(10013)}>
                                        {String.fromCodePoint(10013)} Óbito
                                    </option>
                                </optgroup>
                                <optgroup label="Ações">
                                    <option
                                        value={String.fromCodePoint(128166)}
                                    >
                                        {String.fromCodePoint(128166)} Incêndio
                                    </option>
                                    <option value={String.fromCodePoint(9888)}>
                                        {String.fromCodePoint(9888)} Defesa
                                        Civil
                                    </option>
                                    <option value={String.fromCodePoint(9989)}>
                                        {String.fromCodePoint(9989)} Missões
                                        Diversas
                                    </option>
                                </optgroup>
                                <optgroup label="Animais">
                                    <option
                                        value={String.fromCodePoint(128021)}
                                    >
                                        {String.fromCodePoint(128021)} Cachorro
                                    </option>
                                    <option
                                        value={String.fromCodePoint(128008)}
                                    >
                                        {String.fromCodePoint(128008)} Gato
                                    </option>
                                    <option
                                        value={String.fromCodePoint(128014)}
                                    >
                                        {String.fromCodePoint(128014)} Cavalo
                                    </option>
                                    <option
                                        value={String.fromCodePoint(128002)}
                                    >
                                        {String.fromCodePoint(128002)} Gado
                                    </option>
                                    <option
                                        value={String.fromCodePoint(128013)}
                                    >
                                        {String.fromCodePoint(128013)} Cobra
                                    </option>
                                    <option
                                        value={String.fromCodePoint(128029)}
                                    >
                                        {String.fromCodePoint(128029)} Abelha
                                    </option>
                                    <option
                                        value={String.fromCodePoint(129413)}
                                    >
                                        {String.fromCodePoint(129413)} Aves
                                    </option>
                                    <option
                                        value={String.fromCodePoint(128028)}
                                    >
                                        {String.fromCodePoint(128028)} Insetos
                                    </option>
                                    <option
                                        value={String.fromCodePoint(128000)}
                                    >
                                        {String.fromCodePoint(128000)} Roedor
                                    </option>
                                    <option
                                        value={String.fromCodePoint(129422)}
                                    >
                                        {String.fromCodePoint(129422)} Réptil
                                    </option>
                                    <option
                                        value={String.fromCodePoint(128062)}
                                    >
                                        {String.fromCodePoint(128062)} Animais
                                        Diversos
                                    </option>
                                </optgroup>
                            </Form.Control>
                        </InputGroup.Prepend>
                        <FormControl
                            type="text"
                            placeholder="Atendido"
                            id="atendidos"
                            onChange={(e) => setAtendido(e.target.value)}
                            value={atendido}
                            onKeyPress={(e) => {
                                if (
                                    e.key === "Enter" &&
                                    e.target.value !== ""
                                ) {
                                    addAtendido();
                                }
                            }}
                        />
                        <InputGroup.Append>
                            <Button
                                variant="outline-success"
                                onClick={() => {
                                    if (atendido !== "") {
                                        addAtendido();
                                    }
                                }}
                            >
                                Adicionar
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <ListGroup className="lista">
                        {atendidos.map((val, index) => (
                            <ListGroup.Item key={index}>
                                {val}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger ml-2"
                                    onClick={(e) => removeAtendido(e, index)}
                                >
                                    X
                                </button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <h4 className="col-6__subtitulo">Militares:</h4>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Form.Control
                                as="select"
                                custom
                                name="iconeMilitares"
                                id="iconeMilitares"
                                onChange={(e) =>
                                    setIconeMilitar(e.target.value)
                                }
                                defaultValue={String.fromCodePoint(
                                    128104,
                                    8205,
                                    128658
                                )}
                            >
                                <option
                                    value={String.fromCodePoint(
                                        128104,
                                        8205,
                                        128658
                                    )}
                                >
                                    {String.fromCodePoint(128104, 8205, 128658)}{" "}
                                    Homem
                                </option>
                                <option
                                    value={String.fromCodePoint(
                                        128105,
                                        8205,
                                        128658
                                    )}
                                >
                                    {String.fromCodePoint(128105, 8205, 128658)}{" "}
                                    Mulher
                                </option>
                            </Form.Control>
                        </InputGroup.Prepend>
                        <FormControl
                            id="input-militares"
                            type="text"
                            name="militares"
                            className="input-militares"
                            onChange={(e) => setMilitar(e.target.value)}
                            value={militar}
                            onKeyPress={(e) => {
                                if (
                                    e.key === "Enter" &&
                                    e.target.value !== ""
                                ) {
                                    addMilitar();
                                }
                            }}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>
                                <Form.Check
                                    checked={!!cobista}
                                    type="checkbox"
                                    onChange={(e) =>
                                        changeCobistaStatus(e.target.checked)
                                    }
                                />
                                {String.fromCodePoint(128276)}
                            </InputGroup.Text>
                            <Button
                                variant="outline-success"
                                onClick={() => {
                                    if (militar !== "") {
                                        addMilitar();
                                    }
                                }}
                            >
                                Adicionar
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <ListGroup className="lista">
                        {militares.map((val, index) => (
                            <ListGroup.Item key={index}>
                                {val}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger ml-2"
                                    onClick={(e) => removeMilitar(e, index)}
                                >
                                    X
                                </button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <h4 className="col-6__subtitulo">Apoio:</h4>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Form.Control
                                as="select"
                                custom
                                id="iconeApoio"
                                onChange={(e) => setIconeApoio(e.target.value)}
                                defaultValue={String.fromCodePoint(128658)}
                            >
                                <option value={String.fromCodePoint(128658)}>
                                    {String.fromCodePoint(128658)} CBM
                                </option>
                                <option value={String.fromCodePoint(128657)}>
                                    {String.fromCodePoint(128657)} Ambulância
                                </option>
                                <option value={String.fromCodePoint(128659)}>
                                    {String.fromCodePoint(128659)} Polícia
                                </option>
                                <option value={String.fromCodePoint(128641)}>
                                    {String.fromCodePoint(128641)} Helicóptero
                                </option>
                                <option value={String.fromCodePoint(128663)}>
                                    {String.fromCodePoint(128663)} Outros
                                </option>
                            </Form.Control>
                        </InputGroup.Prepend>
                        <FormControl
                            className="input-apoio"
                            type="text"
                            name="apoio"
                            placeholder="CBMGO já adicionado"
                            onChange={(e) => setApoio(e.target.value)}
                            value={apoio}
                            onKeyPress={(e) => {
                                if (
                                    e.key === "Enter" &&
                                    e.target.value !== ""
                                ) {
                                    addApoio();
                                }
                            }}
                        />
                        <InputGroup.Append>
                            <Button
                                variant="outline-success"
                                name="btnApoio"
                                onClick={() => {
                                    if (apoio !== "") {
                                        addApoio();
                                    }
                                }}
                            >
                                Adicionar
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>

                    <ListGroup>
                        {apoiadores.map((val, index) => (
                            <ListGroup.Item key={index}>
                                {val}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={(e) => removeApoio(e, index)}
                                >
                                    X
                                </button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <h3 className="col-6__subtitulo_hashtags">Hashtags:</h3>

                    <FormControl
                        as="textarea"
                        name=""
                        id=""
                        rows="6"
                        onChange={(e) => setHashtags(e.target.value)}
                        value={hashtags}
                    />
                </Form>
            </div>
            <div className="col-md-6">
                <h2 className="mt-2">Resultado Instagram:</h2>

                <div id="resultadoInstagram" className="texto_resultado">
                    <div>
                        {String.fromCharCode(55357, 57000)}{" "}
                        {props.titulo.toUpperCase()}
                    </div>
                    <div>.</div>
                    <div>
                        {String.fromCharCode(9200)} {props.novaData[2]}{" "}
                        {props.novaHora[0]}h{props.novaHora[1]}{" "}
                        {props.mes[parseInt(props.novaData[1], 10) - 1]}{" "}
                        {props.novaData[0]}
                    </div>
                    <div>.</div>
                    <div>
                        {String.fromCharCode(55357, 56525)} {props.localizacao}
                    </div>
                    <div>.</div>
                    <div>
                        {atendidos.map((val, index) => (
                            <div key={index}>{val}</div>
                        ))}
                    </div>
                    <div>.</div>
                    <div>
                        {militares.map((val, index) => (
                            <div key={index}>{val}</div>
                        ))}
                    </div>
                    <div>.</div>
                    <div>
                        {String.fromCodePoint(128658)}
                        {" #Bombeiros193"}
                        {apoiadores.map((val, index) => (
                            <div key={index}>{val}</div>
                        ))}
                    </div>
                    <div>.</div>
                    <div>{hashtags}</div>
                </div>
                <Row className="justify-content-center mt-5">
                    <button
                        className="btn btn-lg btn-outline-success"
                        type="button"
                        onClick={(e) => CopyToClipboard("resultadoInstagram")}
                    >
                        COPIAR
                    </button>
                </Row>
            </div>
        </Row>
    );
}
