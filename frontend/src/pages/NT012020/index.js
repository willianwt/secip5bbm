/* eslint-disable no-else-return */
/* eslint-disable eqeqeq */
import React, {
  useState, useEffect, createRef, useRef,
} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import {
  Typography, Container, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton, Paper, Zoom,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { borders } from '@material-ui/system';
import { toast } from 'react-toastify';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import 'normalize.css';
import './style.css';
import cnaes from './cnaes';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef((props, ref) => {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);
const useStyles = makeStyles({
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const OPTIONS = cnaes;

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

let botaoProjeto = false;

export default function Virtualize() {
  const classes = useStyles();
  // variáveis do forumlário
  const [prestadorDeServico, setPrestadorDeServico] = useState('false');
  const [cnae, setCnae] = useState('');
  const [area, setArea] = useState('');
  const [areaTotal, setAreaTotal] = useState(0);
  const [cnaesSelecionados, setCnaesSelecionados] = useState([]);
  const [cargaIncendio, setCargaIncendio] = useState();
  const [edificacao, setEdificacao] = useState('');
  const [tamanhoEdificacao, setTamanhoEdificacao] = useState('');
  const [reuniaoDePublico, setReuniaoDePublico] = useState('');
  const [lotacao, setLotacao] = useState('');
  const [aberturas, setAberturas] = useState('');
  const [pavimentos, setPavimentos] = useState('');
  const [subsolo, setSubsolo] = useState('');
  const [garagem, setGaragem] = useState('');
  const [liquidoInflamavel, setLiquidoInflamavel] = useState('');
  const [quantidadeLiquido, setquantidadeLiquido] = useState('');
  const [glp, setGlp] = useState('');
  const [capacidadeGlp, setCapacidadeGlp] = useState('');
  const [previa62251, setPrevia62251] = useState('false');
  const [previa62252, setPrevia62252] = useState('false');
  const [cnaesEspeciais, setCnaesEspeciais] = useState('false');
  const [cnaesProjeto, setCnaesProjeto] = useState('false');
  const [botijoesArmazenados, setBotijoesArmazenados] = useState('');
  const [centralGlpEstacionario, setCentralGlpEstacionario] = useState('');
  const [comercioGlp, setComercioGlp] = useState('');
  const [comercioExplosivos, setComercioExplosivos] = useState('');
  const [distanciaEdificacoes, setDistanciaEdificacoes] = useState('');
  const [formProjeto, setFormProjeto] = useState(false);

  const resultado = createRef();

  function reset() {
    setPrestadorDeServico('');
    setCnae('');
    setArea('');
    setAreaTotal(0);
    setCnaesSelecionados([]);
    setCargaIncendio();
    setEdificacao('');
    setTamanhoEdificacao('');
    setReuniaoDePublico('');
    setLotacao('');
    setAberturas('');
    setPavimentos('');
    setSubsolo('');
    setGaragem('');
    setLiquidoInflamavel('');
    setquantidadeLiquido('');
    setGlp('');
    setCapacidadeGlp('');
    setPrevia62251('false');
    setPrevia62252('false');
    setCnaesEspeciais('false');
    setCnaesProjeto('false');
    setBotijoesArmazenados('');
    setCentralGlpEstacionario('');
    setComercioGlp('');
    setComercioExplosivos('');
    setDistanciaEdificacoes('');
    setFormProjeto(false);
    botaoProjeto = false;
  }
  // funções do formulário
  // CNAES que precisam de vistoria se for maior que 200m
  const cnaes62251 = ['B-1', 'B-2', 'C-3', 'E-1', 'E-4', 'E-5', 'E-6', 'F-1', 'F-2', 'F-3', 'F-4', 'F-5', 'F-6', 'F-7', 'F-8', 'F-9', 'F-10', 'F-11', 'H-2', 'H-3', 'H-4', 'H-5', 'J-2', 'J-3', 'J-4'];

  // CNAES que precisam de vistoria independente da área
  const cnaes62252 = ['L-1', 'L-2', 'L-3', 'M-2'];

  // CNAES ESPECIAIS (ANEXO B OU C)
  const cnaesAnexos = ['F-10', 'J-1', 'J-2', 'J-3', 'J-4', 'L-3', 'J-1 a J-4'];

  // CNAES QUE NECESSITAM DE PROJETO OBRIGATÓRIAMENTE
  const cnaesProjetoObrigatorio = ['F-5', 'F-6', 'F-7'];

  function cnaeToArray(stringCnae) {
    if (stringCnae == null || stringCnae == undefined) return undefined;
    return stringCnae.replace('CNAE:', '')
      .replace(', Descrição', '')
      .replace(', Divisão', '')
      .replace(', Carga de incêndio', '')
      .replace(', Área', '')
      .split(': ');
  }

  useEffect(() => {
    function calcCargaIncendio() {
      // verifica qual a maior carga de incendio conforme a nt01
      let maiorCarga = 0;
      cnaesSelecionados.map((valor) => {
        const result = (valor[3] * valor[4]);
        if (result > maiorCarga) {
          maiorCarga = result;
          setCargaIncendio(valor[3]);
        }

        // verifica se a divisão é local de reuniao de público
        if (valor[2].includes('F-')) {
          setReuniaoDePublico('true');
        } else {
          setReuniaoDePublico('false');
        }

        if (cnaes62251.some((e) => valor[2].includes(e)) && valor[4] > 200) {
          setPrevia62251('true');
        }

        if (cnaes62252.some((e) => valor[2].includes(e)) && valor[4] > 200) {
          setPrevia62252('true');
        }
        if (cnaesAnexos.some((e) => valor[2].includes(e))) {
          setCnaesEspeciais('true');
        }
        if (cnaesProjetoObrigatorio.some((e) => valor[2].includes(e))) {
          setCnaesProjeto('true');
        }

        return result;
      });
    }
    calcCargaIncendio();
  }, [cnaesSelecionados]);
  const verificarProjeto = () => {
    console.log(comercioGlp);
    if (cnaesProjeto == 'true'
      || botijoesArmazenados == 'vistoria'
      || centralGlpEstacionario == 'vistoria'
      || comercioGlp == 'vistoria'
      || comercioExplosivos == 'vistoria'
      || distanciaEdificacoes == 'vistoria'
      || Number(areaTotal) > 750
      || garagem == 'vistoria'
      || Number(pavimentos) >= 4
      || quantidadeLiquido == 'vistoria') {
      return 'Necessita de Projeto de Combate a Incêndio, conforme NT 01/2020.';
    } else {
      return 'Dispensado de Projeto de Combate a Incêndio, conforme NT 01/2020.';
    }
  };
  const verificarDispensa = () => {
    const dispensada = 'é DISPENSADO de Cercon, conforme NT-01/2020.';
    const previa = 'NECESSITA de Cercon, conforme NT-01/2020 e pode ser enquadrado como CERTIFICAÇÃO PRÉVIA.';
    const vistoria = 'NECESSITA de Cercon e é enquadrado como PROCESSO TÉCNICO. Necessita de vistoria no local, conforme NT-01/2020.';
    const especiais = 'contém CNAE sem carga de incêndio definida. Favor verificar NT-14/2020.';

    // console.log('area', areaTotal);
    // console.log('ci', cargaIncendio);
    // console.log('shop', edificacao);
    // console.log('aberturas', aberturas);
    // console.log('lotacao', lotacao);
    // console.log('reuniao de publico', reuniaoDePublico);
    // console.log('pavimentos', pavimentos);
    // console.log('subsolo', subsolo);
    // console.log('garagem', garagem);
    // console.log('liquido', liquidoInflamavel);
    // console.log('qtdliquido', quantidadeLiquido);
    // console.log('glp', glp);
    // console.log('qtdglp', capacidadeGlp);
    // console.log('previa62251', previa62251);
    // console.log('previa62252', previa62252);
    // console.log('cnaesEspeciais', cnaesEspeciais);
    if (cnaesEspeciais == 'true') {
      return especiais;
    } else if (
      Number(areaTotal) <= 200
        && Number(cargaIncendio) <= 300
        && reuniaoDePublico == 'false'
        && (edificacao == 'false' || tamanhoEdificacao == 'true')
        && aberturas == 'false'
        && lotacao == 'dispensado'
        && Number(pavimentos) <= 2
        && (subsolo == 'dispensado' || garagem == 'dispensado')
        && (liquidoInflamavel == 'dispensado' || quantidadeLiquido == 'dispensado')
        && (glp == 'dispensado' || capacidadeGlp == 'dispensado')
    ) {
      return dispensada;
    } else if (
      Number(areaTotal) <= 750
      && Number(cargaIncendio) <= 1200
      && previa62251 == 'false'
      && previa62252 == 'false'
      && Number(pavimentos) <= 3
      && aberturas == 'false'
      && (subsolo == 'dispensado' || garagem == 'dispensado')
      && (lotacao == 'dispensado' || lotacao == 'previa')
      && (liquidoInflamavel == 'dispensado' || quantidadeLiquido == 'dispensado' || quantidadeLiquido == 'previa')
      && (glp == 'dispensado' || capacidadeGlp == 'dispensado' || capacidadeGlp == 'previa')

    ) {
      return previa;
    } else {
      botaoProjeto = true;
      return vistoria;
    }
  };

  function addCnae() {
    if (cnae === null || cnae == '') {
      toast.warn('É necessário informar o CNAE.');
      return;
    }
    if (area === '' || area == null) {
      toast.warn('É necessário informar a área.');
      return;
    }

    const string = `${cnae}, Área: ${area}`;
    setCnaesSelecionados([...cnaesSelecionados, cnaeToArray(string)]);
    setAreaTotal(Number(areaTotal) + Number(area));
    setCnae('');
    setArea('');
  }
  function removeCnae(e, index) {
    const novosCnaes = [...cnaesSelecionados];
    if (cnaes62251.some((el) => novosCnaes[index][2].includes(el)) && novosCnaes[index][4] > 200) {
      setPrevia62251('false');
    }
    if (cnaes62252.some((el) => novosCnaes[index][2].includes(el)) && novosCnaes[index][4] > 200) {
      setPrevia62252('false');
    }
    if (cnaesAnexos.some((el) => novosCnaes[index][2].includes(el))) {
      setCnaesEspeciais('false');
    }
    setAreaTotal(Number(areaTotal) - Number(novosCnaes[index][4]));
    novosCnaes.splice(index, 1);
    setCnaesSelecionados(novosCnaes);
  }
  // modal
  const [warning, setWarning] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedProjeto, setCheckedProjeto] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const handleChangeProjeto = () => {
    verificarProjeto();
    setCheckedProjeto((prev) => !prev);
  };

  const openWarning = () => {
    verificarDispensa();
    setWarning(true);
  };

  const closeWarning = () => {
    setWarning(false);
  };

  const handleVerificarProjeto = () => {
    setFormProjeto(true);
  };

  useEffect(() => {
    resultado.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [checked]);

  // verifica mudança nas perguntas e esconde a resposta
  useEffect(() => {
    botaoProjeto = false;
    setChecked(false);
    setCheckedProjeto(false);
    setFormProjeto(false);
  }, [prestadorDeServico, cnae, area, areaTotal, cnaesSelecionados, cargaIncendio, edificacao, tamanhoEdificacao, reuniaoDePublico, lotacao, aberturas, pavimentos, subsolo, garagem, liquidoInflamavel, quantidadeLiquido, glp, capacidadeGlp, previa62251, previa62252, cnaesEspeciais]);

  useEffect(() => {
    setCheckedProjeto(false);
  }, [cnaesProjeto, botijoesArmazenados, centralGlpEstacionario, comercioGlp, comercioExplosivos, distanciaEdificacoes, areaTotal, garagem, pavimentos, quantidadeLiquido]);
  return (
    <Box mt={2}>

      <Container>

        <Grid container align="center" spacing={2}>
          <Grid container direction="row">
            <Grid item lg={12}>
              <Typography variant="h5" align="center">
                Verificador de Necessidade de Cercon
                <IconButton
                  onClick={openWarning}
                >
                  <ErrorOutlineIcon />
                </IconButton>
              </Typography>

            </Grid>
            <Grid item lg={12}>
              <Typography variant="subtitle1" align="center">(Ferramenta em fase de testes, somente para uso interno)</Typography>
            </Grid>
          </Grid>
          <Box component="span" border={1} borderColor="grey.400" p={1} m={1} borderRadius={4}>
            <Grid container>
              <Grid item lg={prestadorDeServico === 'false' || prestadorDeServico === '' ? 11 : 6} md={12} xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">A EMPRESA É NA RESIDÊNCIA DO EMPREENDEDOR, SEM RECEPÇÃO DE PESSOAS?</FormLabel>
                  <RadioGroup row value={prestadorDeServico} onChange={(e) => setPrestadorDeServico(e.target.value)}>
                    <FormControlLabel value="true" control={<Radio />} label="Sim" />
                    <FormControlLabel value="false" control={<Radio />} label="Não" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid hidden={prestadorDeServico === 'false' || prestadorDeServico === ''} item lg={6} xs={12}>
                <Typography variant="h5" align="center">Dispensado de CERCON</Typography>
                <Typography variant="body1" gutterBottom>
                  Conforme NT01/2020: 6.1.5.1.1 Considera-se   atividade   econômica   de baixo risco as atividades realizadas:
                  a.Na    residência    do    empreendedor,    sem recepção de pessoas;

                  A emissão do Certificado de Conformidade é dispensada para essa categoria, e é opitativa ao responsável.

                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid hidden={prestadorDeServico === 'true' || prestadorDeServico === ''} container justify="center" spacing={2}>
          <Grid item lg={8} xl={8} md={8} xs={12}>
            <Autocomplete
              id="virtualize-demo"
              value={cnae}
              onChange={(event, newValue) => {
                setCnae(newValue);
              }}
              style={{ width: '100%' }}
              disableListWrap
              classes={classes}
              ListboxComponent={ListboxComponent}
              renderGroup={renderGroup}
              options={OPTIONS}
              renderInput={(params) => <TextField {...params} variant="outlined" label="CNAE" />}
              renderOption={(option) => <Typography noWrap>{option}</Typography>}
            />
          </Grid>
          <Grid item lg={2} xl={2} md={2} xs={6}>
            <TextField
              variant="outlined"
              label="Área em m²"
              value={area}
              onChange={(e) => { setArea(e.target.value); }}
            />
          </Grid>
          <Grid item lg={2} xl={2} md={2} xs={6}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                if (cnae !== '' || cnae === null) {
                  addCnae();
                }
              }}
            >
              Adicionar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <p>
              {cnaesSelecionados.map((val, index) => (
                <li
                  key={index}
                >
                  {`CNAE:
                  ${val[0]},
                  Descrição: ${val[1]},
                  Divisão: ${val[2]},
                  Carga de Incêndio: ${val[3]},
                  Área: ${val[4]}m²`}
                  <IconButton
                    type="button"
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={(e) => removeCnae(e, index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </li>
              ))}
              Carga de incêndio considerada:
              {' '}
              {cargaIncendio}
            </p>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">O EMPREENDIMENTO ESTA LOCALIZADO EM ALGUM CONDOMÍNIO COMERCIAL, SHOPPING, GALERIA OU SEMELHANTE?</FormLabel>
              <RadioGroup
                row
                value={edificacao}
                onChange={
                  (e) => {
                    setEdificacao(e.target.value);
                    if (edificacao == 'false') setTamanhoEdificacao('');
                  }
                }
              >
                <FormControlLabel value="true" control={<Radio />} label="Sim" />
                <FormControlLabel value="false" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item hidden={edificacao === 'false' || edificacao === ''} lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">ESTE CONDOMÍNIO COMERCIAL/SHOPPING/GALERIA POSSUI ATÉ 750m² DE ÁREA CONSTRUÍDA OU MENOS DE 03 PAVIMENTOS?</FormLabel>
              <RadioGroup row value={tamanhoEdificacao} onChange={(e) => setTamanhoEdificacao(e.target.value)}>
                <FormControlLabel value="true" control={<Radio />} label="Sim" />
                <FormControlLabel value="false" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">POSSUI ABERTURAS PARA O INTERIOR DA EDIFICAÇÃO OU ESTABELECIMENTOS ADJACENTES?</FormLabel>
              <RadioGroup row value={aberturas} onChange={(e) => setAberturas(e.target.value)}>
                <FormControlLabel value="true" control={<Radio />} label="Sim" />
                <FormControlLabel value="false" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">QUAL A LOTAÇÃO DO ESTABELECIMENTO?</FormLabel>
              <RadioGroup row value={lotacao} onChange={(e) => setLotacao(e.target.value)}>
                <FormControlLabel value="dispensado" control={<Radio />} label="Até 100 pessoas" />
                <FormControlLabel value="previa" control={<Radio />} label="de 101 a 200 pessoas" />
                <FormControlLabel value="vistoria" control={<Radio />} label="Acima de 201 pessoas" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">POSSUI QUANTOS PAVIMENTOS?</FormLabel>
              <TextField
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => setPavimentos(e.target.value)}
                value={pavimentos}
              />
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">POSSUI SUBSOLO?</FormLabel>
              <RadioGroup
                row
                value={subsolo}
                onChange={(e) => {
                  setSubsolo(e.target.value);
                  if (subsolo == 'dispensado') setGaragem('');
                }}
              >
                <FormControlLabel value="previa" control={<Radio />} label="Sim" />
                <FormControlLabel value="dispensado" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item hidden={subsolo === 'dispensado' || subsolo === ''} lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">O SUBSOLO É UTILIZADO SOMENTE COMO GARAGEM / ESTACIONAMENTO?</FormLabel>
              <RadioGroup
                value={garagem}
                row
                onChange={(e) => {
                  setGaragem(e.target.value);
                }}
              >
                <FormControlLabel value="dispensado" control={<Radio />} label="Sim" />
                <FormControlLabel value="vistoria" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">POSSUI LÍQUIDO INFLAMÁVEL OU COMBUSTÍVEL NO ESTABELECIMENTO?</FormLabel>
              <RadioGroup
                row
                value={liquidoInflamavel}
                onChange={(e) => {
                  setLiquidoInflamavel(e.target.value);
                  if (liquidoInflamavel == 'dispensado') setquantidadeLiquido('');
                }}
              >
                <FormControlLabel value="previa" control={<Radio />} label="Sim" />
                <FormControlLabel value="dispensado" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item hidden={liquidoInflamavel === 'dispensado' || liquidoInflamavel === ''} lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">QUAL A QUANTIDADE DE LÍQUIDO INFLAMÁVEL E/OU COMBUSTÍVEL QUE POSSUI?</FormLabel>
              <RadioGroup row value={quantidadeLiquido} onChange={(e) => setquantidadeLiquido(e.target.value)}>
                <FormControlLabel value="dispensado" control={<Radio />} label="Até 250 litros" />
                <FormControlLabel value="previa" control={<Radio />} label="Entre 251 e 500 litros" />
                <FormControlLabel value="vistoria" control={<Radio />} label="Mais de 501 litros" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">FAZ USO DE GLP?</FormLabel>
              <RadioGroup
                row
                value={glp}
                onChange={(e) => {
                  setGlp(e.target.value);
                  if (glp == 'dispensado') setCapacidadeGlp('');
                }}
              >
                <FormControlLabel value="vistoria" control={<Radio />} label="Sim" />
                <FormControlLabel value="dispensado" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid hidden={glp === 'dispensado' || glp === ''} item lg={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">QUAL A CAPACIDADE DE BOTIJÃO UTILIZADO?</FormLabel>
              <RadioGroup row value={capacidadeGlp} onChange={(e) => setCapacidadeGlp(e.target.value)}>
                <FormControlLabel value="dispensado" control={<Radio />} label="Até 13kg" />
                <FormControlLabel value="previa" control={<Radio />} label="de 14kg até 190kg" />
                <FormControlLabel value="vistoria" control={<Radio />} label="Acima de 191kg" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item align="center" xs={12}>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              size="large"
              style={{ minHeight: '56px', width: '30%' }}
              onClick={() => handleChange()}
            >
              Verificar
            </Button>
          </Grid>
        </Grid>
        <Grid align="center" ref={resultado} id="resultado" hidden={!checked} item xs={12}>
          <Zoom in={checked}>
            <Paper elevation={5}>
              <Box my={2} p={3}>
                <Typography variant="h6">{verificarDispensa()}</Typography>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  size="large"
                  style={{ minHeight: '56px', width: '50%' }}
                  hidden={!botaoProjeto}
                  onClick={() => handleVerificarProjeto()}
                >
                  Precisa de Projeto?
                </Button>
              </Box>
            </Paper>
          </Zoom>
        </Grid>
        <Box hidden={!formProjeto} my={4}>
          <Box mb={2}>
            <Typography mb={2} variant="h6">Responda as perguntas abaixo para verificar se necessita de projeto, conforme item 6.2.3.2 da NT 01/2020:</Typography>
          </Box>
          <Grid item lg={12} mt={2} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">COMERCIALIZA GLP?</FormLabel>
              <RadioGroup
                row
                value={comercioGlp}
                onChange={(e) => {
                  setComercioGlp(e.target.value);
                }}
              >
                <FormControlLabel value="vistoria" control={<Radio />} label="Sim" />
                <FormControlLabel value="dispensado" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
            <Grid item lg={12} md={12} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">ARMAZENA 6 OU MAIS BOTIJÕES DE GLP DO TIPO P-13?</FormLabel>
                <RadioGroup
                  row
                  value={botijoesArmazenados}
                  onChange={(e) => {
                    setBotijoesArmazenados(e.target.value);
                  }}
                >
                  <FormControlLabel value="vistoria" control={<Radio />} label="Sim" />
                  <FormControlLabel value="dispensado" control={<Radio />} label="Não" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">POSSUI CENTRAL DE GLP COM BOTIJÃO ESTACIONÁRIO?</FormLabel>
                <RadioGroup
                  row
                  value={centralGlpEstacionario}
                  onChange={(e) => {
                    setCentralGlpEstacionario(e.target.value);
                  }}
                >
                  <FormControlLabel value="vistoria" control={<Radio />} label="Sim" />
                  <FormControlLabel value="dispensado" control={<Radio />} label="Não" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">COMERCIALIZA EXPLOSIVOS OU FOGOS DE ARTIFÍCIOS?</FormLabel>
                <RadioGroup
                  row
                  value={comercioExplosivos}
                  onChange={(e) => {
                    setComercioExplosivos(e.target.value);
                  }}
                >
                  <FormControlLabel value="vistoria" control={<Radio />} label="Sim" />
                  <FormControlLabel value="dispensado" control={<Radio />} label="Não" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">POSSUI MAIS QUE 12 METROS DE DISTÂNCIA DE OUTRA EDIFICAÇÃO NO MESMO LOTE?</FormLabel>
                <RadioGroup
                  row
                  value={distanciaEdificacoes}
                  onChange={(e) => {
                    setDistanciaEdificacoes(e.target.value);
                  }}
                >
                  <FormControlLabel value="vistoria" control={<Radio />} label="Sim" />
                  <FormControlLabel value="dispensado" control={<Radio />} label="Não" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item align="center" xs={12}>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              size="large"
              style={{ minHeight: '56px', width: '50%' }}
              hidden={!botaoProjeto}
              onClick={() => handleChangeProjeto()}
            >
              Verificar Necessidade de Projeto
            </Button>
          </Grid>
          <Grid align="center" id="resultado" hidden={!checkedProjeto} item xs={12}>
            <Zoom in={checkedProjeto}>
              <Paper elevation={5}>
                <Box my={2} p={3}>
                  <Typography variant="h5">{verificarProjeto()}</Typography>

                </Box>
              </Paper>
            </Zoom>
          </Grid>
        </Box>
        <Box my={2}>
          <Grid item align="center" xs={12}>
            <Button
              type="button"
              variant="outlined"
              size="large"
              style={{ minHeight: '56px', width: '30%' }}
              onClick={reset}
            >
              Limpar Campos
            </Button>
          </Grid>

        </Box>
      </Container>

      <Dialog
        open={warning}
        onClose={closeWarning}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title"><Typography variant="h3" align="center">ATENÇÃO</Typography></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <Typography variant="body1" paragraph>
              Esta ferramente deve ser usada somente como auxílio na verificação de empresas.
            </Typography>
            <Typography variant="body1" paragraph>
              <b>Todas as perguntas devem ser respondidas para obter uma resposta correta. O resultado pode ser incorreto caso alguma pergunta não seja respondida.</b>
            </Typography>
            <Typography variant="body1" paragraph>
              Em caso de dúvidas, verifique as Normas Técnicas 01 e 14, e todas as demais que achar necessário.
            </Typography>
            <Typography variant="body1" paragraph>
              Esta ferramenta foi criada com base nos itens 5.2.2, 6.1.3, 6.1.5.1, 6.1.5.2, 6.2.2.5 e 6.2.3.2 da NT-01/2020, Anexo A da NT-01/2020 e Anexo A da NT-14/2020.
            </Typography>
            <Typography variant="body1" paragraph>
              Use com atenção.
            </Typography>
            <Typography variant="body2" paragraph>
              Esta ferramenta está em fase de testes, e pendente de homologação. O uso oficial depende de homologação da instituição.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeWarning} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
}
